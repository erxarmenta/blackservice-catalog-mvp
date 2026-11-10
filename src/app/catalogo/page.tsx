"use client";
import { obtenerProductosDisponibles } from "@/app/actions";
import { useState, useEffect } from "react";
import { type Producto } from '@/db/schema';

export default function CatalogoPage() {
    const [productos, setProductos] = useState<Producto[]>([]);

    const fetchProductos = async () => {
        const data = await obtenerProductosDisponibles();
        setProductos(data);
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    return (
        <div>{JSON.stringify(productos)}</div>
    )
}
