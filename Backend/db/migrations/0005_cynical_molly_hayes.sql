CREATE TYPE "public"."payment_method" AS ENUM('cash', 'bank_transfer', 'paypal', 'credit_card', 'check');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'partial', 'paid', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."project_status" AS ENUM('draft', 'pending', 'in_progress', 'review', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."project_type" AS ENUM('website', 'ecommerce', 'branding', 'seo', 'marketing', 'design', 'wordpress', 'Shopify');--> statement-breakpoint
CREATE TABLE "payments" (
	"id" text PRIMARY KEY NOT NULL,
	"project_id" text NOT NULL,
	"client_id" text,
	"user_id" text,
	"amount" numeric(10, 2) NOT NULL,
	"currency" text DEFAULT 'MAD',
	"method" "payment_method",
	"status" "payment_status" DEFAULT 'pending',
	"transaction_id" text,
	"invoice_number" text,
	"payment_date" timestamp,
	"due_date" timestamp,
	"receipt" text,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"client_id" text,
	"title" text NOT NULL,
	"website_name" text,
	"description" text,
	"type" "project_type" DEFAULT 'website',
	"status" "project_status" DEFAULT 'pending',
	"progress" integer DEFAULT 0,
	"logo" text,
	"thumbnail" text,
	"gallery" json,
	"website_url" text,
	"admin_url" text,
	"wordpress_url" text,
	"wordpress_email" text,
	"wordpress_username" text,
	"wordpress_password" text,
	"google_console_linked" boolean DEFAULT false,
	"google_analytics_linked" boolean DEFAULT false,
	"technologies" json,
	"inspiration_templates" json,
	"attachments" json,
	"budget" numeric(10, 2),
	"estimated_days" integer,
	"start_date" timestamp,
	"deadline" timestamp,
	"completed_at" timestamp,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;