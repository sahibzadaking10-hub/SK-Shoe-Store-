/**
 * SK SHOES - LUXURY E-COMMERCE & ADMIN PORTAL ENGINE
 * Pure Vanilla JavaScript (ES6+) with LocalStorage persistence
 */

// ========================================================
// 1. INITIAL CATALOG DATA
// ========================================================
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "SK Imperial Burgundy Runner X-1",
    category: "Sneakers",
    price: 380,
    oldPrice: 450,
    rating: 4.9,
    badge: "VIP CHOICE",
    stock: 14,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    description: "Crafted in Florence with royal burgundy suede and aerodynamic carbon-plated arches. Infused with memory-rebound soles and gold eyelet accents.",
    sizes: [40, 41, 42, 43, 44, 45]
  },
  {
    id: 2,
    name: "SK Obsidian Sovereign Gold",
    category: "Sneakers",
    price: 420,
    oldPrice: 490,
    rating: 5.0,
    badge: "LIMITED DROP",
    stock: 7,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80",
    description: "Midnight carbon mesh with 18K yellow gold plated side-stripes. The pinnacle of luxury street elegance.",
    sizes: [41, 42, 43, 44]
  },
  {
    id: 3,
    name: "SK Tuscan Burgundy Brogue Oxford",
    category: "Formal",
    price: 480,
    oldPrice: 560,
    rating: 4.9,
    badge: "BESPOKE",
    stock: 12,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80",
    description: "Hand-patinated deep wine calfskin featuring classical medallion perforations and Goodyear welted leather soles.",
    sizes: [39, 40, 41, 42, 43, 44]
  },
  {
    id: 4,
    name: "SK Chelsea Velvet Boot",
    category: "Boots",
    price: 520,
    oldPrice: null,
    rating: 4.8,
    badge: "HOT",
    stock: 9,
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=900&q=80",
    description: "Obsidian calfskin and burgundy elasticized webbing. A timeless silhouette built with Blake-rapid stitching.",
    sizes: [40, 41, 42, 43, 45]
  },
  {
    id: 5,
    name: "SK Monte Carlo Luxury Loafer",
    category: "Formal",
    price: 440,
    oldPrice: 510,
    rating: 4.7,
    badge: "NEW",
    stock: 16,
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=900&q=80",
    description: "Italian bridle leather loafer adorned with brushed yellow-gold bit hardware and burgundy interior lining.",
    sizes: [40, 41, 42, 43, 44]
  },
  {
    id: 6,
    name: "SK Air Strike High-Top",
    category: "Sneakers",
    price: 360,
    oldPrice: 410,
    rating: 4.8,
    badge: "TRENDING",
    stock: 18,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80",
    description: "Architectural high-top featuring dual-tone obsidian panels, burgundy collar padding, and gold lace tips.",
    sizes: [41, 42, 43, 44, 45]
  },
  {
    id: 7,
    name: "SK Midnight Combat Commander",
    category: "Boots",
    price: 550,
    oldPrice: 620,
    rating: 4.9,
    badge: "EXCLUSIVE",
    stock: 5,
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=80",
    description: "Rugged yet refined. Heavy-gauge full-grain leather, reinforced lug soles, and deep burgundy inner fleece.",
    sizes: [41, 42, 43, 44]
  },
  {
    id: 8,
    name: "SK Solar Monarch 24K Edition",
    category: "Limited",
    price: 680,
    oldPrice: 790,
    rating: 5.0,
    badge: "LIMITED 1/50",
    stock: 3,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80",
    description: "Only 50 pairs handcrafted globally. Electrified solar yellow detailing, burgundy velvet insole, and numbered gold tongue badge.",
    sizes: [41, 42, 43, 44]
  }
];

const DEFAULT_ORDERS = [
  {
    id: "SK-9081",
    clientName: "Lord Arthur Sterling",
    clientEmail: "sterling@mayfair.co.uk",
    items: "SK Imperial Burgundy Runner X-1 (Size 43)",
    total: 380,
    address: "Mayfair, London, UK",
    paymentMethod: "Black Amex",
    date: "2026-11-05",
    status: "Delivered"
  },
  {
    id: "SK-9082",
    clientName: "Valerie de Montmirail",
    clientEmail: "valerie@haute.fr",
    items: "SK Obsidian Sovereign Gold (Size 42), SK Chelsea Velvet Boot (Size 42)",
    total: 940,
    address: "Avenue Montaigne, Paris, France",
    paymentMethod: "Apple Pay",
    date: "2026-11-05",
    status: "Shipped"
  },
  {
    id: "SK-9083",
    clientName: "Kenzo Takahashi",
    clientEmail: "kenzo@ginzalux.jp",
    items: "SK Solar Monarch 24K Edition (Size 44)",
    total: 680,
    address: "Ginza 6-Chome, Tokyo, Japan",
    paymentMethod: "Visa Infinite",
    date: "2026-11-06",
    status: "Pending"
  }
];

// ========================================================
// 2. STATE MANAGEMENT & STORAGE
// ========================================================
class StoreState {
  constructor() {
    this.products = this.loadProducts();
    this.orders = this.loadOrders();
    this.cart = this.loadCart();
    this.wishlist = this.loadWishlist();
    this.activeCategory = "all";
    this.searchQuery = "";
    this.sortOption = "featured";
    this.couponDiscount = 0; // e.g. 0.20 for 20%
    this.activeCouponCode = "";
    this.isAdminAuthenticated = false;
  }

