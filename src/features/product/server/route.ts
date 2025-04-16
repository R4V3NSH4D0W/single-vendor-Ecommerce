import { Hono } from 'hono';
import prisma from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';
import { Product } from '@/lib/types';
const IMAGE_DIR = path.join(process.cwd(), 'images');
const app = new Hono()


.get('/', async (c) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const formattedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      sku: product.sku,
      tags: product.tags,
      images: product.images,
      category: product.category.value,
      categoryLabel: product.category.label,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));

    return c.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return c.json({ error: 'Failed to fetch products' }, 500);
  }
})
. get('/images/:filename', async (c) => {
  const { filename } = c.req.param();
  const filePath = path.join(IMAGE_DIR, filename);

  try {
    const file = await fs.readFile(filePath);
    const extension = path.extname(filename).substring(1);

    return new Response(file, {
      headers: {
        'Content-Type': `image/${extension}`,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return c.text('Image not found', 404);
  }
})
.get("/:id",async(c)=>{

  const id = c.req.param("id");

  try{
    const product = await prisma.product.findUnique({
      where:{id},
      include:{
        category:true,
        specifications:{
          select:{
            key:true,
            value:true,
          }
        },
      }
    });
    if(!product){
      return c.json({error:"Product Not Found"},404);
    }
    const formattedProduct:Product={
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      sku: product.sku,
      tags: product.tags,
      images: product.images,
      category: product.category.value,
      categoryLabel: product.category.label,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
      specifications:product.specifications,
      care:product.careInstruction||"",
      colors:product.variants,
      sizes:product.sizes,
      features:product.features,
    }

    return c.json({formattedProduct},200)
  }catch(error){
    console.error(error);
    return c.json({ error: 'Failed to fetch product' }, 500);
  }
})

export default app;
