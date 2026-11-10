"use client";
import { useEffect, useState } from 'react';
import { obtenerProductos, marcarProduct } from '@/app/actions';
import { type Producto } from '@/db/schema';

export default function ProductoTable() {
    const [productos, setProductos] = useState<Producto[]>([]);

    const fetchProductos = async () => {
        const data = await obtenerProductos();
        setProductos(data);
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    const marcarProducto = async (id: string) => {
        await marcarProduct(id);
        fetchProductos();
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>SKU</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Almacenamiento</th>
                    <th>Color</th>
                    <th>Estado</th>
                    <th>Estetica</th>
                    <th>Disponibilidad</th>
                    <th>Observaciones</th>
                    <th>RAM</th>
                    <th>Condicion de batería</th>
                    <th>Procesador</th>
                    <th>Tipo</th>
                    <th>Sistema Operativo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {productos.map((producto) => (
                    <tr key={producto.id}>
                        <td>{producto.sku}</td>
                        <td>{producto.marca}</td>
                        <td>{producto.modelo}</td>
                        <td>{producto.almacenamiento}GB</td>
                        <td>{producto.color}</td>
                        <td>{producto.estado}</td>
                        <td>{producto.estetica}</td>
                        <td>{producto.disponible ? "Si" : "No"}</td>
                        <td>{producto.observaciones}</td>
                        <td>{producto.ram}</td>
                        <td>{producto.condicionBateria}</td>
                        <td>{producto.procesador}</td>
                        <td>{producto.tipo}</td>
                        <td>{producto.so}</td>
                        <td>
                            <button className="bg-red-500 px-4 py-2 text-white">Eliminar</button>
                            <button className="bg-green-500 px-4 py-2 text-white">Editar</button>
                            <button className="bg-yellow-500 px-4 py-2 text-white" onClick={() => marcarProducto(producto.id)}>Marcar como vendido</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}