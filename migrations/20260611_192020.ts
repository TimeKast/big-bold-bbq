import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_blog_posts_seo_mentions_schema_type" AS ENUM('Thing', 'MenuItem');
  CREATE TYPE "public"."enum__blog_posts_v_version_seo_mentions_schema_type" AS ENUM('Thing', 'MenuItem');
  CREATE TABLE "blog_posts_seo_article_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section" varchar
  );
  
  CREATE TABLE "blog_posts_seo_about_topics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"topic" varchar
  );
  
  CREATE TABLE "blog_posts_seo_mentions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"schema_type" "enum_blog_posts_seo_mentions_schema_type" DEFAULT 'Thing'
  );
  
  CREATE TABLE "blog_posts_seo_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "_blog_posts_v_version_seo_article_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blog_posts_v_version_seo_about_topics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"topic" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blog_posts_v_version_seo_mentions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"schema_type" "enum__blog_posts_v_version_seo_mentions_schema_type" DEFAULT 'Thing',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_blog_posts_v_version_seo_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "blog_posts" ADD COLUMN "seo_alternative_headline" varchar;
  ALTER TABLE "_blog_posts_v" ADD COLUMN "version_seo_alternative_headline" varchar;
  ALTER TABLE "blog_posts_seo_article_sections" ADD CONSTRAINT "blog_posts_seo_article_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_seo_about_topics" ADD CONSTRAINT "blog_posts_seo_about_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_seo_mentions" ADD CONSTRAINT "blog_posts_seo_mentions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_seo_faqs" ADD CONSTRAINT "blog_posts_seo_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_version_seo_article_sections" ADD CONSTRAINT "_blog_posts_v_version_seo_article_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_version_seo_about_topics" ADD CONSTRAINT "_blog_posts_v_version_seo_about_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_version_seo_mentions" ADD CONSTRAINT "_blog_posts_v_version_seo_mentions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_version_seo_faqs" ADD CONSTRAINT "_blog_posts_v_version_seo_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "blog_posts_seo_article_sections_order_idx" ON "blog_posts_seo_article_sections" USING btree ("_order");
  CREATE INDEX "blog_posts_seo_article_sections_parent_id_idx" ON "blog_posts_seo_article_sections" USING btree ("_parent_id");
  CREATE INDEX "blog_posts_seo_about_topics_order_idx" ON "blog_posts_seo_about_topics" USING btree ("_order");
  CREATE INDEX "blog_posts_seo_about_topics_parent_id_idx" ON "blog_posts_seo_about_topics" USING btree ("_parent_id");
  CREATE INDEX "blog_posts_seo_mentions_order_idx" ON "blog_posts_seo_mentions" USING btree ("_order");
  CREATE INDEX "blog_posts_seo_mentions_parent_id_idx" ON "blog_posts_seo_mentions" USING btree ("_parent_id");
  CREATE INDEX "blog_posts_seo_faqs_order_idx" ON "blog_posts_seo_faqs" USING btree ("_order");
  CREATE INDEX "blog_posts_seo_faqs_parent_id_idx" ON "blog_posts_seo_faqs" USING btree ("_parent_id");
  CREATE INDEX "_blog_posts_v_version_seo_article_sections_order_idx" ON "_blog_posts_v_version_seo_article_sections" USING btree ("_order");
  CREATE INDEX "_blog_posts_v_version_seo_article_sections_parent_id_idx" ON "_blog_posts_v_version_seo_article_sections" USING btree ("_parent_id");
  CREATE INDEX "_blog_posts_v_version_seo_about_topics_order_idx" ON "_blog_posts_v_version_seo_about_topics" USING btree ("_order");
  CREATE INDEX "_blog_posts_v_version_seo_about_topics_parent_id_idx" ON "_blog_posts_v_version_seo_about_topics" USING btree ("_parent_id");
  CREATE INDEX "_blog_posts_v_version_seo_mentions_order_idx" ON "_blog_posts_v_version_seo_mentions" USING btree ("_order");
  CREATE INDEX "_blog_posts_v_version_seo_mentions_parent_id_idx" ON "_blog_posts_v_version_seo_mentions" USING btree ("_parent_id");
  CREATE INDEX "_blog_posts_v_version_seo_faqs_order_idx" ON "_blog_posts_v_version_seo_faqs" USING btree ("_order");
  CREATE INDEX "_blog_posts_v_version_seo_faqs_parent_id_idx" ON "_blog_posts_v_version_seo_faqs" USING btree ("_parent_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "blog_posts_seo_article_sections" CASCADE;
  DROP TABLE "blog_posts_seo_about_topics" CASCADE;
  DROP TABLE "blog_posts_seo_mentions" CASCADE;
  DROP TABLE "blog_posts_seo_faqs" CASCADE;
  DROP TABLE "_blog_posts_v_version_seo_article_sections" CASCADE;
  DROP TABLE "_blog_posts_v_version_seo_about_topics" CASCADE;
  DROP TABLE "_blog_posts_v_version_seo_mentions" CASCADE;
  DROP TABLE "_blog_posts_v_version_seo_faqs" CASCADE;
  ALTER TABLE "blog_posts" DROP COLUMN "seo_alternative_headline";
  ALTER TABLE "_blog_posts_v" DROP COLUMN "version_seo_alternative_headline";
  DROP TYPE "public"."enum_blog_posts_seo_mentions_schema_type";
  DROP TYPE "public"."enum__blog_posts_v_version_seo_mentions_schema_type";`)
}
