
function getCart() {
  return JSON.parse(localStorage.getItem("hanaCart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("hanaCart", JSON.stringify(cart));
  updateCartCount();
}

function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  const subtotalElement = document.getElementById("cart-subtotal");
  const totalElement = document.getElementById("cart-total");
  const emptyMessage = document.getElementById("empty-cart");
  const checkoutButton = document.getElementById("checkout-btn");

  if (!cartContainer) return;

  const cart = getCart();

  if (cart.length === 0) {
    cartContainer.innerHTML = "";
    emptyMessage.style.display = "block";
    subtotalElement.textContent = formatPrice(0);
    totalElement.textContent = formatPrice(0);
    checkoutButton.disabled = true;
    return;
  }

  emptyMessage.style.display = "none";
  checkoutButton.disabled = false;

  let subtotal = 0;

  cartContainer.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);

    if (!product) return "";

    const quantity = Math.max(1, Number(item.quantity) || 1);
    const itemTotal = product.price * quantity;

    subtotal += itemTotal;

    return `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.name}">

        <div class="cart-item-info">
          <h5>${product.name}</h5>
          <p>${formatPrice(product.price)}</p>

          <div class="cart-quantity">
            <button onclick="changeQuantity(${product.id}, -1)">−</button>
            <span>${quantity}</span>
            <button onclick="changeQuantity(${product.id}, 1)">+</button>
          </div>
        </div>

        <div class="cart-item-actions">
          <strong>${formatPrice(itemTotal)}</strong>
          <button
            class="remove-button"
            onclick="removeFromCart(${product.id})">
            Remove
          </button>
        </div>
      </div>
    `;
  }).join("");

  subtotalElement.textContent = formatPrice(subtotal);
  totalElement.textContent = formatPrice(subtotal);
}

function changeQuantity(productId, change) {
  const cart = getCart();
  const item = cart.find(item => item.id === productId);

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart(cart);
  renderCart();
}

function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);

  saveCart(cart);
  renderCart();
}

function checkout() {
  const cart = getCart();

  if (cart.length === 0) return;

  alert("Thank you for shopping at Hana Bakery!");
}

document.addEventListener("DOMContentLoaded", renderCart);
