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
            <header>
                <button>Regresar al catalógo</button>
            </header>
            <section className="flex flex-row place-content-evenly">
                <div>Fotos</div>
                <div>
                    <span>{actualProd?.marca}</span>
                    <h2>{actualProd?.modelo}</h2>
                </div>
            </section>
        </main>
    )
}
