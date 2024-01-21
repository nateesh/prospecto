alter table "public"."tenements_summary" drop constraint "tenements_summary_pkey";

drop index if exists "public"."tenements_summary_pkey";

alter table "public"."tenements_summary" add column "area_km2" smallint;

alter table "public"."tenements_summary" add column "rent_per_sub_block" real;

CREATE UNIQUE INDEX tenements_summary_pkey ON public.tenements_summary USING btree (tenement);

alter table "public"."tenements_summary" add constraint "tenements_summary_pkey" PRIMARY KEY using index "tenements_summary_pkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.calc_area()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  IF NEW.sub_blocks IS NOT NULL and NEW.area_km2 IS NOT null then
    NEW.area_km2 := NEW.sub_blocks * 3.44;
  end if;
  return NEW;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.calc_rent()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  IF NEW.sub_blocks IS NOT NULL and NEW.rent_per_sub_block IS NOT null then
    NEW.rent_p_a := NEW.rent_per_sub_block * NEW.sub_blocks;
  end if;
  return NEW;
end;
$function$
;

CREATE TRIGGER multiply_sb_trigger BEFORE INSERT ON public.tenements_summary FOR EACH ROW EXECUTE FUNCTION calc_area();

CREATE TRIGGER update_rent_per_annum_trigger BEFORE UPDATE OF rent_per_sub_block, sub_blocks ON public.tenements_summary FOR EACH ROW EXECUTE FUNCTION calc_rent();


