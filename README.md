# Sleeponix - Premium Natural Latex Mattresses

![Sleeponix Banner](public/images/hero-bg.jpg) 

Sleeponix is a high-end e-commerce platform designed for a premium sleep brand specializing in 100% organic, natural latex mattresses and eco-friendly sleep solutions. The application provides a seamless, luxurious shopping experience for customers and a robust management suite for administrators.

## 🌟 Key Features

### 🛍️ Customer Experience
*   **Premium Product Showcase**: Highly visual catalogs for mattresses (Hevea Heaven, Spine Relax, Bliss, etc.), pillows, and sleep accessories.
*   **Interactive Tools**: 
    *   **Measure Bed Size**: A guided tool to help customers choose the perfect mattress dimensions.
    *   **Store Finder**: Easily locate authorized Sleeponix showrooms.
*   **Seamless E-commerce Flow**: 
    *   Advanced shopping cart with real-time updates.
    *   Secure, multi-step checkout process with delivery estimation.
    *   Order confirmation with automatic invoice generation (PDF).
*   **Post-Purchase Support**: 
    *   Digital Warranty Registration system.
    *   Comprehensive FAQ and educational content (Why Latex?).

### 🔐 Admin Dashboard
*   **Secure Authentication**: Protected admin routes with Supabase Auth.
*   **Live Analytics**: Real-time tracking of orders, revenue, and customer engagement using Chart.js.
*   **Order Management**: Efficiently monitor and update order statuses.
*   **Income Analysis**: Detailed financial reports and trend visualizations.
*   **Email Center**: Centralized system for managing customer communications and notifications.

## 🛠️ Technology Stack

*   **Core**: [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
*   **Backend & Database**: [Supabase](https://supabase.com/) (PostgreSQL + Auth)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **State Management**: React Context API
*   **Forms**: React Hook Form
*   **Charts**: Chart.js & React-chartjs-2
*   **Notifications**: React Hot Toast
*   **PDF Generation**: jsPDF & jsPDF-AutoTable
*   **Icons**: Lucide React & React Icons

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18 or higher)
*   npm or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone [repository-url]
    cd project
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the root directory and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run in Development**:
    ```bash
    npm run dev
    ```

## 📂 Project Structure

```text
src/
├── admin/              # Admin panel pages, components, and hooks
├── assets/             # Images and static assets
├── components/         # Reusable UI components
│   ├── pages/          # Main application pages
│   ├── products/       # Product-specific page layouts
│   └── shared/         # Common UI elements (Navigation, Footer, etc.)
├── context/            # React Context providers (Cart, etc.)
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries and configurations
└── types.ts            # Global TypeScript definitions
```

## 📈 SEO & Performance
*   Optimized meta tags for search engine visibility.
*   Responsive design ensuring a premium experience on mobile, tablet, and desktop.
*   Fast-loading assets and component-based architecture for optimal performance.

---
*Built with ❤️ for a better night's sleep.*
