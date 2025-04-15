import {Hono} from "hono";
import {handle} from "hono/vercel";
import auth from "@/features/auth/server/route"
import products from "@/features/product/server/route"
import product from "@/features/dashboard/server/route"
const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes =app
.route("/auth",auth)
.route("/products",products)
.route("/product",product)


export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)
export type AppType = typeof routes;