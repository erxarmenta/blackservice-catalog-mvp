import { integer, sqliteTable, text, real } from "drizzle-orm/sqlite-core";

export const productos = sqliteTable("productos", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    sku: integer("sku").unique(),
    marca: text("marca").notNull(),
    modelo: text("modelo").notNull(),
    almacenamiento: integer("almacenamiento").notNull(),
    color: text("color").notNull(),
    estado: text("estado", { enum: ["NUEVO", "SEMINUEVO"] }).notNull(),
    estetica: integer("estetica"),
    disponible: integer("disponible", { mode: "boolean", }).notNull().default(true),
    observaciones: text("observaciones"),
    ram: integer("ram"),
    condicionBateria: integer("condicion_bateria"),
    procesador: text("procesador"),
    tipo: text("tipo", { enum: ["CELULAR", "TABLET", "LAPTOP", "CONSOLA", "RELOJ"], }).notNull(),
    so: text("so", { enum: ["ANDROID", "IOS", "WINDOWS"], }),
    precio: real("precio").notNull()
});

export type Producto = typeof productos.$inferSelect;
export type NuevoProducto = typeof productos.$inferInsert;