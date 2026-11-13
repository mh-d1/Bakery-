
const menuContainer = document.getElementById("menu-products");
const searchInput = document.getElementById("search-product");
const emptyMessage = document.getElementById("empty-message");

let selectedCategory = "all";

function renderMenu() {
    const keyword = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product => {
        const categoryMatch =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        const searchMatch =
            product.name.toLowerCase().includes(keyword);

        return categoryMatch && searchMatch;
    });

    menuContainer.innerHTML = filteredProducts.map(product => `
        <div class="col-6 col-lg-3">
            <div class="product-card">
                <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                </a>

                <div class="product-info">
                    <p>${product.category}</p>
                    <h3>${product.name}</h3>
                    <div class="product-price">${formatPrice(product.price)}</div>
                    <button class="btn-add mt-3"
                        onclick="addToCart(${product.id})">
                        + Add to Bag
                    </button>
                </div>
            </div>
        </div>
    `).join("");

    emptyMessage.hidden = filteredProducts.length > 0;
}

document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".filter-btn.active")
            ?.classList.remove("active");

        button.classList.add("active");
        selectedCategory = button.dataset.category;

        renderMenu();
    });
});

searchInput.addEventListener("input", renderMenu);

// Read category from URL
const params = new URLSearchParams(window.location.search);
const initialCategory = params.get("category");

if (initialCategory) {
    const category = initialCategory.toLowerCase();

    const matchingButton = [...document.querySelectorAll(".filter-btn")]
        .find(button => button.dataset.category.toLowerCase() === category);

    if (matchingButton) {
        document.querySelector(".filter-btn.active")
            ?.classList.remove("active");

        matchingButton.classList.add("active");
        selectedCategory = matchingButton.dataset.category;
    }
}

renderMenu();
