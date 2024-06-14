CREATE TABLE IF NOT EXISTS "cost-allocation_bill" (
	"id" serial PRIMARY KEY NOT NULL,
	"number" integer NOT NULL,
	"position" integer NOT NULL,
	"year" integer NOT NULL,
	"service_id" integer NOT NULL,
	"contract_id" integer,
	"accounting_date" timestamp with time zone NOT NULL,
	"price_without_vat" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cost-allocation_building" (
	"id" serial PRIMARY KEY NOT NULL,
	"ownship_start" timestamp with time zone NOT NULL,
	"ownship_end" timestamp with time zone NOT NULL,
	"measuring_start" timestamp with time zone NOT NULL,
	"measuring_end" timestamp with time zone NOT NULL,
	"unit" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cost-allocation_contract" (
	"id" serial PRIMARY KEY NOT NULL,
	"building_id" integer NOT NULL,
	"binding_start" timestamp with time zone NOT NULL,
	"binding_end" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cost-allocation_service" (
	"id" serial PRIMARY KEY NOT NULL,
	"class" varchar(256) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cost-allocation_contract" ADD CONSTRAINT "cost-allocation_contract_building_id_cost-allocation_building_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."cost-allocation_building"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_class" ON "cost-allocation_service" ("class");