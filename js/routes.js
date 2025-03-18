const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

// --- Route Change ---
const route = (e) => {
  e = e || window.event;
  e.preventDefault();
  const target = e.currentTarget;
  window.history.pushState({}, "", target.href);
  handleLocation();
};

const routes = {
  404: "/pages/404.html",
  "/": "/pages/index.html",
  "/about": "/pages/about.html",
  "/contact": "/pages/contact.html",
  "/menu": "/pages/menu.html",
  "/cart": "/pages/cart.html",
  "/wishlist": "/pages/wishlist.html",
};

import { homeData, menuData } from "./data.js";

const handleLocation = async () => {
  const path = window.location.pathname;
  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());
  document.getElementById("main").innerHTML = html;

  const homeCards = document.getElementById("home-cards");
  const menuCards = document.getElementById("menu-cards");

  if (path === "/") {
    if (homeCards) {
      homeData.forEach((card) => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "w-full flex flex-col items-center lg:items-start";
        cardDiv.innerHTML = `
          <div class="rounded-lg bg-white">
            <img src="${card.img}" alt="${card.title}" class="rounded-lg">
            <div class="p-4">
              <h1 class="text-2xl font-[800] mb-2 font-balsamiq">${card.title}</h1>
              <p class="text-gray-600 my-2">${card.desc || "Delicious meal!"}</p>  
              <div class="flex justify-between items-center">
                <a href="/menu" class="bg-textColor hover:bg-textColorHover duration-200 rounded-full text-white py-2 px-8 mt-4">Order Now</a>
              </div>
            </div>
          </div>`;
        homeCards.appendChild(cardDiv);
      });
    }
  } else if (path === "/menu") {
    if (menuCards) {
      function displayMenu(category) {
        menuCards.innerHTML = ""; // Clear previous items
        const items = menuData[category];

        items.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "bg-white p-4 rounded-lg shadow-lg";
            itemDiv.innerHTML = `
          <div class="flex flex-col items-center justify-between">
    <img src="${item.img}" alt="${item.title}" class="w-full h-40 object-cover rounded-md">
    
    <div class="mt-4 w-full flex flex-col items-center">
    
        <h3 class="text-lg font-semibold mt-2">${item.title}</h3>
        <p class="text-gray-800 font-medium">${item.price} <sub>EGP</sub></p>

        <div class="flex items-center justify-center gap-8 w-full mt-4 ">
            <i class="fa-regular fa-heart text-2xl  cursor-pointer text-gray-700 hover:text-red-500 transition duration-200"></i>
            <button class="add-to-cart bg-textColor hover:bg-textColorHover transition duration-200 rounded-full text-white py-2 px-8">
                Add to Cart
            </button>
        </div>
    </div>
</div>

            `;
            menuCards.appendChild(itemDiv);
        });
    }

    function createFilterButtons() {
      const categories = Object.keys(menuData);
      let firstButton = null;
  
      categories.forEach((category, index) => {
          const button = document.createElement("button");
          button.className = "text-black rounded-full transition text-sm md:text-base lg:text-lg duration-300";
          button.style.padding = "4px 12px";
          button.textContent = category.toUpperCase();
  
          // Set the first button as active by default
          if (index === 0) {
              button.classList.add("bg-textColor", "text-white");
              firstButton = button;
          }
  
          button.addEventListener("click", () => {
              // Remove active class from all buttons
              document.querySelectorAll("#filterButtons button").forEach(btn => {
                  btn.classList.remove("bg-textColor", "text-white");
                  btn.classList.add("text-textcolor");
              });
  
              // Add active class to the clicked button
              button.classList.add("bg-textColor", "text-white");
  
              // Display the selected category
              displayMenu(category);
          });
  
          filterButtons.appendChild(button);
      });
  
      // Show the first category by default
      if (firstButton) {
          displayMenu(categories[0]);
      }
  }
  

  // Initialize buttons and display the default category
  createFilterButtons();
  
    }
  }else if(path === "/cart") {
    displayCart();
  } else if(path === "/contact") {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
      event.preventDefault();
      alert('Thank you for reaching out! We will get back to you soon.');
      this.reset();
  });
  }

menuCards.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const index = [...menuCards.getElementsByClassName("add-to-cart")].indexOf(e.target);
    const category = document.querySelector(".bg-textColor.text-white").textContent.toLowerCase(); // Get active category
    const item = menuData[category][index]; // Get item by index
    addToCart(item);
  }
});

  function addToCart(item) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    alert(`${item.title} added to cart!`);
  }
  function displayCart() {
    const cartContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");
    const cartCountElement = document.getElementById("cart-count");
    cartContainer.innerHTML = "";
  
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    let total = 0;
  
    cartContainer.style = 
      "display: flex;justify-content: center;align-items: center;min-height: 50vh; width: 100%;text-align: center;"
    
      if (cart.length === 0) {
        cartContainer.innerHTML = `<div class="flex justify-center items-center h-40 w-full text-lg font-semibold">Your cart is empty</div>`;
        cartTotalElement.textContent = "0 EGP";
        cartCountElement.textContent = "0";
        return;
      }
     
    cartCountElement.textContent = cart.length;
    cart.forEach((item, index) => {
      const priceNumber = parseFloat(item.price); 

      const itemTotal = priceNumber * item.quantity;
      total += itemTotal;
  
      const itemDiv = document.createElement("div");
      itemDiv.className = "bg-white p-4 rounded-lg shadow-lg mt-4";
      itemDiv.innerHTML = `
        <div class="flex flex-col items-center justify-between">
          <img src="${item.img}" alt="${item.title}" class="w-full h-40 object-cover rounded-md">
          
          <div class="mt-2 w-full flex flex-col items-center">
            <h3 class="text-lg font-semibold mt-2">${item.title}</h3>
            <p class="text-gray-800 font-medium">${priceNumber} x ${item.quantity} = ${itemTotal.toFixed(2)} <sub>EGP</sub></p>
  
            <div class="flex items-center justify-center gap-8 w-full mt-4">
              <i class="fa-regular fa-heart text-2xl cursor-pointer text-gray-700 hover:text-red-500 transition duration-200"></i>
              <button class="remove-item bg-red-600 hover:bg-red-700 text-white py-2 px-8 rounded-full transition duration-200" data-index="${index}">Remove</button>
            </div>
          </div>
        </div>
      `;
  
      cartContainer.appendChild(itemDiv);
    });
  
    // Update total price
    cartTotalElement.textContent = `${total.toFixed(2)} EGP`;
  
    // Remove item from cart
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        removeFromCart(index);
      });
    });
  }
  function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(cart));
    displayCart(); // Refresh cart page
  }
};

// Expose route function globally
window.onpopstate = handleLocation;
window.route = route;

handleLocation();
