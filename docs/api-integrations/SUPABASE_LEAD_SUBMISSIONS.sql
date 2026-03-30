create table if not exists public.lead_submissions (
  id text primary key,
  created_at timestamptz not null default now(),
  source text not null,
  intent text not null,
  product_slug text,
  first_name text,
  last_name text,
  full_name text,
  phone text,
  email text,
  postcode text,
  address1 text,
  address2 text,
  best_time_to_call text,
  message text,
  handing text,
  status text not null default 'new',
  meta jsonb not null default '{}'::jsonb
);

create index if not exists lead_submissions_created_at_idx
  on public.lead_submissions (created_at desc);

create index if not exists lead_submissions_source_idx
  on public.lead_submissions (source);

create index if not exists lead_submissions_intent_idx
  on public.lead_submissions (intent);
