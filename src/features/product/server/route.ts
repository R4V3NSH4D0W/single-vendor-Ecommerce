import { Hono } from 'hono';
import prisma from '@/lib/prisma';

const app = new Hono()

// Get all products
.get('/', async (c) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Map to match your frontend expectations
    const formattedProducts = products.map(product => ({
      id: product.id,
      productName: product.name,
      productDescription: product.description,
      productPrice: product.price,
      productStock: product.stock,
      productSKU: product.sku,
      productVariants: product.variants,
      productTags: product.tags,
      productImages: product.images,
      productCategory: product.category.value,
      categoryLabel: product.category.label,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      owner: product.owner
    }));

    return c.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return c.json({ error: 'Failed to fetch products' }, 500);
  }
})

// Get single product by ID
.get('/:id', async (c) => {
  const id = c.req.param('id');
  
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!product) {
      return c.json({ error: 'Product not found' }, 404);
    }

    // Format response
    const formattedProduct = {
      id: product.id,
      productName: product.name,
      productDescription: product.description,
      productPrice: product.price,
      productStock: product.stock,
      productSKU: product.sku,
      productVariants: product.variants,
      productTags: product.tags,
      productImages: product.images,
      productCategory: product.category.value,
      categoryLabel: product.category.label,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      owner: product.owner
    };

    return c.json(formattedProduct);
  } catch (error) {
    console.error('Error fetching product:', error);
    return c.json({ error: 'Failed to fetch product' }, 500);
  }
});

export default app;