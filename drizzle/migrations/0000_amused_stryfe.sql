CREATE TABLE `productos` (
	`id` text PRIMARY KEY NOT NULL,
	`sku` integer,
	`marca` text NOT NULL,
	`modelo` text NOT NULL,
	`almacenamiento` integer NOT NULL,
	`color` text NOT NULL,
	`estado` text NOT NULL,
	`estetica` integer,
	`disponible` integer DEFAULT true NOT NULL,
	`observaciones` text,
	`ram` integer,
	`condicion_bateria` integer,
	`procesador` text,
	`tipo` text NOT NULL,
	`so` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `productos_sku_unique` ON `productos` (`sku`);