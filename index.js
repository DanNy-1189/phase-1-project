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

