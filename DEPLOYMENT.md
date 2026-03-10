# Sleeponix - Production Deployment Guide

This guide covers the steps required to prepare and deploy the Sleeponix application to a production environment.

## 1. Environment Setup

Ensure you have a `.env` or `.env.production` file in the root directory with the following variables. Do NOT commit this file to version control.

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

## 2. Supabase Database Migration

Before deploying the frontend, ensure your production database schemas are up to date.

1.  **Install Supabase CLI** (if not already installed):
    ```bash
    npm install -g supabase
    ```

2.  **Login to Supabase**:
    ```bash
    npx supabase login
    ```

3.  **Link to your Production Project**:
    ```bash
    npx supabase link --project-ref your-project-id
    ```

4.  **Push Migrations**:
    ```bash
    npx supabase db push
    ```

   This will apply all local migration files (tables, RLS policies, etc.) to your remote production database.

## 3. Building for Production

To create an optimized production build:

```bash
npm run build
```

This will run the type checker (`tsc`) and Vite build process, outputting the files to the `dist/` directory.

To test the production build locally:

```bash
npm run preview
```

## 4. Deploying to Vercel (Recommended)

Sleeponix is built with Vite and React, making it perfect for deployment on Vercel.

1.  **Push your code** to a Git repository (GitHub, GitLab, Bitbucket).
2.  **Sign in to Vercel** and click "Add New... > Project".
3.  **Import your repository**.
4.  **Configure Project**:
    *   **Framework Preset**: Vite
    *   **Root Directory**: `./` (default)
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`
    *   **Environment Variables**: Add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
5.  **Click Deploy**.

### Rewrites (for Single Page Application)
Vercel automatically handles rewrites for SPA (redirecting all routes to `index.html`) if you use the default Vite preset. If you encounter 404s on refresh, ensure you have a `vercel.json` (optional, usually not needed for default Vite setup):

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## 5. Post-Deployment Checklist

*   [ ] **Test Admin Login**: Ensure you can log in to the admin panel (`/admin-login`) using the production database credentials.
*   [ ] **Verify Store Finder**: Check if the Store Finder page loads stores from the database.
*   [ ] **Check Images**: Ensure all images load correctly. If using `public/` folder, paths should start with `/`.
*   [ ] **Test Checkout**: Run a test order flow to ensure cart and order placement works.
*   [ ] **SEO Check**: Verify that `robots.txt` is accessible at `https://your-domain.com/robots.txt`.
*   [ ] **404 Page**: Try accessing a random URL (e.g., `/random-page`) and verify the custom 404 page appears.

## 6. Troubleshooting

*   **"Missing Table" Errors**: Run `npx supabase db push` again to ensure all migrations are applied.
*   **CORS Issues**: In Supabase Dashboard > Authentication > URL Configuration, add your production domain (e.g., `https://sleeponix.com`) to "Site URL" and "Redirect URLs".
*   **Build Failures**: Check the build logs. Common issues include TypeScript type errors. Run `npm run lint` locally to catch these before pushing.
