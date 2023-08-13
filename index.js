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


