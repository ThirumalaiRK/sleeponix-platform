
-- Add shipping details columns to orders table if they don't exist
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "courier_name" text;
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "tracking_id" text;
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "tracking_url" text;
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "shipping_status" text DEFAULT 'Pending';

-- Create an index for faster lookups by tracking_id
CREATE INDEX IF NOT EXISTS "orders_tracking_id_idx" ON "orders" ("tracking_id");
