create table "public"."tenements_summary" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "owner" uuid,
    "operator" character varying,
    "tenement" character varying not null,
    "name" character varying,
    "state" character varying,
    "grant" timestamp with time zone,
    "commencement" timestamp with time zone,
    "expiry" timestamp with time zone,
    "year" smallint,
    "appl_years" smallint,
    "location" character varying,
    "ha" integer,
    "sub_blocks" real,
    "sqkm" real,
    "ea type" character varying,
    "ea_date" timestamp with time zone,
    "rent_p_a" character varying,
    "rent_paid" boolean,
    "security" character varying,
    "enviro_authority" character varying,
    "enviro_fee_p_a" character varying,
    "enviro_fee_paid" boolean
);


alter table "public"."tenements_summary" enable row level security;

CREATE UNIQUE INDEX tenements_summary_pkey ON public.tenements_summary USING btree (id, tenement);

alter table "public"."tenements_summary" add constraint "tenements_summary_pkey" PRIMARY KEY using index "tenements_summary_pkey";

alter table "public"."tenements_summary" add constraint "tenements_summary_owner_fkey" FOREIGN KEY (owner) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."tenements_summary" validate constraint "tenements_summary_owner_fkey";

grant delete on table "public"."tenements_summary" to "anon";

grant insert on table "public"."tenements_summary" to "anon";

grant references on table "public"."tenements_summary" to "anon";

grant select on table "public"."tenements_summary" to "anon";

grant trigger on table "public"."tenements_summary" to "anon";

grant truncate on table "public"."tenements_summary" to "anon";

grant update on table "public"."tenements_summary" to "anon";

grant delete on table "public"."tenements_summary" to "authenticated";

grant insert on table "public"."tenements_summary" to "authenticated";

grant references on table "public"."tenements_summary" to "authenticated";

grant select on table "public"."tenements_summary" to "authenticated";

grant trigger on table "public"."tenements_summary" to "authenticated";

grant truncate on table "public"."tenements_summary" to "authenticated";

grant update on table "public"."tenements_summary" to "authenticated";

grant delete on table "public"."tenements_summary" to "service_role";

grant insert on table "public"."tenements_summary" to "service_role";

grant references on table "public"."tenements_summary" to "service_role";

grant select on table "public"."tenements_summary" to "service_role";

grant trigger on table "public"."tenements_summary" to "service_role";

grant truncate on table "public"."tenements_summary" to "service_role";

grant update on table "public"."tenements_summary" to "service_role";

create policy "Enable Insert for users based on owner"
on "public"."tenements_summary"
as permissive
for insert
to authenticated
with check ((auth.uid() = owner));


create policy "Enable Select for users based on owner"
on "public"."tenements_summary"
as permissive
for select
to authenticated
using ((auth.uid() = owner));



