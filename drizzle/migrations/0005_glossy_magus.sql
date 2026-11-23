ALTER TABLE `productos` RENAME COLUMN "precio" TO "precio_contado";--> statement-breakpoint
ALTER TABLE `productos` ADD `precio_msi` real NOT NULL;