"use client"
import { useEffect, useState } from "react";
import ProductoForm from "./ProductoForm";
import ProductoTable from "./ProductoTable";
import { obtenerProductos } from "@/app/actions";
import type { Producto } from "@/db/schema";


export default function AdminCatalogo() {
    const [productos, setProductos] = useState<Producto[]>([]);

    const fetchProductos = async () => {
        const data = await obtenerProductos();
        setProductos(data);
    }

    useEffect(() => {
        fetchProductos();
    }, [])

    return (
        <>
            <ProductoForm onSuccess={fetchProductos} />
            <section className="flex w-full flex-col gap-3">
                <h2 className="text-sm font-medium uppercase tracking-wide
  text-neutral-500">
                    Inventario
                </h2>
                <ProductoTable productos={productos}
                    onRefresh={fetchProductos} />
            </section>
        </>
    )

}
