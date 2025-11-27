console.log('Script loaded');

const products = [
  { id: 1, title: 'Midnight Vinyl', artist: 'Various', price: 24.99, image: 'images/images.jpg', desc: 'A smooth collection of midnight jazz and lo-fi beats perfect for late-night study sessions.' },
  { id: 2, title: 'Sunset Beats', artist: 'DJ Sol', price: 19.99, image: 'images/sunsetbeats.jpg', desc: 'Energetic electronic tracks that capture the vibe of a summer sunset party.' },
  { id: 3, title: 'City Pop Classics', artist: 'RetroBand', price: 29.99, image: 'images/ctpop.jpg', desc: 'Nostalgic 80s Japanese city pop hits remastered for the modern audiophile.' },
  
  { id: 4, title: 'House Nights', artist: 'ClubMix', price: 17.5, image: 'images/album4.svg', desc: 'Deep house rhythms and basslines to keep the dance floor moving all night long.' },
  { id: 5, title: 'Rap Essentials', artist: 'MC Flow', price: 21.0, image: 'images/album5.svg', desc: 'Raw and lyrical hip-hop tracks featuring the best underground artists.' },
  { id: 6, title: 'Acoustic Sessions', artist: 'Strum', price: 16.0, image: 'images/album6.svg', desc: 'Stripped-back acoustic covers and originals for a chill and intimate atmosphere.' }
  ,{ id: 7, title: 'UKMX T-Shirt', artist: 'Merch', price: 25.00, image: 'images/tshirt.svg', desc: 'Official UKMX cotton t-shirt, available in sizes S–XL. Soft, durable, perfect for gigs.' }
  ,{ id: 8, title: 'UKMX Tote Bag', artist: 'Merch', price: 12.50, image: 'images/tote.svg', desc: 'Reusable tote bag with UKMX logo — carry your records in style.' }
  ,{ id: 9, title: 'Live at Reykjavík - CD', artist: 'Various Artists', price: 14.99, image: 'images/livecd.svg', desc: 'A compilation CD featuring live performances recorded at local Reykjavík venues.' }
  ,{ id: 10, title: 'Summer Hits - Vinyl', artist: 'Various', price: 30.00, image: 'images/summervinyl.svg', desc: 'A sun-soaked collection of summer anthems pressed on high-quality vinyl.' }
  ,{ id: 11, title: 'Retro Mix - Cassette', artist: 'DJ Tape', price: 9.99, image: 'images/cassette.svg', desc: 'Limited cassette release with lo-fi and retro electronic mixes.' }
  ,{ id: 12, title: 'UKMX Hoodie', artist: 'Merch', price: 49.00, image: 'images/hoodie.svg', desc: 'Comfort-fit hoodie with embroidered UKMX logo. Cozy and warm for Reykjavík nights.' }
  ,{ id: 13, title: 'UKMX Beanie', artist: 'Merch', price: 18.00, image: 'images/beanie.svg', desc: 'Wool beanie with small UKMX patch — perfect for cold gigs.' }
  ,{ id: 14, title: 'Sticker Pack', artist: 'Merch', price: 6.50, image: 'images/sticker.svg', desc: 'Pack of 5 stickers with UKMX designs.' }
  ,{ id: 15, title: 'Icelandic Indie Vol.1 (CD)', artist: 'Various', price: 13.50, image: 'images/cd2.svg', desc: 'A showcase of Icelandic indie bands from Reykjavík and beyond.' }
  ,{ id: 16, title: 'Electronica Mix (CD)', artist: 'DJ Sol', price: 12.99, image: 'images/livecd.svg', desc: 'Curated electronica and downtempo mixes for late-night listening.' }
  ,{ id: 17, title: 'Acoustic Live Sessions (CD)', artist: 'Strum', price: 11.99, image: 'images/livecd.svg', desc: 'Intimate live acoustic recordings from small Reykjavík venues.' }
  ,{ id: 18, title: 'Limited Poster', artist: 'Merch', price: 9.99, image: 'images/images.jpg', desc: 'Limited-run concert poster, perfect for framing.' }
  
];

// Elements
const productsContainer = document.getElementById('productsContainer');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItemsEl = document.getElementById('cartItems');
const cartCountEl = document.getElementById('cartCount');
const cartTotalEl = document.getElementById('cartTotal');
const clearCartBtn = document.getElementById('clearCartBtn');
const checkoutBtn = document.getElementById('checkoutBtn');

const productModal = document.getElementById('productModal');
const closeProduct = document.getElementById('closeProduct');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalArtist = document.getElementById('modalArtist');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');
const modalAddBtn = document.getElementById('modalAddBtn');

const paymentModal = document.getElementById('paymentModal');
const paymentItemsEl = document.getElementById('paymentItems');
const paymentTotalEl = document.getElementById('paymentTotal');
const payBtn = document.getElementById('payBtn');
const closePayment = document.getElementById('closePayment');

let cart = [];

