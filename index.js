document.addEventListener('DOMContentLoaded', () => fetchGames())


function fetchGames(){
    fetch("http://localhost:3000/games")
    .then((resp) => resp.json())
    .then((games) => {
        renderGames(games);
        Storage.saveGames(games);
    });
};

//Global variables
let cart = [];
const cartQuantity = document.querySelector("#cart-quantity");
const toggleCart = document.getElementById("toggleCart");
const cartTotalValue = document.getElementById('cart-total-value');
const cItems = document.querySelector('#cart-items-container');

//Storage functions
class Storage {
    static saveGames(games){
        localStorage.setItem("games", JSON.stringify(games));
    };
    static getGames(gameId) {
        const games = JSON.parse(localStorage.getItem("games"));
        return games.find((game) => game.id === gameId);
    };
    static saveCartItems(cart){
        localStorage.setItem("cart", JSON.stringify(cart));
    };
    static getCartItems(){
        return JSON.parse(localStorage.getItem("cart")) || [];
    };
};


//Render the Games
function renderGames(games){
    games.forEach((game) => {
        const container = document.querySelector("#game-container");
        const gameDiv = document.createElement("div");
        container.append(gameDiv);
        gameDiv.className = "game";
        gameDiv.id = game.id;   

        const gameName = document.createElement("h2");
        gameName.textContent = game.name;

        const img = document.createElement("img");
        img.src = game.image;
        img.alt = game.name;
        
        const price = document.createElement("p");
        price.id = "price";
        price.textContent = `Price: $${game.price}`;

        const release = document.createElement("p");
        release.textContent = `Release: ${game.release}`;

        const genre = document.createElement("p");
        genre.textContent = `Genre: ${game.genre}`;

        const mode = document.createElement("p");
        mode.textContent = `Mode: ${game.mode}`;

        const btn = document.createElement("button");
        btn.className = "buybtn";
        btn.textContent = "Add to Cart";
        btn.addEventListener("click", () => {
             addGameToCart(game.id)});

        gameDiv.append(gameName, img, price, release, genre, mode, btn);
    });
};

//Add Game To Cart
function addGameToCart(gameId){
    let cartItem = {...Storage.getGames(gameId), quantity: 1};
    cart = [...cart, cartItem];
    Storage.saveCartItems(cart);
    calculateCartTotalQuantity(cart);
    cartTotalSum(cart);
    renderCartItem(cartItem);
};

//Render the Cart Items
function renderCartItems(cart) {
    cItems.textContent = "";
    cart.forEach((cartItem) => {
        renderCartItem(cartItem);
    });
};

function renderCartItem(cartItem) {
        Storage.getCartItems(cart);
        const cItem = document.createElement("div");
        cItem.className = "cart-item";
        cItem.id = cartItem.id;
        cItems.append(cItem);
        
        const img = document.createElement("img");
        img.src = cartItem.image;
        
        const price = document.createElement("span");
        price.textContent = `Price: $${cartItem.price}`;
        
        const quantity = document.createElement("span");
        quantity.className = "cart-item-quantity";
        quantity.textContent = `Quantity: ${cartItem.quantity}`;
        
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
            removeCartItem(cartItem.id);
        });
        cItem.append(img, price, quantity, removeBtn);
};

//Remove Game From Cart
function removeCartItem(cartItemId) {
    const cartItem = cart.find((cartItem) => cartItem.id === cartItemId);
    cart.splice(cartItem, 1);
    Storage.saveCartItems(cart);
    calculateCartTotalQuantity(cart);
    cartTotalSum(cart);
    renderCartItems(cart);
};

//Cart Items Quantity
function calculateCartTotalQuantity(cart){
    cartQuantity.textContent =
        cart.reduce((accumulator, cartItem) => accumulator + cartItem.quantity, 0);
};

//Total Value Of Cart Items
function cartTotalSum(cart){  
    cartTotalValue.textContent =
    `Total: $${cart.reduce((accumulator, cartItem) => accumulator + cartItem.price * cartItem.quantity, 0)}`;
};
