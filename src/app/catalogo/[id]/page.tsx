import { Suspense } from "react";
import DetallesProducto from "@/components/DetallesProducto";

export default function DetallesProductoPage() {
    return (
        <Suspense fallback={<p>Cargando...</p>}>
            <DetallesProducto />
        </Suspense>
    )
}
