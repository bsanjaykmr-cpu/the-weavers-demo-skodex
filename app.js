const products = [
  { image: 'IMG-20261115-WA0044.jpg', collection: 'mysore zari', code: 'NSD4819 C', title: 'Mysore Silk Zari', description: 'Vertical gold zari lines & buta with a classy gap border.', price: '₹1,400 + taxes', tag: 'New arrival' },
  { image: 'IMG-20261115-WA0040.jpg', collection: 'mysore zari', code: 'NSD4819 F', title: 'Mysore Silk Zari', description: 'Vertical gold zari lines & buta with a classy gap border.', price: '₹1,400 + taxes', tag: 'New arrival' },
  { image: 'IMG-20261115-WA0048.jpg', collection: 'mysore zari', code: 'NSD4819 I', title: 'Mysore Silk Zari', description: 'Vertical gold zari lines & buta with a classy gap border.', price: '₹1,400 + taxes', tag: 'New arrival' },
  { image: 'IMG-20261115-WA0045.jpg', collection: 'mysore zari', code: 'NSD4819', title: 'Mysore Silk Zari', description: 'Vertical gold zari lines & buta with a classy gap border.', price: '₹1,400 + taxes', tag: 'New arrival' },
  { image: 'IMG-20261115-WA0047.jpg', collection: 'mysore zari', code: 'NSD4819', title: 'Mysore Silk Zari', description: 'Vertical gold zari lines & buta with a classy gap border.', price: '₹1,400 + taxes', tag: 'New arrival' },
  { image: 'IMG-20261115-WA0043.jpg', collection: 'mysore zari', code: 'NSD4819', title: 'Mysore Silk Zari', description: 'Vertical gold zari lines & buta with a classy gap border.', price: '₹1,400 + taxes', tag: 'New arrival' },
  { image: 'IMG-20261115-WA0052.jpg', collection: 'myna zari', code: 'NSD3971 A', title: 'Myna Silk', description: 'Gold zari weaving buta with a contrast printed border.', price: '₹560 + taxes', tag: 'Value edit' },
  { image: 'IMG-20261115-WA0051.jpg', collection: 'myna zari', code: 'NSD3971', title: 'Myna Silk', description: 'Gold zari weaving buta with a contrast printed border.', price: '₹560 + taxes', tag: 'Value edit' },
  { image: 'IMG-20261115-WA0050.jpg', collection: 'myna zari', code: 'NSD3971', title: 'Myna Silk', description: 'Gold zari weaving buta with a contrast printed border.', price: '₹560 + taxes', tag: 'Value edit' },
  { image: 'IMG-20261115-WA0054.jpg', collection: 'myna zari', code: 'NSD3971', title: 'Myna Silk', description: 'Gold zari weaving buta with a contrast printed border.', price: '₹560 + taxes', tag: 'Value edit' },
  { image: 'IMG-20261113-WA0105.jpg', collection: 'mysore zari', code: 'NSD4820', title: 'Mysore Silk Weave', description: 'Gold zari checks & buta along a refined gap border.', price: '₹1,400 + taxes', tag: 'Catalogue edit' },
  { image: 'IMG-20261113-WA0106.jpg', collection: 'mysore zari', code: 'NSD4820', title: 'Mysore Silk Weave', description: 'Gold zari checks & buta along a refined gap border.', price: '₹1,400 + taxes', tag: 'Catalogue edit' },
];

const grid = document.querySelector('#product-grid');
const productDialog = document.querySelector('#product-dialog');
const storyDialog = document.querySelector('#story-dialog');
const detail = document.querySelector('#dialog-content');

function matches(product, filter) { return filter === 'all' || product.collection.includes(filter); }
function render(filter = 'all') {
  grid.innerHTML = products.filter((product) => matches(product, filter)).map((product, index) => `
    <article class="product-card">
      <div class="product-image"><img src="assets/${product.image}" alt="${product.title} ${product.code}" loading="${index < 4 ? 'eager' : 'lazy'}"><span class="product-tag">${product.tag}</span></div>
      <button type="button" data-product="${products.indexOf(product)}" aria-label="View details for ${product.title}">
        <span class="product-code">${product.code}</span><h3>${product.title}</h3><p>${product.description}</p>
        <span class="price-row"><span class="price">${product.price}</span><span class="view">View details →</span></span>
      </button>
    </article>`).join('');
}
function openProduct(product) {
  detail.innerHTML = `<div class="dialog-product"><img src="assets/${product.image}" alt="${product.title} ${product.code}"><div class="dialog-details"><p class="eyebrow">LATEST CATALOGUE</p><span class="product-code">${product.code}</span><h2 id="dialog-title">${product.title}</h2><p class="detail-price">${product.price}</p><p>${product.description}</p><div class="detail-list"><strong>Catalogue details</strong><br>• Pallu as in the product photograph<br>• Blouse as in the product photograph<br>• Price supplied in the latest catalogue</div><a class="button" href="#new" data-close-dialog>Continue browsing <span>↓</span></a></div></div>`;
  productDialog.showModal();
}
document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach((item) => item.classList.remove('active'));
  button.classList.add('active'); render(button.dataset.filter);
}));
document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-product]');
  if (button) openProduct(products[Number(button.dataset.product)]);
  const filterLink = event.target.closest('[data-filter-link]');
  if (filterLink) { const filter = filterLink.dataset.filterLink; document.querySelector(`.filter[data-filter="${filter}"]`)?.click(); }
  if (event.target.closest('[data-open-story]')) storyDialog.showModal();
  if (event.target.closest('.dialog-close,[data-close-dialog]')) { productDialog.close(); storyDialog.close(); }
});
document.querySelectorAll('dialog').forEach((dialog) => dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); }));
render();
