import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "google_reviews" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"author" varchar NOT NULL,
  	"rating" numeric DEFAULT 5 NOT NULL,
  	"review_text" varchar NOT NULL,
  	"review_date" timestamp(3) with time zone NOT NULL,
  	"event_type" varchar,
  	"google_url" varchar,
  	"is_featured" boolean DEFAULT true,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "menu_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"blurb" varchar,
  	"is_visible" boolean DEFAULT true,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "menu_items_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "menu_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"category_id" integer NOT NULL,
  	"description" varchar NOT NULL,
  	"image_id" integer,
  	"tag" varchar,
  	"note" varchar,
  	"is_visible" boolean DEFAULT true,
  	"show_on_home" boolean DEFAULT false,
  	"home_summary" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "google_reviews_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "menu_categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "menu_items_id" integer;
  ALTER TABLE "menu_items_variants" ADD CONSTRAINT "menu_items_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_category_id_menu_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."menu_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "google_reviews_review_date_idx" ON "google_reviews" USING btree ("review_date");
  CREATE INDEX "google_reviews_updated_at_idx" ON "google_reviews" USING btree ("updated_at");
  CREATE INDEX "google_reviews_created_at_idx" ON "google_reviews" USING btree ("created_at");
  CREATE INDEX "menu_categories_title_idx" ON "menu_categories" USING btree ("title");
  CREATE UNIQUE INDEX "menu_categories_slug_idx" ON "menu_categories" USING btree ("slug");
  CREATE INDEX "menu_categories_updated_at_idx" ON "menu_categories" USING btree ("updated_at");
  CREATE INDEX "menu_categories_created_at_idx" ON "menu_categories" USING btree ("created_at");
  CREATE INDEX "menu_items_variants_order_idx" ON "menu_items_variants" USING btree ("_order");
  CREATE INDEX "menu_items_variants_parent_id_idx" ON "menu_items_variants" USING btree ("_parent_id");
  CREATE INDEX "menu_items_name_idx" ON "menu_items" USING btree ("name");
  CREATE UNIQUE INDEX "menu_items_slug_idx" ON "menu_items" USING btree ("slug");
  CREATE INDEX "menu_items_category_idx" ON "menu_items" USING btree ("category_id");
  CREATE INDEX "menu_items_image_idx" ON "menu_items" USING btree ("image_id");
  CREATE INDEX "menu_items_updated_at_idx" ON "menu_items" USING btree ("updated_at");
  CREATE INDEX "menu_items_created_at_idx" ON "menu_items" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_google_reviews_fk" FOREIGN KEY ("google_reviews_id") REFERENCES "public"."google_reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_menu_categories_fk" FOREIGN KEY ("menu_categories_id") REFERENCES "public"."menu_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_menu_items_fk" FOREIGN KEY ("menu_items_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_google_reviews_id_idx" ON "payload_locked_documents_rels" USING btree ("google_reviews_id");
  CREATE INDEX "payload_locked_documents_rels_menu_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("menu_categories_id");
  CREATE INDEX "payload_locked_documents_rels_menu_items_id_idx" ON "payload_locked_documents_rels" USING btree ("menu_items_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "google_reviews" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "menu_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "menu_items_variants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "menu_items" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "google_reviews" CASCADE;
  DROP TABLE "menu_categories" CASCADE;
  DROP TABLE "menu_items_variants" CASCADE;
  DROP TABLE "menu_items" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_google_reviews_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_menu_categories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_menu_items_fk";
  
  DROP INDEX "payload_locked_documents_rels_google_reviews_id_idx";
  DROP INDEX "payload_locked_documents_rels_menu_categories_id_idx";
  DROP INDEX "payload_locked_documents_rels_menu_items_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "google_reviews_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "menu_categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "menu_items_id";`)
}
