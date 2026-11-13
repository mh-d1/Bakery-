
const detailContainer = document.getElementById("product-detail");

const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

const product = products.find(item => item.id === productId);

if (product) {
    detailContainer.innerHTML = `
        <div class="col-md-6">
            <img class="detail-image"
                src="${product.image}"
                alt="${product.name}">
        </div>

        <div class="col-md-6 detail-content">
            <span class="eyebrow">${product.category}</span>

            <h1>${product.name}</h1>

            <h3 class="product-price">
                ${formatPrice(product.price)}
            </h3>

            <p>${product.description}</p>

            <label for="quantity" class="quantity-label">
                Quantity
            </label>

            <input type="number" id="quantity"
                value="1" min="1" max="20">

            <button id="detail-add" class="btn-primary-custom d-block mt-4">
                Add to Shopping Bag
            </button>

            <p class="small-note mt-3">
                Freshly prepared with carefully selected ingredients.
            </p>
        </div>
    `;

    document.getElementById("detail-add").addEventListener("click", () => {
        const quantity = Number(document.getElementById("quantity").value);

        if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
            alert("Please enter a quantity between 1 and 20.");
            return;
        }

        addToCart(product.id, quantity);
        alert("Product added to your shopping bag!");
    });

} else {
    detailContainer.innerHTML = `
        <div class="col-12 text-center">
            <h2>Product not found</h2>
            <a href="menu.html" class="btn-primary-custom mt-3">
                Back to Menu
            </a>
        </div>
    `;
}
