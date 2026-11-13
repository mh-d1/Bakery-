
const cartContainer = document.getElementById("cart-items");

function getCart() {
    return JSON.parse(localStorage.getItem("hanaCart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("hanaCart", JSON.stringify(cart));
}

function renderCart() {
    const cart = getCart();

    let subtotal = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your bag is empty.</h2>
                <p>Let's find something delicious for you.</p>
                <a href="menu.html" class="btn-primary-custom">
                    Explore Menu
                </a>
            </div>
        `;
    } else {
        cartContainer.innerHTML = cart.map(item => {
            const product = products.find(p => p.id === item.id);

            if (!product) return "";

            const itemTotal = product.price * item.quantity;
            subtotal += itemTotal;

            return `
                <div class="cart-item">
                    <img src="${product.image}" alt="${product.name}">

                    <div class="cart-item-info">
                        <span>${product.category}</span>
                        <h3>${product.name}</h3>
                        <strong>${formatPrice(product.price)}</strong>

                        <div class="cart-controls">
                            <button onclick="changeQuantity(${product.id}, -1)">−</button>
                            <span>${item.quantity}</span>
                            <button onclick="changeQuantity(${product.id}, 1)">+</button>
                            <button class="remove-btn"
                                onclick="removeProduct(${product.id})">
                                Remove
                            </button>
                        </div>
                    </div>

                    <strong>${formatPrice(itemTotal)}</strong>
                </div>
            `;
        }).join("");
    }

    document.getElementById("cart-subtotal").textContent = formatPrice(subtotal);
    document.getElementById("cart-total").textContent = formatPrice(subtotal);

    updateCartCount();
}

function changeQuantity(productId, amount) {
    let cart = getCart();

    const item = cart.find(p => p.id === productId);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(p => p.id !== productId);
    }

    saveCart(cart);
    renderCart();
}

function removeProduct(productId) {
    const cart = getCart().filter(item => item.id !== productId);

    saveCart(cart);
    renderCart();
}

document.getElementById("checkout-btn").addEventListener("click", () => {
    const cart = getCart();

    if (cart.length === 0) {
        alert("Your shopping bag is empty.");
        return;
    }

    alert("This is a demo checkout. No actual order or payment was made.");
});

renderCart();
