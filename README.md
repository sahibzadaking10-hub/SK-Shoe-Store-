# SK SHOES — Haute Footwear Atelier & E-Commerce Platform

A single-page e-commerce website and integrated management system built for **SK shoes**, featuring an aesthetic crafted with **Imperial Obsidian Black**, **Royal Burgundy Wine**, and **Electric Gold Yellow**, styled with **CSS Pro** and **Interactive JavaScript**.

---

## 🎨 Color Palette & Design Identity

- **Obsidian & Carbon Black** (`#070709`, `#0c0c10`, `#181822`) — Deep, matte luxury backdrop with glassmorphic cards.
- **Royal Burgundy Wine** (`#70102b`, `#8f1538`, `#b41d48`) — Regal velvet gradients, CTAs, and ambient radial glow.
- **Electric & Metallic Gold Yellow** (`#FFD000`, `#FFE366`) — High-energy luxury badges, price tags, and micro-interactions.
- **Bespoke Logo (Without Background)** — A high-end silhouette emblem crafted in **pure Black and Yellow** (`#000000` & `#FFD000`) on a transparent backdrop, featuring the dual-tone **`SK SHOES`** typography.
- **Typography** — Google Fonts *Syne* (bold haute couture titles) + *Plus Jakarta Sans* (refined modern UI).

---

## 🚀 How to Launch & View

1. **Direct Browser**: Simply double-click `index.html` to open it in any web browser (Google Chrome, Microsoft Edge, Brave, Firefox, Safari).
2. **Local Python Server** (Optional):
   ```powershell
   python -m http.server 8000
   ```
   Then navigate to `http://localhost:8000` in your browser.

---

## 🔐 Admin Portal Access & Credentials

The website includes a complete, interactive **Admin Portal** directly built-in.

### Access Gateways:
- Click the **"Admin Portal"** button in the top navigation bar (with glowing yellow pulse indicator)
- Click **"Admin Access"** in the Hero banner
- Click **"Open Admin Portal"** in the footer
- Click **"View in Admin Portal"** after placing any order

### Default Credentials:
| Field | Value |
| :--- | :--- |
| **Admin Email** | `admin@skshoes.com` |
| **Password** | `admin123` |
| **Shortcut** | Click the **"⚡ One-Click Auto Login"** button inside the login modal for instant access! |

---

## 🛠️ Features Included

### Storefront Experience:
- **Hero Showcase**: 3D floating showcase of flagship shoe with dynamic tags and stats.
- **Curated Catalog**: Filter by category (*Sneakers*, *Formals & Oxfords*, *Boots*, *Limited Edition*).
- **Instant Search**: Live search by shoe model, style, color, or description.
- **Sorting Options**: Sort by *Featured*, *Price: Low to High*, *Price: High to Low*, and *Highest Rated*.
- **Quick View Modal**: Interactive EU size selector (39–45) with zoom visuals and atelier specifications.
- **Slide-out Cart Drawer**: Item quantity increments, delete option, price subtotals.
- **VIP Coupon System**: Enter code `SKVIP20` at checkout for an instant **20% discount**.
- **Checkout Modal**: Collects customer name, VIP email, shipping address, and payment method (*Black Amex*, *Apple Pay*, *Cash on Delivery*).
- **Interactive Hotspots**: Interactive feature indicators with pulsing gold dots on the flagship shoe.
- **Audio Feedback**: Subtle luxury chimes generated with Web Audio API.

### Admin Portal Capabilities:
- **Real-Time Analytics**:
  - Live Gross Revenue counter
  - Completed Orders count
  - Inventory Stock tracker
  - Average Order Value
- **Inventory & Product CRUD**:
  - **Add New Shoe**: Add custom shoes with name, category, price, stock, badge, and image URL (includes quick presets!).
  - **Edit Footwear**: Update pricing, stock levels, or details of any existing shoe.
  - **Delete Footwear**: Remove shoes from the active storefront.
  - Changes instantly synchronize with the customer-facing storefront using browser `localStorage`.
- **Order Management**:
  - Review all placed customer orders with customer contact details and acquired pairs.
  - Switch order delivery status (*Pending* → *Shipped* → *Delivered*).
  - Clear test orders option.
