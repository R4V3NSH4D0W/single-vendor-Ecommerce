import { Hono } from 'hono';
import prisma from '@/lib/prisma';
import { imageStorage } from '@/lib/imageStorage';

const app = new Hono();

app.post('/upload', async (c) => {
  try {
    const formData = await c.req.formData();
    const imageFiles = formData.getAll('productImages');
    const uploadedImageUrls: string[] = [];
    
    for (const file of imageFiles) {
      if (file instanceof File) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const { url } = await imageStorage(buffer);
        uploadedImageUrls.push(url);
      } else if (typeof file === 'string') {
        uploadedImageUrls.push(file);
      }
    }

    const specifications = JSON.parse(
      formData.get('specifications') as string
    ) as { key: string; value: string }[];

    const productData = {
      name: formData.get('productName') as string,
      description: formData.get('productDescription') as string,
      price: Number(formData.get('productPrice')),
      stock: Number(formData.get('productStock')),
      sku: formData.get('productSKU') as string,
      variants: JSON.parse(formData.get('productVariants') as string),
      tags: JSON.parse(formData.get('productTags') as string),
      sizes: JSON.parse(formData.get('productSize') as string),
      features:JSON.parse(formData.get('productFeature') as string),
      careInstruction: formData.get("careInstruction") as string,
      images: uploadedImageUrls,
      category: {
        connect: {
          value: formData.get('productCategory') as string
        }
      },
      specifications: {
        create: specifications.map((spec) => ({
          key: spec.key,
          value: spec.value,
        })),
      },
    };

    console.log("data",productData)
    const product = await prisma.product.create({
      data: {
        ...productData,
      },
      include: {
        category: true,
        specifications: true,
      }
    });

    return c.json({
      success: true,
      product: {
          id: product.id,
          productName: product.name,
          productDescription: product.description,
          productPrice: product.price,
          productStock: product.stock,
          productSKU: product.sku,
          productVariants: product.variants,
          productTags: product.tags,
          productImages: product.images,
          productSize: product.sizes,
          productCategory: product.category.value,
          productSpecifications: product.specifications,
          createdAt: product.createdAt,
        
      }
    }, 201);
  } catch (error) {
    console.error('Error creating product:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create product'
    }, 400);
  }
});

export default app;