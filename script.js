let cart = [];

function getSelectedPrice(sizeId) {
    return parseFloat(document.getElementById(sizeId).value);
}

function addToCart(price, name) {
    const product = { name, price, id: Date.now() }; // Unique ID for each product
    cart.push(product);
    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(product => product.id !== productId);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";

    let total = 0;
    cart.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";
        itemElement.innerHTML = `
            ${item.name} - &#8369 ${item.price.toFixed(2)}
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(itemElement);
        total += item.price;
    });

    document.getElementById("cartTotal").textContent = total.toFixed(2);
}

function calculateChange() {
    const payment = parseFloat(document.getElementById("payment").value);
    const total = parseFloat(document.getElementById("cartTotal").textContent);
    const change = payment - total;
    document.getElementById("change").textContent = change >= 0 ? change.toFixed(2) : "Insufficient Payment";
}

function checkout() {
    if (cart.length === 0) {
        alert("Cart is empty!");
    } else if (parseFloat(document.getElementById("change").textContent) >= 0) {
        alert("Purchase complete! Thank you.");
        cart = [];
        updateCart();
        document.getElementById("payment").value = "";
        document.getElementById("change").textContent = "0.00";
    } else {
        alert("Insufficient payment. Please enter the correct amount.");
    }
}
