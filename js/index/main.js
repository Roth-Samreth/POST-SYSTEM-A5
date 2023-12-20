// all variable
let products;
let cartItems;
let allCategory;
const pName = document.getElementById("product-name");
const pCategory = document.getElementById("product-category");
const pPrice = document.getElementById("product-price");
const pQuantity = document.getElementById("product-quantity");
const tableBody = document.getElementById("p-management-table");
const form = document.querySelector(".form");
const addBtn = document.getElementById("add");
const cutomerId = document.getElementById("pCustomer-id");
const cardContainer = document.querySelector(".card-container");
const searchTab = document.getElementById("searchItems");
let search = document.querySelector(".search");
let close = document.querySelector(".close");
let searchWrapper = document.querySelector(".search-wrapper");

// 2. Attach Events
getData();
getDataforCart();
loadCategory();
// Save Product to Local
function loadtoCart(cartItems) {
  localStorage.setItem("productItems", JSON.stringify(cartItems));
}
function getData() {
  let loadedData = localStorage.getItem("productItems");
  if (loadedData === null) {
    products = [];
  } else {
    products = JSON.parse(loadedData);
  }
  localStorage.setItem("productItems", JSON.stringify(products));
}
function getDataforCart() {
  let loadedData = localStorage.getItem("cartItems");
  if (loadedData === null) {
    cartItems = [];
  } else {
    cartItems = JSON.parse(loadedData);
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
function loadCategory() {
  let loadedData = localStorage.getItem("allCategory");
  if (loadedData === null) {
    allCategory = [];
  } else {
    allCategory = JSON.parse(loadedData);
  }
  localStorage.setItem("productItems", JSON.stringify(products));
}
// display product
let i = 0;
function Display_Card(data) {
  let card = document.createElement("div");
  card.className = "card";
  let card_title = document.createElement("div");
  card_title.className = "card-title";
  let h4_card_title = document.createElement("h4");
  h4_card_title.textContent = "Name: ";
  let span_h4 = document.createElement("span");
  span_h4.textContent = data.name;
  let p_card_title = document.createElement("p");
  p_card_title.textContent = "Available in stock:";
  let span_p_card_title = document.createElement("span");
  span_p_card_title.textContent = data.quantity;
  let categoryText = document.createElement("div");
  categoryText.classList.add("category");
  let categoryP = document.createElement("p");
  categoryText.appendChild(categoryP);
  categoryP.textContent = "Category: ";
  let categorySpan = document.createElement("span");
  categorySpan.textContent = data.category;
  categoryP.appendChild(categorySpan);
  let btn_card = document.createElement("div");
  btn_card.className = "btn-card";
  let button = document.createElement("button");
  button.className = "btn add-to-cart";
  button.setAttribute("id", i);
  button.textContent = "Add to card";
  let pPrice = document.createElement("p");
  pPrice.textContent = "$";
  let span_btn_card = document.createElement("span");
  span_btn_card.textContent = data.price;
  card.appendChild(card_title);
  card_title.appendChild(h4_card_title);
  h4_card_title.appendChild(span_h4);
  card_title.appendChild(p_card_title);
  p_card_title.appendChild(span_p_card_title);
  card.appendChild(categoryText);
  card.appendChild(btn_card);
  btn_card.appendChild(button);
  btn_card.appendChild(pPrice);
  pPrice.appendChild(span_btn_card);
  cardContainer.appendChild(card);
  i++;
}
for (let item of products) {
  Display_Card(item);
}
const addToCartBtn = document.querySelectorAll(".add-to-cart");

function show() {
  form.classList.toggle("show-form");
}
const idNumber = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
function IdGenerator() {
  let id = "#";
  for (let i = 0; i < 6; i++) {
    let index = Math.floor(Math.random() * idNumber.length);
    id += idNumber[index];
  }
  return id;
}
function update(index) {
  let loadedData = localStorage.getItem("productItems");
  if (loadedData === null) {
    cartItems = [];
  } else {
    productItem = JSON.parse(loadedData);
  }
  let cart = {};
  cutomerId.value = IdGenerator();
  pName.value = products[index].name;
  pCategory.value = products[index].category;
  pPrice.value = products[index].price;
  pQuantity.value = products[index].quantity;
  addBtn.addEventListener("click", () => {
    cart.id = cutomerId.value;
    cart.name = pName.value;
    cart.category = pCategory.value;
    cart.price = products[index].price * pQuantity.value;
    cart.quantity = pQuantity.value;
    if (pQuantity.value >= 1 && pQuantity.value <= products[index].quantity) {
      cartItems.push(cart);
      if (products[index].quantity > 0) {
        products[index].quantity = products[index].quantity - pQuantity.value;
      } else {
        products.splice(index, 1);
        alert("Out of Product");
      }
      localStorage.setItem("productItems", JSON.stringify(products));
    } else {
      products.splice(index, 1);
      localStorage.setItem("productItems", JSON.stringify(products));
      alert("Cannot be added Product is out of stock");
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    window.location.reload();
  });
}
for (let btn of addToCartBtn) {
  btn.addEventListener("click", () => {
    show();
    update(btn.id);
  });
}
//Display category
const most_sell = document.querySelector(".most-sell");
function creatBtn(data) {
  let btn_Category = document.createElement("button");
  btn_Category.textContent = data;
  most_sell.appendChild(btn_Category);
}
for (let category of allCategory) {
  creatBtn(category.name);
}
const categoryBtn = document.querySelectorAll(".most-sell button");
const cardItems = cardContainer.children;
function showAll() {
  for (let card of cardItems) {
    card.style.display = "block";
    card.style.display = "flex";
  }
}
function sorter(category) {
  for (let card of cardItems) {
    let titleText = card.children[1].children[0].children[0].textContent;
    if (category === titleText) {
      card.style.display = "block";
      card.style.display = "flex";
    } else if (category === "All Category") {
      showAll();
    } else {
      card.style.display = "none";
    }
  }
}
search.addEventListener("click", () => {
  searchWrapper.classList.add("active");
});

close.addEventListener("click", () => {
  searchWrapper.classList.remove("active");
  location.reload();
});
searchTab.addEventListener("keyup", () => {
  if (searchTab.value !== "") {
    for (let card of cardItems) {
      let titleText = card.children[0].children[0].children[0].textContent;
      if (titleText.includes(searchTab.value)) {
        card.style.display = "block";
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    }
  }
});

for (let btn of categoryBtn) {
  btn.addEventListener("click", () => {
    btn.classList.toggle("category-active");
    sorter(btn.textContent);
  });
}
