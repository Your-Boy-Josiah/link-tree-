CREATE TABLE `links` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`url` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`public` integer DEFAULT 0 NOT NULL,
	`clicks` integer DEFAULT 0 NOT NULL,
	`position` integer DEFAULT 100 NOT NULL,
	CONSTRAINT "visibility_boolean" CHECK("links"."public" IN (0,1)),
	CONSTRAINT "clicks_nonnegative" CHECK("links"."clicks" >= 0)
);
