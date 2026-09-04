## ADDED Requirements

### Requirement: Digital Products Grid Display
The system SHALL render a responsive grid of available digital products with thumbnail, title, price, and download/purchase action.

#### Scenario: Product grid loads from Supabase
- **WHEN** user visits digital products page
- **THEN** products fetched from Supabase `products` table at build time (SSG)
- **AND** grid displays 1 column mobile, 2 column tablet, 3-4 column desktop
- **AND** each card shows product image, title, short description, price (or "Free"), and "Download" button

#### Scenario: Product cards display correct data
- **WHEN** product card renders
- **THEN** image loads from Supabase Storage with `next/image` optimization
- **AND** title matches `products.name`
- **AND** price shows "₱{price}" or "Free" if price is 0
- **AND** "Download" button enabled for all products

### Requirement: Product Detail View
The system SHALL provide a detailed view for each digital product with full description, features, and download action.

#### Scenario: Product detail accessible via click
- **WHEN** user clicks product card or "View Details"
- **THEN** navigates to `/products/[slug]` dynamic route
- **AND** page displays full description, feature list, file format/size, preview images
- **AND** prominent "Download Now" button

#### Scenario: Product detail SEO optimized
- **WHEN** product detail page renders
- **THEN** `generateMetadata` returns title, description, Open Graph tags
- **AND** structured data (JSON-LD) for Product schema included

### Requirement: Instant Digital Download
The system SHALL deliver digital products via signed, expiring URLs from Supabase Storage.

#### Scenario: Authenticated download for free products
- **WHEN** user clicks "Download" on free product (price = 0)
- **THEN** API route generates signed URL with 1-hour expiry
- **AND** redirects user to signed URL for immediate download
- **AND** download logged in `downloads` table with product_id, user_ip, timestamp

#### Scenario: Purchase flow for paid products
- **WHEN** user clicks "Download" on paid product (price > 0)
- **THEN** redirects to checkout page (Stripe Checkout Session or simple payment form)
- **AND** on successful payment, generates signed URL with 24-hour expiry
- **AND** sends download link via email
- **AND** creates order record in `orders` table with status "completed"

#### Scenario: Download link security
- **WHEN** signed URL is accessed
- **THEN** URL validates signature and expiry
- **AND** rejects expired or tampered URLs with 403
- **AND** rate limits: max 5 downloads per order per hour

### Requirement: Product Management Data Model
The system SHALL define Supabase schema for products, orders, and downloads.

#### Scenario: Products table structure
- **WHEN** Supabase migration runs
- **THEN** `products` table has: id (uuid), name (text), slug (text unique), description (text), short_description (text), price (integer cents), currency (text default 'PHP'), image_path (text), file_path (text), features (jsonb), is_active (boolean default true), created_at, updated_at
- **AND** RLS: public read for active products, authenticated write for admin

#### Scenario: Orders table structure
- **WHEN** Supabase migration runs
- **THEN** `orders` table has: id (uuid), product_id (fk), customer_email (text), customer_name (text), amount (integer cents), currency (text), status (text: pending/completed/failed/refunded), stripe_session_id (text nullable), download_expires_at (timestamptz), created_at
- **AND** RLS: customer reads own orders by email, service role full access

#### Scenario: Downloads table structure
- **WHEN** Supabase migration runs
- **THEN** `downloads` table has: id (uuid), product_id (fk), order_id (fk nullable), ip_address (inet), user_agent (text), downloaded_at
- **AND** RLS: service role write only, admin read

### Requirement: Digital Store Accessibility
The system SHALL ensure product grid, detail pages, and download flows meet WCAG AA.

#### Scenario: Product grid keyboard navigation
- **WHEN** user tabs through product grid
- **THEN** each card focusable with visible ring
- **AND** "Download" and "View Details" buttons reachable
- **AND** Enter/Space activates buttons

#### Scenario: Download feedback announced
- **WHEN** download initiates
- **THEN** loading state announced via `aria-live="polite"`
- **AND** success/error announced with specific message