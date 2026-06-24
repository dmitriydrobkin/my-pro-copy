CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`contact_info` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`estimated_budget` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `page_content` (
	`route` text PRIMARY KEY NOT NULL,
	`h1` text,
	`seo_title` text,
	`description` text,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `quiz_answers` (
	`id` text PRIMARY KEY NOT NULL,
	`lead_id` text NOT NULL,
	`answers_json` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `telegram_chats` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text,
	`type` text,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL
);
