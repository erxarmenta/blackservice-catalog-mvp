"use server";

import { db } from "@/db";
import { productos, type NuevoProducto, type Producto } from "@/db/schema";
import { eq } from "drizzle-orm";

type updateData = Omit<Producto, 'id'>

export async function agregarProducto(data: NuevoProducto) {
    await db.insert(productos).values(data);
}

export async function obtenerProductos() {
    const data = await db.select().from(productos)
    return data
}

export async function obtenerProductosDisponibles() {
    const data = await db.select().from(productos).where(eq(productos.disponible, true))
    return data
}

export async function setProductoVendido(id: string) {
    await db.update(productos).set({ disponible: false }).where(eq(productos.id, id))
}

export async function setProductoDisponible(id: string) {
    await db.update(productos).set({ disponible: true }).where(eq(productos.id, id))
}

export async function editarProducto(id: string, data: updateData) {
    await db.update(productos).set(data).where(eq(productos.id, id))
}

export async function borrarProducto(id: string) {
    await db.delete(productos).where(eq(productos.id, id))
}