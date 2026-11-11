"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import type { Producto } from "@/db/schema";
import { obtenerProductoId } from "@/app/actions";

export default function DetallesProducto() {
    const [actualProd, setActualProd] = useState<Producto>();
    const params = useParams();
    const id = params.id;

    // Obtenemos el producto
    const fetchProducto = async (id: string) => {
        const data = await obtenerProductoId(id);
        setActualProd(data);
    }

    useEffect(() => {
        fetchProducto(id as string);
    }, [])

    return (
        <main className="p-3 m-3">
            {
                actualProd?.disponible ?
                    <pre>{JSON.stringify(actualProd, null, 2)}</pre> :
                    <p>Este producto ya no esta disponible.</p>
            }
        </main>
    )
}
