
const featuredContainer = document.getElementById("featured-products");

function formatPrice(price) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(price);
}

function renderFeaturedProducts() {
    if (!featuredContainer) return;

    featuredContainer.innerHTML = products.map(product => `
        <div class="col-6 col-lg-3">
            <div class="product-card">
                <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                </a>

                <div class="product-info">
                    <p>${product.category}</p>
                    <h3>${product.name}</h3>
                    <div class="product-price">
                        ${formatPrice(product.price)}
                    </div>

                    <button class="btn-add mt-3"
                        onclick="addToCart(${product.id})">
                        + Add to Bag
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("hanaCart")) || [];

    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            id: productId,
            quantity: 1
        });
    }

    localStorage.setItem("hanaCart", JSON.stringify(cart));

    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("hanaCart")) || [];

    const total = cart.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);

    const counter = document.getElementById("cart-count");

    if (counter) {
        counter.textContent = total;
    }
}

renderFeaturedProducts();
updateCartCount();
