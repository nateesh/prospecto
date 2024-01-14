create table "public"."inbound_emails" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "from" text,
    "subject" text
);


alter table "public"."inbound_emails" enable row level security;

CREATE UNIQUE INDEX inbound_emails_pkey ON public.inbound_emails USING btree (id);

alter table "public"."inbound_emails" add constraint "inbound_emails_pkey" PRIMARY KEY using index "inbound_emails_pkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.profiles (id, first_name, last_name, company)
  values (new.id, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name', new.raw_user_meta_data->>'company');
  return new;
end;
$function$
;

grant delete on table "public"."inbound_emails" to "anon";

grant insert on table "public"."inbound_emails" to "anon";

grant references on table "public"."inbound_emails" to "anon";

grant select on table "public"."inbound_emails" to "anon";

grant trigger on table "public"."inbound_emails" to "anon";

grant truncate on table "public"."inbound_emails" to "anon";

grant update on table "public"."inbound_emails" to "anon";

grant delete on table "public"."inbound_emails" to "authenticated";

grant insert on table "public"."inbound_emails" to "authenticated";

grant references on table "public"."inbound_emails" to "authenticated";

grant select on table "public"."inbound_emails" to "authenticated";

grant trigger on table "public"."inbound_emails" to "authenticated";

grant truncate on table "public"."inbound_emails" to "authenticated";

grant update on table "public"."inbound_emails" to "authenticated";

grant delete on table "public"."inbound_emails" to "service_role";

grant insert on table "public"."inbound_emails" to "service_role";

grant references on table "public"."inbound_emails" to "service_role";

grant select on table "public"."inbound_emails" to "service_role";

grant trigger on table "public"."inbound_emails" to "service_role";

grant truncate on table "public"."inbound_emails" to "service_role";

grant update on table "public"."inbound_emails" to "service_role";

create policy "inbound_emails_insert_policy"
on "public"."inbound_emails"
as permissive
for insert
to public
with check ((auth.role() = 'anon'::text));



