# Supabase Setup for CDO Ads & VA Experts

## Database Tables

This project uses the following Supabase tables:

1. **products** - Digital products for sale
2. **orders** - Customer orders for paid products
3. **downloads** - Download logs for analytics
4. **bookings** - Consultation bookings
5. **inquiries** - Contact form submissions

## Migrations

Run migrations in order:

```bash
# Apply initial schema
supabase db push

# Or run specific migration files
psql -h <host> -U postgres -d postgres -f supabase/migrations/20240904_initial_schema.sql
psql -h <host> -U postgres -d postgres -f supabase/migrations/20240904_seed_products.sql
```

## Storage Buckets

Create the following storage buckets in Supabase Dashboard:

1. **digital-products** (private)
   - Stores downloadable product files (ZIP)
   - Access: Signed URLs only
   - Policy: Service role can upload/read, authenticated users need signed URLs

2. **product-images** (public)
   - Stores product thumbnail/preview images
   - Access: Public read
   - Policy: Anyone can view, service role can upload

## Row Level Security Policies

### Products
- Public read access for active products (`is_active = true`)
- Service role: full access

### Orders
- Customers can view their own orders (by email match)
- Service role: full access

### Downloads
- Service role: write only (logging downloads)

### Bookings
- Public: can insert (create bookings)
- Service role: full read access

### Inquiries
- Public: can insert (create inquiries)
- Service role: full read access

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Local Development

```bash
# Start Supabase locally
supabase start

# Apply migrations
supabase db reset

# Generate TypeScript types
supabase gen types typescript --local > lib/supabase/types.ts
```

## Storage Policies

### digital-products bucket
```sql
-- Allow service role to upload
CREATE POLICY "Service role can upload" ON storage.objects
FOR INSERT TO service_role WITH CHECK (bucket_id = 'digital-products');

-- Allow service role to create signed URLs
CREATE POLICY "Service role can read" ON storage.objects
FOR SELECT TO service_role USING (bucket_id = 'digital-products');
```

### product-images bucket
```sql
-- Public read access
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'product-images');

-- Service role can upload
CREATE POLICY "Service role can upload" ON storage.objects
FOR INSERT TO service_role WITH CHECK (bucket_id = 'product-images');
```