  loadProducts() {
    const saved = localStorage.getItem("sk_products");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    localStorage.setItem("sk_products", JSON.stringify(DEFAULT_PRODUCTS));
    return [...DEFAULT_PRODUCTS];
  }

  saveProducts() {
    localStorage.setItem("sk_products", JSON.stringify(this.products));
  }

  loadOrders() {
    const saved = localStorage.getItem("sk_orders");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    localStorage.setItem("sk_orders", JSON.stringify(DEFAULT_ORDERS));
    return [...DEFAULT_ORDERS];
  }

  saveOrders() {
    localStorage.setItem("sk_orders", JSON.stringify(this.orders));
  }

  loadCart() {
    const saved = localStorage.getItem("sk_cart");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  }

  saveCart() {
    localStorage.setItem("sk_cart", JSON.stringify(this.cart));
  }

  loadWishlist() {
    const saved = localStorage.getItem("sk_wishlist");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  }

  saveWishlist() {
    localStorage.setItem("sk_wishlist", JSON.stringify(this.wishlist));
  }
}

const state = new StoreState();

// Subtle Luxury Audio Chime with Web Audio API
function playChime(type = "soft") {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "success") {
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else {
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    }
  } catch (e) {
    // Ignore if audio context is blocked
  }
}

// Toast Notifications
function showToast(message, icon = "✦") {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span style="color: var(--yellow-main); font-size: 1.1rem;">${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(15px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ========================================================
// 3. CATALOG RENDERING & FILTERING
// ========================================================
function getFilteredProducts() {
  let list = [...state.products];

  // Category filter
  if (state.activeCategory !== "all") {
    list = list.filter(p => p.category.toLowerCase() === state.activeCategory.toLowerCase());
  }

  // Search filter
  if (state.searchQuery.trim() !== "") {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.badge && p.badge.toLowerCase().includes(q))
    );
  }

  // Sort
  if (state.sortOption === "price-low") {
    list.sort((a, b) => a.price - b.price);
  } else if (state.sortOption === "price-high") {
    list.sort((a, b) => b.price - a.price);
  } else if (state.sortOption === "rating") {
    list.sort((a, b) => b.rating - a.rating);
  } else {
    // Featured default
    list.sort((a, b) => a.id - b.id);
  }

  return list;
}

function renderCatalog() {
  const grid = document.getElementById("productGrid");
  const emptyState = document.getElementById("emptyState");
  const allCount = document.getElementById("allCount");
  if (allCount) allCount.textContent = state.products.length;

  const filtered = getFilteredProducts();

  // Search query status row
  const filterRow = document.getElementById("filterStatusRow");
  const filterQueryText = document.getElementById("filterQueryText");
  if (state.searchQuery) {
    filterRow.style.display = "flex";
    filterQueryText.textContent = `"${state.searchQuery}" (${filtered.length} found)`;
  } else {
    filterRow.style.display = "none";
  }

  if (filtered.length === 0) {
    grid.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  grid.innerHTML = filtered.map(product => {
    const isWishlisted = state.wishlist.includes(product.id);
    const isLowStock = product.stock <= 5;
    
    return `
      <article class="product-card" data-id="${product.id}">
        <div class="product-media">
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
          <button class="product-wishlist-btn ${isWishlisted ? "active" : ""}" data-wishlist-id="${product.id}" title="Save to Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
          <button class="quick-view-overlay-btn" data-quick-id="${product.id}">
            <span>Quick Look</span>
          </button>
        </div>

        <div class="product-details">
          <div class="product-meta-row">
            <span class="product-cat">${product.category}</span>
            <div class="product-rating">
              <span>★</span>
              <span>${product.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 class="product-title">${product.name}</h3>

          <div class="product-price-row">
            <span class="price-current">$${product.price.toFixed(2)}</span>
            ${product.oldPrice ? `<span class="price-old">$${product.oldPrice.toFixed(2)}</span>` : ""}
            <span class="product-stock-tag ${isLowStock ? "low" : ""}">
              ${product.stock > 0 ? (isLowStock ? `Only ${product.stock} left` : "In Stock") : "Sold Out"}
            </span>
          </div>

          <div class="product-actions">
            <button class="btn-add-cart" data-add-id="${product.id}" ${product.stock <= 0 ? "disabled" : ""}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              <span>${product.stock > 0 ? "Acquire Pair" : "Sold Out"}</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  attachProductCardEvents();
}

function attachProductCardEvents() {
  // Wishlist toggle
  document.querySelectorAll("[data-wishlist-id]").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.wishlistId, 10);
      toggleWishlist(id);
    };
  });

  // Quick view
  document.querySelectorAll("[data-quick-id]").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.quickId, 10);
      openQuickView(id);
    };
  });

  // Add to cart directly
  document.querySelectorAll("[data-add-id]").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.addId, 10);
      const product = state.products.find(p => p.id === id);
      if (product && product.stock > 0) {
        addToCart(product, 42); // default size 42
      }
    };
  });
}

// Wishlist Logic
function toggleWishlist(id) {
  const index = state.wishlist.indexOf(id);
  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast("Removed from Private Wishlist", "♡");
  } else {
    state.wishlist.push(id);
    showToast("Added to Private Wishlist", "♥");
    playChime("soft");
  }
  state.saveWishlist();
  updateCounters();
  renderCatalog();
}

function updateCounters() {
  const wishEl = document.getElementById("wishlistCount");
  if (wishEl) wishEl.textContent = state.wishlist.length;

  const totalCartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartEl = document.getElementById("cartCount");
  if (cartEl) cartEl.textContent = totalCartCount;

  const cartTag = document.getElementById("cartItemsTag");
  if (cartTag) cartTag.textContent = `${totalCartCount} ${totalCartCount === 1 ? "Pair" : "Pairs"}`;
}

// ========================================================
// 4. QUICK VIEW MODAL
// ========================================================
let selectedModalSize = 42;

function openQuickView(id) {
  const product = state.products.find(p => p.id === id);
  if (!product) return;

  selectedModalSize = product.sizes ? product.sizes[0] : 42;

  const modal = document.getElementById("quickViewModal");
  const container = document.getElementById("quickViewContent");

  container.innerHTML = `
    <div class="qv-visual">
      <img src="${product.image}" alt="${product.name}" class="qv-image">
    </div>
    <div class="qv-meta">
      <span class="qv-cat">${product.category}</span>
      <h2 class="qv-title">${product.name}</h2>
      <div class="qv-price">$${product.price.toFixed(2)}</div>
      <p class="qv-desc">${product.description}</p>

      <span class="size-select-label">Select Atelier Size (EU):</span>
      <div class="size-options" id="qvSizeOptions">
        ${(product.sizes || [40, 41, 42, 43, 44, 45]).map(size => `
          <button class="size-pill ${size === selectedModalSize ? "active" : ""}" data-size="${size}">${size}</button>
        `).join("")}
      </div>

      <div class="spotlight-guarantee" style="margin-bottom: 1.25rem;">
        ✓ Handcrafted in Italy • Includes Certificate of Authenticity
      </div>

      <button class="btn btn-primary" id="qvAddToCartBtn" ${product.stock <= 0 ? "disabled" : ""}>
        <span>${product.stock > 0 ? "Add to Shopping Bag" : "Sold Out"}</span>
      </button>
    </div>
  `;

  // Attach size selection
  const sizePills = container.querySelectorAll(".size-pill");
  sizePills.forEach(pill => {
    pill.onclick = () => {
      sizePills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      selectedModalSize = parseInt(pill.dataset.size, 10);
    };
  });

  // Attach add to cart
  const addBtn = container.querySelector("#qvAddToCartBtn");
  if (addBtn) {
    addBtn.onclick = () => {
      addToCart(product, selectedModalSize);
      closeQuickView();
      openCartDrawer();
    };
  }

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeQuickView() {
  const modal = document.getElementById("quickViewModal");
  if (modal) modal.classList.remove("open");
  document.body.style.overflow = "";
}

// ========================================================
// 5. SHOPPING CART SYSTEM & CHECKOUT
// ========================================================
function addToCart(product, size = 42) {
  const existing = state.cart.find(item => item.id === product.id && item.size === size);

  if (existing) {
    if (existing.quantity < product.stock) {
      existing.quantity += 1;
      showToast(`Increased ${product.name} (EU ${size}) quantity`, "✦");
    } else {
      showToast(`Maximum stock limit reached for this size (${product.stock})`, "⚠");
      return;
    }
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      quantity: 1,
      maxStock: product.stock
    });
    showToast(`Added ${product.name} (EU ${size}) to Bag`, "✦");
  }

  playChime("success");
  state.saveCart();
  updateCounters();
  renderCart();
}

function openCartDrawer() {
  renderCart();
  const drawer = document.getElementById("cartDrawer");
  if (drawer) drawer.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  if (drawer) drawer.classList.remove("open");
  document.body.style.overflow = "";
}

function renderCart() {
  const body = document.getElementById("cartBody");
  const subtotalEl = document.getElementById("cartSubtotal");
  const discountEl = document.getElementById("cartDiscount");
  const discountLine = document.getElementById("discountLine");
  const totalEl = document.getElementById("cartTotal");

  if (!body) return;

  if (state.cart.length === 0) {
    body.innerHTML = `
      <div class="empty-cart-msg">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 1rem; color: var(--text-dim);"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
        <p>Your luxury collection bag is empty.</p>
        <p style="font-size: 0.82rem; margin-top: 0.5rem;">Explore our master archive and select a bespoke pair.</p>
      </div>
    `;
    subtotalEl.textContent = "$0.00";
    if (discountLine) discountLine.style.display = "none";
    totalEl.textContent = "$0.00";
    return;
  }

  let subtotal = 0;
  body.innerHTML = state.cart.map((item, index) => {
    const itemSub = item.price * item.quantity;
    subtotal += itemSub;
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-size">Size: EU ${item.size}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="cart-qty-ctrl">
            <button class="qty-btn" data-cart-minus="${index}">-</button>
            <span class="qty-num">${item.quantity}</span>
            <button class="qty-btn" data-cart-plus="${index}">+</button>
          </div>
        </div>
        <button class="cart-item-del" data-cart-del="${index}" title="Remove item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      </div>
    `;
  }).join("");

  // Subtotal & discount calculation
  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

  let discountAmt = 0;
  if (state.couponDiscount > 0) {
    discountAmt = subtotal * state.couponDiscount;
    if (discountLine) {
      discountLine.style.display = "flex";
      discountEl.textContent = `-$${discountAmt.toFixed(2)}`;
    }
  } else {
    if (discountLine) discountLine.style.display = "none";
  }

  const finalTotal = Math.max(0, subtotal - discountAmt);
  totalEl.textContent = `$${finalTotal.toFixed(2)}`;

  // Attach cart events
  body.querySelectorAll("[data-cart-minus]").forEach(btn => {
    btn.onclick = () => {
      const idx = parseInt(btn.dataset.cartMinus, 10);
      if (state.cart[idx].quantity > 1) {
        state.cart[idx].quantity -= 1;
      } else {
        state.cart.splice(idx, 1);
      }
      state.saveCart();
      updateCounters();
      renderCart();
    };
  });

  body.querySelectorAll("[data-cart-plus]").forEach(btn => {
    btn.onclick = () => {
      const idx = parseInt(btn.dataset.cartPlus, 10);
      const item = state.cart[idx];
      if (item.quantity < (item.maxStock || 99)) {
        item.quantity += 1;
        state.saveCart();
        updateCounters();
        renderCart();
      } else {
        showToast("Maximum available stock reached", "⚠");
      }
    };
  });

  body.querySelectorAll("[data-cart-del]").forEach(btn => {
    btn.onclick = () => {
      const idx = parseInt(btn.dataset.cartDel, 10);
      state.cart.splice(idx, 1);
      state.saveCart();
      updateCounters();
      renderCart();
    };
  });
}

// Promo Code system
function setupCoupon() {
  const btn = document.getElementById("applyCouponBtn");
  const input = document.getElementById("couponInput");
  const msg = document.getElementById("couponMsg");

  if (!btn || !input) return;

  btn.onclick = () => {
    const code = input.value.trim().toUpperCase();
    if (code === "SKVIP20") {
      state.couponDiscount = 0.20;
      state.activeCouponCode = "SKVIP20";
      msg.className = "coupon-msg success";
      msg.textContent = "✓ VIP Privilege Activated: 20% Off entire collection!";
      playChime("success");
      renderCart();
    } else if (code === "") {
      msg.className = "coupon-msg error";
      msg.textContent = "Please enter a valid concierge code.";
    } else {
      msg.className = "coupon-msg error";
      msg.textContent = "Invalid code. Try using 'SKVIP20'.";
    }
  };
}

// Checkout Modal & Order Placement
function setupCheckout() {
  const checkoutBtn = document.getElementById("checkoutBtn");
  const checkoutModal = document.getElementById("checkoutModal");
  const checkoutCloseBtn = document.getElementById("checkoutCloseBtn");
  const checkoutBackdrop = document.getElementById("checkoutBackdrop");
  const checkoutForm = document.getElementById("checkoutForm");
  const totalDisplay = document.getElementById("checkoutTotalDisplay");

  if (!checkoutBtn) return;

  checkoutBtn.onclick = () => {
    if (state.cart.length === 0) {
      showToast("Your bag is currently empty", "⚠");
      return;
    }

    // Calculate final total
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = subtotal * state.couponDiscount;
    const finalTotal = subtotal - discount;
    totalDisplay.textContent = `$${finalTotal.toFixed(2)}`;

    closeCartDrawer();
    checkoutModal.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeCheckout = () => {
    checkoutModal.classList.remove("open");
    document.body.style.overflow = "";
  };

  checkoutCloseBtn.onclick = closeCheckout;
  checkoutBackdrop.onclick = closeCheckout;

  checkoutForm.onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById("custName").value.trim();
    const email = document.getElementById("custEmail").value.trim();
    const address = document.getElementById("custAddress").value.trim();
    const city = document.getElementById("custCity").value.trim();
    const postal = document.getElementById("custPostal").value.trim();
    const payment = document.querySelector("input[name='paymentMethod']:checked").value;

    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const finalTotal = Math.max(0, subtotal * (1 - state.couponDiscount));

    const itemsSummary = state.cart.map(i => `${i.name} (EU ${i.size} × ${i.quantity})`).join(", ");

    // Generate Luxury Order ID
    const orderId = `SK-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      id: orderId,
      clientName: name,
      clientEmail: email,
      items: itemsSummary,
      total: Math.round(finalTotal),
      address: `${address}, ${city} ${postal}`,
      paymentMethod: payment,
      date: new Date().toISOString().split("T")[0],
      status: "Pending"
    };

    // Deduct stock
    state.cart.forEach(cartItem => {
      const prod = state.products.find(p => p.id === cartItem.id);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - cartItem.quantity);
      }
    });

    state.orders.unshift(newOrder);
    state.saveOrders();
    state.saveProducts();

    // Clear cart
    state.cart = [];
    state.saveCart();
    updateCounters();
    renderCatalog();

    // Close checkout form, open confirmation
    closeCheckout();
    openSuccessModal(orderId);
  };
}

function openSuccessModal(orderId) {
  const modal = document.getElementById("orderSuccessModal");
  const orderNumEl = document.getElementById("confirmedOrderId");
  if (orderNumEl) orderNumEl.textContent = orderId;
  if (modal) modal.classList.add("open");
  playChime("success");

  document.getElementById("continueShoppingBtn").onclick = () => {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  };

  document.getElementById("viewInAdminBtn").onclick = () => {
    modal.classList.remove("open");
    document.body.style.overflow = "";
    openAdminPortalDirect();
  };
}

// ========================================================
// 6. ADMIN PORTAL (LOGIN & FULL MANAGEMENT)
// ========================================================
const ADMIN_CREDENTIALS = {
  email: "admin@skshoes.com",
  password: "admin123"
};

function setupAdminSystem() {
  const adminPortalBtn = document.getElementById("adminPortalBtn");
  const heroAdminBtn = document.getElementById("heroAdminBtn");
  const footerAdminBtn = document.getElementById("footerAdminBtn");
  const mobileAdminTrigger = document.getElementById("mobileAdminTrigger");

  const adminLoginModal = document.getElementById("adminLoginModal");
  const adminLoginCloseBtn = document.getElementById("adminLoginCloseBtn");
  const adminLoginBackdrop = document.getElementById("adminLoginBackdrop");
  const adminLoginForm = document.getElementById("adminLoginForm");
  const adminLoginError = document.getElementById("adminLoginError");
  const oneClickLoginBtn = document.getElementById("oneClickLoginBtn");

  const adminDashboard = document.getElementById("adminDashboard");
  const adminExitBtn = document.getElementById("adminExitBtn");
  const adminLogoutBtn = document.getElementById("adminLogoutBtn");

  const openAdminModal = () => {
    if (state.isAdminAuthenticated) {
      showAdminDashboard();
    } else {
      adminLoginModal.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  };

  const closeAdminModal = () => {
    adminLoginModal.classList.remove("open");
    document.body.style.overflow = "";
    if (adminLoginError) adminLoginError.style.display = "none";
  };

  if (adminPortalBtn) adminPortalBtn.onclick = openAdminModal;
  if (heroAdminBtn) heroAdminBtn.onclick = openAdminModal;
  if (footerAdminBtn) footerAdminBtn.onclick = openAdminModal;
  if (mobileAdminTrigger) {
    mobileAdminTrigger.onclick = () => {
      document.getElementById("mobileDrawer").classList.remove("open");
      openAdminModal();
    };
  }

  adminLoginCloseBtn.onclick = closeAdminModal;
  adminLoginBackdrop.onclick = closeAdminModal;

  // One-click quick login for the user
  if (oneClickLoginBtn) {
    oneClickLoginBtn.onclick = () => {
      document.getElementById("adminEmail").value = ADMIN_CREDENTIALS.email;
      document.getElementById("adminPassword").value = ADMIN_CREDENTIALS.password;
      submitAdminAuth();
    };
  }

  adminLoginForm.onsubmit = (e) => {
    e.preventDefault();
    submitAdminAuth();
  };

  function submitAdminAuth() {
    const email = document.getElementById("adminEmail").value.trim();
    const pass = document.getElementById("adminPassword").value.trim();

    if (email === ADMIN_CREDENTIALS.email && pass === ADMIN_CREDENTIALS.password) {
      state.isAdminAuthenticated = true;
      closeAdminModal();
      showToast("Access Granted. Welcome Administrator.", "🔒");
      playChime("success");
      showAdminDashboard();
    } else {
      adminLoginError.style.display = "block";
      adminLoginError.textContent = "Invalid administrator credentials. Please check details.";
    }
  }

  // Dashboard Exit & Logout
  if (adminExitBtn) {
    adminExitBtn.onclick = () => {
      adminDashboard.style.display = "none";
      document.body.style.overflow = "";
      renderCatalog(); // re-render storefront in case changes occurred
    };
  }

  if (adminLogoutBtn) {
    adminLogoutBtn.onclick = () => {
      state.isAdminAuthenticated = false;
      adminDashboard.style.display = "none";
      document.body.style.overflow = "";
      showToast("Logged out of Admin Portal", "🔒");
    };
  }

  // Admin Tab Navigation
  document.querySelectorAll(".admin-nav-item").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".admin-nav-item").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".admin-tab-content").forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      const tabName = btn.dataset.tab;
      const target = document.getElementById(`tab-${tabName}`);
      if (target) target.classList.add("active");

      const titleMap = {
        overview: "Atelier Overview",
        products: "Footwear Inventory Management",
        orders: "Client Orders & Fulfillment"
      };
      document.getElementById("adminViewTitle").textContent = titleMap[tabName] || "Admin Portal";
    };
  });

  // Shortcut link buttons inside overview
  const gotoOrdersBtn = document.getElementById("gotoOrdersBtn");
  if (gotoOrdersBtn) {
    gotoOrdersBtn.onclick = () => {
      document.querySelector(".admin-nav-item[data-tab='orders']").click();
    };
  }

  const gotoProductsBtn = document.getElementById("gotoProductsBtn");
  if (gotoProductsBtn) {
    gotoProductsBtn.onclick = () => {
      document.querySelector(".admin-nav-item[data-tab='products']").click();
    };
  }

  // Clear test orders
  const clearOrdersBtn = document.getElementById("adminClearOrdersBtn");
  if (clearOrdersBtn) {
    clearOrdersBtn.onclick = () => {
      if (confirm("Reset orders to default demonstration data?")) {
        state.orders = [...DEFAULT_ORDERS];
        state.saveOrders();
        renderAdminDashboard();
        showToast("Demo orders restored", "✓");
      }
    };
  }

  setupProductCrud();
}

function openAdminPortalDirect() {
  state.isAdminAuthenticated = true;
  showAdminDashboard();
}

function showAdminDashboard() {
  const dash = document.getElementById("adminDashboard");
  dash.style.display = "flex";
  document.body.style.overflow = "hidden";
  renderAdminDashboard();
}

function renderAdminDashboard() {
  // 1. Calculate Stats
  const grossRev = state.orders.reduce((sum, ord) => sum + ord.total, 0);
  const totalOrders = state.orders.length;
  const totalProducts = state.products.length;
  const avgTicket = totalOrders > 0 ? (grossRev / totalOrders) : 0;

  document.getElementById("statGrossRevenue").textContent = `$${grossRev.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
  document.getElementById("statOrderCount").textContent = totalOrders;
  document.getElementById("statProductCount").textContent = totalProducts;
  document.getElementById("statAvgTicket").textContent = `$${avgTicket.toFixed(2)}`;
  document.getElementById("adminOrderBadge").textContent = totalOrders;

  // 2. Render Recent Orders (in Overview)
  const recentOrdersBody = document.getElementById("adminRecentOrdersBody");
  if (recentOrdersBody) {
    recentOrdersBody.innerHTML = state.orders.slice(0, 5).map(ord => `
      <tr>
        <td><strong>${ord.id}</strong></td>
        <td>
          <div style="font-weight: 700; color: #fff;">${ord.clientName}</div>
          <div style="font-size: 0.75rem; color: var(--text-dim);">${ord.clientEmail}</div>
        </td>
        <td><strong style="color: var(--yellow-main);">$${ord.total.toFixed(2)}</strong></td>
        <td>${ord.paymentMethod}</td>
        <td>
          <span class="status-badge status-${ord.status.toLowerCase()}">${ord.status}</span>
        </td>
      </tr>
    `).join("");
  }

  // 3. Render Stock Highlights (in Overview)
  const stockList = document.getElementById("stockHighlightsList");
  if (stockList) {
    stockList.innerHTML = state.products.slice(0, 4).map(prod => `
      <div class="stock-item-row">
        <img src="${prod.image}" alt="${prod.name}" class="stock-thumb">
        <div class="stock-info">
          <strong>${prod.name}</strong>
          <span>${prod.category} • $${prod.price}</span>
        </div>
        <div class="stock-count-badge">${prod.stock} Units</div>
      </div>
    `).join("");
  }

  // 4. Render All Products in Tab
  const productsTableBody = document.getElementById("adminProductsTableBody");
  if (productsTableBody) {
    productsTableBody.innerHTML = state.products.map(prod => `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 0.85rem;">
            <img src="${prod.image}" alt="${prod.name}" style="width: 44px; height: 44px; border-radius: 6px; object-fit: cover;">
            <div>
              <strong style="color: #fff; font-size: 0.92rem;">${prod.name}</strong>
              <div style="font-size: 0.75rem; color: var(--text-dim); max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                ${prod.description}
              </div>
            </div>
          </div>
        </td>
        <td><span style="color: var(--yellow-main); font-weight: 600;">${prod.category}</span></td>
        <td><strong>$${prod.price.toFixed(2)}</strong></td>
        <td>
          <span style="font-weight: 800; color: ${prod.stock <= 5 ? "#ff4757" : "#55efc4"}">
            ${prod.stock} pairs
          </span>
        </td>
        <td><span class="product-badge" style="position: static;">${prod.badge || "STANDARD"}</span></td>
        <td>★ ${prod.rating.toFixed(1)}</td>
        <td class="text-right">
          <button class="action-icon-btn btn-edit-product" data-edit-id="${prod.id}" title="Edit Footwear">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          </button>
          <button class="action-icon-btn btn-del" data-del-id="${prod.id}" title="Delete Footwear">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </td>
      </tr>
    `).join("");

    // Attach Edit / Delete events
    productsTableBody.querySelectorAll(".btn-edit-product").forEach(btn => {
      btn.onclick = () => {
        const id = parseInt(btn.dataset.editId, 10);
        openProductForm(id);
      };
    });

    productsTableBody.querySelectorAll(".btn-del").forEach(btn => {
      btn.onclick = () => {
        const id = parseInt(btn.dataset.delId, 10);
        if (confirm("Are you sure you want to delete this shoe from the catalog?")) {
          state.products = state.products.filter(p => p.id !== id);
          state.saveProducts();
          renderAdminDashboard();
          showToast("Shoe removed from catalog", "🗑️");
        }
      };
    });
  }

  // 5. Render All Orders in Tab
  const ordersTableBody = document.getElementById("adminAllOrdersTableBody");
  if (ordersTableBody) {
    ordersTableBody.innerHTML = state.orders.map(ord => `
      <tr>
        <td><strong>${ord.id}</strong><br><span style="font-size: 0.72rem; color: var(--text-dim);">${ord.date}</span></td>
        <td>
          <div style="font-weight: 700; color: #fff;">${ord.clientName}</div>
          <div style="font-size: 0.75rem; color: var(--yellow-main);">${ord.clientEmail}</div>
        </td>
        <td style="max-width: 250px; font-size: 0.82rem;">${ord.items}</td>
        <td><strong style="color: var(--yellow-main); font-size: 1.05rem;">$${ord.total.toFixed(2)}</strong><br><span style="font-size: 0.72rem; color: var(--text-dim);">${ord.paymentMethod}</span></td>
        <td style="font-size: 0.82rem; color: var(--text-muted);">${ord.address}</td>
        <td>
          <select class="custom-select status-select" data-order-id="${ord.id}" style="padding: 0.35rem 1.6rem 0.35rem 0.65rem; font-size: 0.78rem;">
            <option value="Pending" ${ord.status === "Pending" ? "selected" : ""}>Pending</option>
            <option value="Shipped" ${ord.status === "Shipped" ? "selected" : ""}>Shipped</option>
            <option value="Delivered" ${ord.status === "Delivered" ? "selected" : ""}>Delivered</option>
          </select>
        </td>
        <td class="text-right">
          <button class="action-icon-btn btn-del" data-del-order="${ord.id}" title="Remove Order">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </td>
      </tr>
    `).join("");

    // Attach Status change
    ordersTableBody.querySelectorAll(".status-select").forEach(sel => {
      sel.onchange = () => {
        const orderId = sel.dataset.orderId;
        const target = state.orders.find(o => o.id === orderId);
        if (target) {
          target.status = sel.value;
          state.saveOrders();
          showToast(`Order ${orderId} status set to ${sel.value}`, "✓");
        }
      };
    });

    // Delete order
    ordersTableBody.querySelectorAll("[data-del-order]").forEach(btn => {
      btn.onclick = () => {
        const id = btn.dataset.delOrder;
        if (confirm(`Remove order ${id} from registry?`)) {
          state.orders = state.orders.filter(o => o.id !== id);
          state.saveOrders();
          renderAdminDashboard();
          showToast("Order removed from database", "🗑️");
        }
      };
    });
  }
}

// Product Add / Edit Modal inside Admin
function setupProductCrud() {
  const modal = document.getElementById("productFormModal");
  const form = document.getElementById("productForm");
  const closeBtn = document.getElementById("productFormCloseBtn");
  const cancelBtn = document.getElementById("productFormCancelBtn");
  const backdrop = document.getElementById("productFormBackdrop");
  const addBtnTop = document.getElementById("adminAddShoeBtn");
  const addBtnTab = document.getElementById("adminAddShoeBtn2");

  const closeModal = () => modal.classList.remove("open");

  if (addBtnTop) addBtnTop.onclick = () => openProductForm(null);
  if (addBtnTab) addBtnTab.onclick = () => openProductForm(null);
  if (closeBtn) closeBtn.onclick = closeModal;
  if (cancelBtn) cancelBtn.onclick = closeModal;
  if (backdrop) backdrop.onclick = closeModal;

  // Preset image quick pickers
  document.querySelectorAll(".preset-btn").forEach(btn => {
    btn.onclick = () => {
      document.getElementById("pImgUrl").value = btn.dataset.url;
    };
  });

  form.onsubmit = (e) => {
    e.preventDefault();
    const editId = document.getElementById("editProductId").value;
    const name = document.getElementById("pName").value.trim();
    const category = document.getElementById("pCategory").value;
    const price = parseFloat(document.getElementById("pPrice").value);
    const oldPriceVal = document.getElementById("pOldPrice").value;
    const oldPrice = oldPriceVal ? parseFloat(oldPriceVal) : null;
    const stock = parseInt(document.getElementById("pStock").value, 10);
    const badge = document.getElementById("pBadge").value.trim();
    const rating = parseFloat(document.getElementById("pRating").value) || 4.9;
    const image = document.getElementById("pImgUrl").value.trim();
    const description = document.getElementById("pDescription").value.trim();

    if (editId) {
      // Update existing
      const p = state.products.find(item => item.id === parseInt(editId, 10));
      if (p) {
        p.name = name;
        p.category = category;
        p.price = price;
        p.oldPrice = oldPrice;
        p.stock = stock;
        p.badge = badge;
        p.rating = rating;
        p.image = image;
        p.description = description;
        showToast(`Updated "${name}" successfully`, "✓");
      }
    } else {
      // Create new
      const newId = state.products.length > 0 ? Math.max(...state.products.map(p => p.id)) + 1 : 1;
      const newProduct = {
        id: newId,
        name,
        category,
        price,
        oldPrice,
        stock,
        badge,
        rating,
        image,
        description,
        sizes: [40, 41, 42, 43, 44, 45]
      };
      state.products.unshift(newProduct);
      showToast(`Added new shoe "${name}" to storefront!`, "👟");
    }

    state.saveProducts();
    renderAdminDashboard();
    renderCatalog();
    closeModal();
    playChime("success");
  };
}

function openProductForm(productId = null) {
  const modal = document.getElementById("productFormModal");
  const title = document.getElementById("productFormTitle");
  const form = document.getElementById("productForm");

  form.reset();

  if (productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    title.textContent = "Edit Footwear Listing";
    document.getElementById("editProductId").value = product.id;
    document.getElementById("pName").value = product.name;
    document.getElementById("pCategory").value = product.category;
    document.getElementById("pPrice").value = product.price;
    document.getElementById("pOldPrice").value = product.oldPrice || "";
    document.getElementById("pStock").value = product.stock;
    document.getElementById("pBadge").value = product.badge || "";
    document.getElementById("pRating").value = product.rating;
    document.getElementById("pImgUrl").value = product.image;
    document.getElementById("pDescription").value = product.description;
  } else {
    title.textContent = "Add New Shoe to Catalog";
    document.getElementById("editProductId").value = "";
    document.getElementById("pRating").value = "4.9";
    document.getElementById("pStock").value = "12";
  }

  modal.classList.add("open");
}

// ========================================================
// 7. INITIALIZATION & EVENT LISTENERS
// ========================================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initial Render
  renderCatalog();
  updateCounters();

  // 2. Category Tabs
  document.querySelectorAll(".cat-pill").forEach(pill => {
    pill.onclick = () => {
      document.querySelectorAll(".cat-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      state.activeCategory = pill.dataset.category;
      renderCatalog();
    };
  });

  // Footer category links
  document.querySelectorAll("[data-cat]").forEach(link => {
    link.onclick = (e) => {
      e.preventDefault();
      const cat = link.dataset.cat;
      const targetPill = document.querySelector(`.cat-pill[data-category="${cat}"]`);
      if (targetPill) targetPill.click();
      document.getElementById("collection").scrollIntoView({ behavior: "smooth" });
    };
  });

  // 3. Search Bar Trigger
  const searchTriggerBtn = document.getElementById("searchTriggerBtn");
  const searchOverlay = document.getElementById("searchOverlay");
  const searchCloseBtn = document.getElementById("searchCloseBtn");
  const storeSearchInput = document.getElementById("storeSearchInput");

  if (searchTriggerBtn && searchOverlay) {
    searchTriggerBtn.onclick = () => {
      searchOverlay.classList.toggle("open");
      if (searchOverlay.classList.contains("open")) {
        storeSearchInput.focus();
      }
    };
    searchCloseBtn.onclick = () => {
      searchOverlay.classList.remove("open");
      storeSearchInput.value = "";
      state.searchQuery = "";
      renderCatalog();
    };
    storeSearchInput.oninput = (e) => {
      state.searchQuery = e.target.value;
      renderCatalog();
    };
  }

  // Clear filter button
  const clearFilterBtn = document.getElementById("clearFilterBtn");
  if (clearFilterBtn) {
    clearFilterBtn.onclick = () => {
      state.searchQuery = "";
      if (storeSearchInput) storeSearchInput.value = "";
      renderCatalog();
    };
  }

  const resetCatalogBtn = document.getElementById("resetCatalogBtn");
  if (resetCatalogBtn) {
    resetCatalogBtn.onclick = () => {
      state.searchQuery = "";
      state.activeCategory = "all";
      document.querySelectorAll(".cat-pill").forEach(p => p.classList.remove("active"));
      document.querySelector(".cat-pill[data-category='all']").classList.add("active");
      if (storeSearchInput) storeSearchInput.value = "";
      renderCatalog();
    };
  }

  // 4. Sort Dropdown
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.onchange = (e) => {
      state.sortOption = e.target.value;
      renderCatalog();
    };
  }

  // 5. Header Cart Trigger
  const cartTriggerBtn = document.getElementById("cartTriggerBtn");
  const cartCloseBtn = document.getElementById("cartCloseBtn");
  const cartBackdrop = document.getElementById("cartBackdrop");

  if (cartTriggerBtn) cartTriggerBtn.onclick = openCartDrawer;
  if (cartCloseBtn) cartCloseBtn.onclick = closeCartDrawer;
  if (cartBackdrop) cartBackdrop.onclick = closeCartDrawer;

  // 6. Quick View Modal Close
  const quickViewCloseBtn = document.getElementById("quickViewCloseBtn");
  const quickViewBackdrop = document.getElementById("quickViewBackdrop");
  if (quickViewCloseBtn) quickViewCloseBtn.onclick = closeQuickView;
  if (quickViewBackdrop) quickViewBackdrop.onclick = closeQuickView;

  // 7. Spotlight Order Button
  const spotlightOrderBtn = document.getElementById("spotlightOrderBtn");
  if (spotlightOrderBtn) {
    spotlightOrderBtn.onclick = () => {
      const p = state.products.find(item => item.id === 2);
      if (p) {
        addToCart(p, 43);
        openCartDrawer();
      }
    };
  }

  // 8. Mobile Menu Drawer
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const drawerCloseBtn = document.getElementById("drawerCloseBtn");

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.onclick = () => mobileDrawer.classList.add("open");
    drawerCloseBtn.onclick = () => mobileDrawer.classList.remove("open");
    document.querySelectorAll(".mobile-link").forEach(l => {
      l.onclick = () => mobileDrawer.classList.remove("open");
    });
  }

  // 9. Sticky Header styling on scroll
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // 10. Newsletter Form
  const nlForm = document.getElementById("newsletterForm");
  if (nlForm) {
    nlForm.onsubmit = (e) => {
      e.preventDefault();
      const email = document.getElementById("nlEmail").value;
      showToast(`Welcome to SK Private Circle! Check ${email} for your $40 code.`, "👑");
      playChime("success");
      nlForm.reset();
    };
  }

  // 11. Wishlist Header button click
  const wishlistBtn = document.getElementById("wishlistBtn");
  if (wishlistBtn) {
    wishlistBtn.onclick = () => {
      if (state.wishlist.length === 0) {
        showToast("Your wishlist is empty. Tap the heart on any shoe!", "♡");
      } else {
        showToast(`You have ${state.wishlist.length} pairs in your private wishlist!`, "♥");
      }
    };
  }

  // Setup Systems
  setupCoupon();
  setupCheckout();
  setupAdminSystem();
});
