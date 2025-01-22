const productContainer = document.querySelector(".productContainer");
const cartContainer = document.querySelector(".cart-container");
let cart = [];

// Function to render product cards
async function renderCards() {
    let products = await getProducts();
    productContainer.innerHTML = "";

    products.forEach(product => {
        let card = document.createElement("div");
        card.setAttribute("class", "col-11 col-sm-6 col-lg-4 col-xxl-3 board");
        card.innerHTML = `
            <div class="bg-dark rounded-3 shadow-lg border border-secondary border-3">
                <div class="p-3 d-flex flex-column align-items-stretch gap-2">
                    <img
                      src="${product.image}"
                      alt="${product.category}"
                      class="img-fluid rounded productImage"
                    />
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="productName text-light">${product.category}</p>
                        <p class="productPrice text-light bg-secondary rounded-5 px-3">
                        $${product.price}
                        </p>
                    </div>
                    <p class="text-light productDescription">
                       ${product.description}
                    </p>
                    <button 
                      class="btn rounded-5 btn-outline-light addToCartBtn" 
                      id="btn-${product.id}" 
                      onclick="addToCart(${product.id})"
                    >
                      ${cart.some(item => item.id === product.id) ? "Added to Cart" : "Add to Cart"}
                    </button>
                </div>
            </div>
        `;

        productContainer.appendChild(card);
    });
}

// Function to add a product to the cart
async function addToCart(productId) {
    let products = await getProducts();
    let selectedProduct = products.find(product => product.id === productId);

    if (selectedProduct && !cart.some(item => item.id === productId)) {
        // Add the product only if it's not already in the cart
        cart.push(selectedProduct);

        // Update the button text
        let button = document.getElementById(`btn-${productId}`);
        if (button) {
            button.innerText = "Added to Cart";
            button.classList.remove("btn-outline-light");
            button.classList.add("btn-light");
        }

        // Re-render the cart items
        renderCartItems();
    }
}

// Function to render cart items
function renderCartItems() {
    cartContainer.innerHTML = "";

    cart.forEach(item => {
        let card = document.createElement("div");
        card.setAttribute("class", "col-12 py-1 my-2");
        card.innerHTML = `
            <div class="bg-dark rounded-3 shadow-lg border border-secondary border-3 p-3">
                <div class="row">
                    <div class="col-4">
                        <img
                          src="${item.image}"
                          alt="${item.name}"
                          class="img-fluid rounded productImage"
                        />
                    </div>
                    <div class="col-6 d-flex flex-column justify-content-around">
                        <p class="productName text-light">${item.category}</p>
                        <p class="productPrice text-light bg-secondary rounded-5 text-center py-1 my-0">
                            Price: ${item.price}
                        </p>
                    </div>
                    <div class="col-2">
                        <button
                          class="btn btn-light rounded-5 removeItemBtn"
                          title="Remove Item"
                          onclick="removeFromCart(${item.id})"
                        >
                          <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        cartContainer.appendChild(card);
    });
}

// Function to remove a product from the cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);

    // Re-render the cart
    renderCartItems();

    // Update the button text for the removed item
    let button = document.getElementById(`btn-${productId}`);
    if (button) {
        button.innerText = "Add to Cart";
        button.classList.remove("btn-light");
        button.classList.add("btn-outline-light");
    }
}
// fetch products data from json
async function getProducts() {
    try {
        let response = await fetch('product.json');
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

renderCards();