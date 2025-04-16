import { Hono } from 'hono';
import prisma from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';
import { Product } from '@/lib/types';
import { SortOptionValue } from '@/lib/utils';
const IMAGE_DIR = path.join(process.cwd(), 'images');
const app = new Hono()


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
      isFeatured:product.isFeatured,
    }

    return c.json({formattedProduct},200)
  }catch(error){
    console.error(error);
    return c.json({ error: 'Failed to fetch product' }, 500);
  }
})
.get("/", async (c) => {
  const category = c.req.query("category") || undefined;
  const sort = c.req.query("sort") as SortOptionValue | undefined;
  const priceRange = c.req.query("price") || undefined;
  const page = parseInt(c.req.query("page") as string) || 1; 
  const limit = 8; 

  let priceFilter: { gte?: number; lte?: number } | undefined;

  switch (priceRange) {
    case "under-50":
      priceFilter = { lte: 50 };
      break;
    case "50-100":
      priceFilter = { gte: 50, lte: 100 };
      break;
    case "100-200":
      priceFilter = { gte: 100, lte: 200 };
      break;
    case "200+":
      priceFilter = { gte: 200 };
      break;
    default:
      priceFilter = undefined;
  }

  const isFeatured = sort === "featured" ? true : undefined;

const whereFilter = {
  category: category ? { label: category } : undefined,
  price: priceFilter,
  isFeatured: isFeatured, 
};

  try {
    const totalCount = await prisma.product.count({
      where: whereFilter
    });

    const products = await prisma.product.findMany({
      where: whereFilter,
      orderBy:
      sort === "newest"
        ? { createdAt: "desc" }
        : sort === "price-asc"
        ? { price: "asc" }
        : sort === "price-desc"
        ? { price: "desc" }
        : sort === "featured"
        ? [
            { isFeatured: "desc" }, 
            { createdAt: "desc" }
          ]
        : undefined,
    
      take: limit, 
      skip: (page - 1) * limit, 
      include: {
        category: true,
      },
    });

    const formatted = products.map((product) => ({
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
      isFeatured:product.isFeatured,
    }));

    const hasNextPage = page * limit < totalCount;

    return c.json({
      data: formatted,
      total: totalCount,
      hasNextPage: hasNextPage,
    });
    
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch products" }, 500);
  }
});



export default app;
