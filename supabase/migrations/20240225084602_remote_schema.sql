
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE SCHEMA IF NOT EXISTS "supabase_migrations";

ALTER SCHEMA "supabase_migrations" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."article_timeline" (
    "timeline_id" integer NOT NULL,
    "article_id" integer NOT NULL
);

ALTER TABLE "public"."article_timeline" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."articles" (
    "id" integer NOT NULL,
    "title" "text" NOT NULL,
    "content" "text" NOT NULL,
    "slag" "text",
    "is_published" boolean DEFAULT true NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp without time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."articles" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."articles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."articles_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."articles_id_seq" OWNED BY "public"."articles"."id";

CREATE TABLE IF NOT EXISTS "public"."articles_tags" (
    "tag_id" integer NOT NULL,
    "article_id" integer NOT NULL
);

ALTER TABLE "public"."articles_tags" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."external_link_timeline" (
    "timeline_id" integer NOT NULL,
    "external_link_id" integer NOT NULL
);

ALTER TABLE "public"."external_link_timeline" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."external_links" (
    "id" integer NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "url" "text" NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."external_links" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."external_links_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."external_links_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."external_links_id_seq" OWNED BY "public"."external_links"."id";

CREATE TABLE IF NOT EXISTS "public"."external_links_tags" (
    "tag_id" integer NOT NULL,
    "external_link_id" integer NOT NULL
);

ALTER TABLE "public"."external_links_tags" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."tags" (
    "id" integer NOT NULL,
    "name" "text" NOT NULL
);

ALTER TABLE "public"."tags" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."tags_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."tags_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."tags_id_seq" OWNED BY "public"."tags"."id";

CREATE TABLE IF NOT EXISTS "public"."timeline" (
    "id" integer NOT NULL
);

ALTER TABLE "public"."timeline" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."timeline_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."timeline_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."timeline_id_seq" OWNED BY "public"."timeline"."id";

CREATE TABLE IF NOT EXISTS "supabase_migrations"."schema_migrations" (
    "version" "text" NOT NULL,
    "statements" "text"[],
    "name" "text"
);

ALTER TABLE "supabase_migrations"."schema_migrations" OWNER TO "postgres";

ALTER TABLE ONLY "public"."articles" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."articles_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."external_links" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."external_links_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."tags" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."tags_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."timeline" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."timeline_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."article_timeline"
    ADD CONSTRAINT "article_timeline_pkey" PRIMARY KEY ("timeline_id", "article_id");

ALTER TABLE ONLY "public"."articles"
    ADD CONSTRAINT "articles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."articles_tags"
    ADD CONSTRAINT "articles_tags_pkey" PRIMARY KEY ("tag_id", "article_id");

ALTER TABLE ONLY "public"."external_link_timeline"
    ADD CONSTRAINT "external_link_timeline_pkey" PRIMARY KEY ("timeline_id", "external_link_id");

ALTER TABLE ONLY "public"."external_links"
    ADD CONSTRAINT "external_links_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."external_links_tags"
    ADD CONSTRAINT "external_links_tags_pkey" PRIMARY KEY ("tag_id", "external_link_id");

ALTER TABLE ONLY "public"."tags"
    ADD CONSTRAINT "tags_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."timeline"
    ADD CONSTRAINT "timeline_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "supabase_migrations"."schema_migrations"
    ADD CONSTRAINT "schema_migrations_pkey" PRIMARY KEY ("version");

ALTER TABLE ONLY "public"."article_timeline"
    ADD CONSTRAINT "article_timeline_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id");

ALTER TABLE ONLY "public"."article_timeline"
    ADD CONSTRAINT "article_timeline_timeline_id_fkey" FOREIGN KEY ("timeline_id") REFERENCES "public"."timeline"("id");

ALTER TABLE ONLY "public"."articles_tags"
    ADD CONSTRAINT "articles_tags_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id");

ALTER TABLE ONLY "public"."articles_tags"
    ADD CONSTRAINT "articles_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id");

ALTER TABLE ONLY "public"."external_link_timeline"
    ADD CONSTRAINT "external_link_timeline_external_link_id_fkey" FOREIGN KEY ("external_link_id") REFERENCES "public"."external_links"("id");

ALTER TABLE ONLY "public"."external_link_timeline"
    ADD CONSTRAINT "external_link_timeline_timeline_id_fkey" FOREIGN KEY ("timeline_id") REFERENCES "public"."timeline"("id");

ALTER TABLE ONLY "public"."external_links_tags"
    ADD CONSTRAINT "external_links_tags_external_link_id_fkey" FOREIGN KEY ("external_link_id") REFERENCES "public"."external_links"("id");

ALTER TABLE ONLY "public"."external_links_tags"
    ADD CONSTRAINT "external_links_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id");

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."article_timeline" TO "anon";
GRANT ALL ON TABLE "public"."article_timeline" TO "authenticated";
GRANT ALL ON TABLE "public"."article_timeline" TO "service_role";

GRANT ALL ON TABLE "public"."articles" TO "anon";
GRANT ALL ON TABLE "public"."articles" TO "authenticated";
GRANT ALL ON TABLE "public"."articles" TO "service_role";

GRANT ALL ON SEQUENCE "public"."articles_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."articles_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."articles_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."articles_tags" TO "anon";
GRANT ALL ON TABLE "public"."articles_tags" TO "authenticated";
GRANT ALL ON TABLE "public"."articles_tags" TO "service_role";

GRANT ALL ON TABLE "public"."external_link_timeline" TO "anon";
GRANT ALL ON TABLE "public"."external_link_timeline" TO "authenticated";
GRANT ALL ON TABLE "public"."external_link_timeline" TO "service_role";

GRANT ALL ON TABLE "public"."external_links" TO "anon";
GRANT ALL ON TABLE "public"."external_links" TO "authenticated";
GRANT ALL ON TABLE "public"."external_links" TO "service_role";

GRANT ALL ON SEQUENCE "public"."external_links_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."external_links_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."external_links_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."external_links_tags" TO "anon";
GRANT ALL ON TABLE "public"."external_links_tags" TO "authenticated";
GRANT ALL ON TABLE "public"."external_links_tags" TO "service_role";

GRANT ALL ON TABLE "public"."tags" TO "anon";
GRANT ALL ON TABLE "public"."tags" TO "authenticated";
GRANT ALL ON TABLE "public"."tags" TO "service_role";

GRANT ALL ON SEQUENCE "public"."tags_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."tags_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."tags_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."timeline" TO "anon";
GRANT ALL ON TABLE "public"."timeline" TO "authenticated";
GRANT ALL ON TABLE "public"."timeline" TO "service_role";

GRANT ALL ON SEQUENCE "public"."timeline_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."timeline_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."timeline_id_seq" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