// Render products list
function renderProducts(){
  productsContainer.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.dataset.id = p.id;
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <div class="product-title">${p.title}</div>
      <div class="product-artist">${p.artist}</div>
      <div class="product-meta">
        <div class="price">${p.price.toFixed(2)} €</div>
        <div class="product-actions">
          <button class="button primary add-btn" data-id="${p.id}">Add</button>
        </div>
      </div>
    `;
    productsContainer.appendChild(card);
  });
}

// Add to cart
function addToCart(id){
  const p = products.find(x => x.id === id);
  if(!p) return;
  const existing = cart.find(c => c.id === id);
  if(existing) existing.qty++;
  else cart.push({ id: p.id, title: p.title, price: p.price, qty: 1 });
  updateCartUI();
}

function removeFromCart(id){
  const idx = cart.findIndex(c => c.id === id);
  if(idx > -1){
    cart.splice(idx, 1);
    updateCartUI();
  }
}

// Update cart UI (thumbnail, View, Remove, totals)
function updateCartUI(){
  cartItemsEl.innerHTML = '';
  let total = 0, count = 0;
  cart.forEach(item => {
    const prod = products.find(p => p.id === item.id) || {};
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.justifyContent = 'space-between';
    row.style.alignItems = 'center';
    row.style.padding = '8px 0';
    row.style.borderBottom = '1px solid #eee';

    row.innerHTML = `
      <div style="display:flex;gap:12px;align-items:center">
        <img src="${prod.image||''}" alt="${item.title}" style="width:64px;height:64px;object-fit:cover;border-radius:8px;background:#f2f2f2">
        <div style="min-width:0">
          <div style="font-weight:500">${item.title}</div>
          <div style="font-size:0.85rem;color:#666">${item.qty} x ${item.price.toFixed(2)} €</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="button ghost view-item-btn" data-id="${item.id}" style="padding:6px 8px">View</button>
        <button class="button remove-item-btn" data-id="${item.id}" style="background:#eee;border:none;padding:6px 8px;cursor:pointer">Remove</button>
        <div style="font-weight:600">${(item.price*item.qty).toFixed(2)} €</div>
      </div>
    `;

    cartItemsEl.appendChild(row);
    total += item.price * item.qty;
    count += item.qty;
  });

  cartTotalEl.textContent = total.toFixed(2);
  cartCountEl.textContent = count;
}

// Open product modal
function openProductModal(id){
  const p = products.find(x => x.id === id);
  if(!p) return;
  modalImg.src = p.image;
  modalTitle.textContent = p.title;
  modalArtist.textContent = p.artist;
  modalDesc.textContent = p.desc || '';
  modalPrice.textContent = p.price.toFixed(2) + ' €';
  modalAddBtn.dataset.id = p.id;
  productModal.setAttribute('aria-hidden','false');
}

// Payment modal
function openPaymentModal(){
  if(cart.length === 0){ alert('Cart is empty'); return; }
  paymentItemsEl.innerHTML = '';
  let total = 0;
  cart.forEach(i => {
    const p = products.find(x => x.id === i.id) || {};
    const r = document.createElement('div');
    r.style.display = 'flex'; r.style.justifyContent = 'space-between'; r.style.padding = '6px 0';
    r.innerHTML = `<div style="display:flex;gap:8px;align-items:center"><img src="${p.image||''}" style="width:48px;height:48px;object-fit:cover;border-radius:6px"> <div><div style=\"font-weight:500\">${i.title}</div><div style=\"font-size:0.85rem;color:#666\">${i.qty} x ${i.price.toFixed(2)} €</div></div></div><div style=\"font-weight:600\">${(i.price*i.qty).toFixed(2)} €</div>`;
    paymentItemsEl.appendChild(r);
    total += i.price * i.qty;
  });
  paymentTotalEl.textContent = total.toFixed(2) + ' €';
  paymentModal.setAttribute('aria-hidden','false');
}

// Event listeners
productsContainer.addEventListener('click', (e) => {
  const addBtn = e.target.closest('.add-btn');
  if(addBtn){
    e.stopPropagation();
    addToCart(Number(addBtn.dataset.id));
    return;
  }
  const card = e.target.closest('.product-card');
  if(card){
    const id = Number(card.dataset.id);
    openProductModal(id);
  }
});

cartItemsEl.addEventListener('click', (e) => {
  const view = e.target.closest('.view-item-btn');
  if(view){ openProductModal(Number(view.dataset.id)); return; }
  const rem = e.target.closest('.remove-item-btn');
  if(rem){ removeFromCart(Number(rem.dataset.id)); }
});

modalAddBtn.addEventListener('click', () => {
  const id = Number(modalAddBtn.dataset.id);
  addToCart(id);
  const prev = modalAddBtn.textContent;
  modalAddBtn.textContent = 'Added';
  setTimeout(()=> modalAddBtn.textContent = prev, 700);
});

cartBtn.addEventListener('click', ()=> cartModal.setAttribute('aria-hidden','false'));
closeCart.addEventListener('click', ()=> cartModal.setAttribute('aria-hidden','true'));
closeProduct.addEventListener('click', ()=> productModal.setAttribute('aria-hidden','true'));
clearCartBtn.addEventListener('click', ()=>{
  if(cart.length === 0){ alert('Cart is empty'); return; }
  if(confirm('Are you sure you want to clear the cart?')){ cart = []; updateCartUI(); }
});

checkoutBtn.addEventListener('click', ()=>{
  openPaymentModal();
});

payBtn.addEventListener('click', ()=>{
  // Simulate payment
  alert('Payment successful (demo)');
  cart = [];
  updateCartUI();
  paymentModal.setAttribute('aria-hidden','true');
  cartModal.setAttribute('aria-hidden','true');
});

closePayment.addEventListener('click', ()=> paymentModal.setAttribute('aria-hidden','true'));

// Close modals by clicking backdrop
window.addEventListener('click', (e) => {
  if(e.target === productModal) productModal.setAttribute('aria-hidden','true');
  if(e.target === cartModal) cartModal.setAttribute('aria-hidden','true');
  if(e.target === paymentModal) paymentModal.setAttribute('aria-hidden','true');
});

// Initial render
renderProducts();
updateCartUI();
