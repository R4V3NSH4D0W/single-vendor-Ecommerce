import { Hono } from 'hono';
import prisma from '@/lib/prisma';
import { sessionMiddleware } from '@/lib/session-middleware';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import cuid from 'cuid';

const app = new Hono()
.get("/", async(c)=>{
   try{
      const categories = await prisma.category.findMany({
         select: {
           label: true,
           value:true,
         },
       });
       
    return c.json(categories);
   }catch(error){
    console.error("Failed to fetch Categories",error);
    return c.json({error: "failed to fetch Categories"},500)
   }
})
.post("/create",sessionMiddleware,zValidator('json',
   z.object({
      label:z.string().min(2).max(50),
      value:z.string().min(2).max(50)
   })
), async(c)=>{
   try{
      const user = c.get("user");
      const {label,value}=c.req.valid("json");

      if(!user || user.role !== "ADMIN"){
         return c.json({ success: false, error: 'Unauthorized' }, 403);
       }

       const existingCategory = await prisma.category.findUnique({
         where: { value }
       });
       if (existingCategory) {
         return c.json({ error: "Category value already exists" }, 409);
       }
       const newCategory = await prisma.category.create({
         data: {
           id: cuid(),
           label,
           value,
         },
         select: {
           label: true,
           value: true
         }
       });
       return c.json(newCategory, 201);
      } catch (error) {
         console.error("Failed to create category", error);
         return c.json({ error: "Failed to create category" }, 500);
       }
})
.delete("/delete/:value", sessionMiddleware, async (c) => {
   const user = c.get("user");
   const { value } = c.req.param();
 
   if (!user || user.role !== "ADMIN") {
     return c.json({ success: false, error: "Unauthorized" }, 403);
   }
 
   try {
     await prisma.category.delete({
       where: { value },
     });
 
     return c.json({ success: true, message: "Category deleted" }, 200);
   } catch (error) {
     console.error("Failed to delete category", error);
     return c.json({ success: false, error: "Failed to delete category" }, 500);
   }
 });
 


export default app;

