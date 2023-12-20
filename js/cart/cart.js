let cartItems;
let customerRecord;
let now = new Date();
let date;
let month;
let year;
let hour;
let minute;
let timeZone;
let months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Setember",
  "October",
  "November",
  "December",
];
date = now.getDate();
month = months[now.getMonth()];
year = now.getFullYear();
hour = now.getHours();
minute = now.getMinutes();
const cartContainer = document.querySelector(".cart-container");
const productTotal = document.querySelector(".product-total");
const purchaseBtn = document.getElementById("checkout");
const retractOrder = document.getElementById("retract");
const sellDate = document.getElementById("date");
const sellMonth = document.getElementById("month");
const sellYear = document.getElementById("year");
const sellHour = document.getElementById("hour");
const sellMinute = document.getElementById("minute");
const sellTimeZone = document.getElementById("time-zone");
sellDate.textContent = date;
sellMonth.textContent = month;
sellYear.textContent = year;
sellHour.textContent = hour;
sellMinute.textContent = minute;
function loadCart() {
  let loadedData = localStorage.getItem("cartItems");
  if (loadedData === null) {
    cartItems = [];
  } else {
    cartItems = JSON.parse(loadedData);
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
function loadRecord() {
  let loadedRecord = localStorage.getItem("customerRecord");
  if (loadedRecord === null) {
    customerRecord = [];
  } else {
    customerRecord = JSON.parse(loadedRecord);
  }
  localStorage.setItem("customerRecord", JSON.stringify(customerRecord));
}
loadRecord();
function Display_CartItem(data, id) {
  const cartItem = document.createElement("div");
  const cartTitle = document.createElement("div");
  const titleText = document.createElement("h4");
  const titleSpan = document.createElement("span");
  const cartName = document.createElement("div");
  const cartNameTitle = document.createElement("h4");
  const cartNameSpan = document.createElement("span");
  const cartQuatity = document.createElement("div");
  const quantityTitle = document.createElement("p");
  const quantitySpan = document.createElement("span");
  const cartPrice = document.createElement("div");
  const priceTitle = document.createElement("p");
  const priceSpan = document.createElement("span");
  const buttonContainer = document.createElement("div");
  const addBtn = document.createElement("button");
  const removeBtn = document.createElement("button");
  // set Class
  cartItem.classList.add("cart-item");
  cartTitle.classList.add("order-title");
  cartName.classList.add("card-title");
  cartQuatity.classList.add("card-text");
  cartPrice.classList.add("price");
  buttonContainer.classList.add("btn-card");
  addBtn.classList.add("btn");
  addBtn.classList.add("add");
  removeBtn.classList.add("btn");
  removeBtn.classList.add("remove-cart");
  //Set Id
  addBtn.id = id;
  removeBtn.id = id;
  // add text
  titleText.textContent = "Order No: ";
  titleSpan.textContent = data.id;
  cartNameTitle.textContent = "Product Name: ";
  cartNameSpan.textContent = data.name;
  quantityTitle.textContent = "Total Added: ";
  quantitySpan.textContent = data.quantity;
  cartPrice.textContent = "Price: ";
  priceSpan.textContent = data.price;
  addBtn.textContent = "Update";
  removeBtn.textContent = "Remove";
  // Appending
  titleText.appendChild(titleSpan);
  cartNameTitle.appendChild(cartNameSpan);
  quantityTitle.appendChild(quantitySpan);
  priceTitle.appendChild(priceSpan);
  cartTitle.appendChild(titleText);
  cartName.appendChild(cartNameTitle);
  cartQuatity.appendChild(quantityTitle);
  cartPrice.appendChild(priceTitle);
  buttonContainer.appendChild(addBtn);
  buttonContainer.appendChild(removeBtn);
  cartItem.appendChild(cartTitle);
  cartItem.appendChild(cartName);
  cartItem.appendChild(cartQuatity);
  cartItem.appendChild(cartPrice);
  cartItem.appendChild(buttonContainer);
  cartContainer.appendChild(cartItem);
}
function createTrow(data) {
  const tRow = document.createElement("tr");
  const tdId = document.createElement("td");
  const tdName = document.createElement("td");
  const tdTotal = document.createElement("td");
  const tdCurrency = document.createElement("td");
  tdId.textContent = data.id;
  tdName.textContent = data.name;
  tdTotal.textContent = data.price;
  tdCurrency.textContent = "$";
  tRow.appendChild(tdId);
  tRow.appendChild(tdName);
  tRow.appendChild(tdTotal);
  tRow.appendChild(tdCurrency);
  productTotal.appendChild(tRow);
}
loadCart();
for (let i = 0; i < cartItems.length; i++) {
  Display_CartItem(cartItems[i], i);
}
const removeBtn = document.querySelectorAll(".remove-cart");
for (let btn of removeBtn) {
  btn.addEventListener("click", () => {
    btn.parentElement.parentElement.remove();
    cartItems.splice(btn.id, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    window.localStorage.reload();
  });
}
for (let cart of cartItems) {
  createTrow(cart);
}
retractOrder.addEventListener("click", () => {
  for (let i = 0; i < cartItems.length; i++) {
    cartItems.splice(i);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
  window.location.reload();
});
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
const tbody = document.querySelector(".product-total");
const totalText = document.getElementById("cashTotal");
const customId = document.getElementById("customer-id");

function getProductName() {
  let productname = [];
  for (let product of tbody.children) {
    productname.push(product.children[1].textContent);
  }
  return productname;
}
function sum() {
  let total = 0;
  for (let tr of tbody.children) {
    total += parseInt(tr.children[2].textContent);
  }
  return total;
}
totalText.textContent = sum();
const orders = document.querySelector(".cart-container");
function calculateTotalProduct() {
  let total = 0;
  for (let order of orders.children) {
    let itemquantity = order.children[2].children[0].children[0].textContent;
    total += parseInt(itemquantity);
  }
  return total;
}
// get all product in carts
function getOrderDetail() {
  let item = [];
  for (let cartItem of cartItems) {
    item.push(cartItem);
  }
  return item;
}
// Save data to storage.
function addRecord() {
  let record = {};
  record.iD = customId.textContent;
  record.product = getOrderDetail();
  record.income = totalText.textContent;
  record.date =
    sellDate.textContent +
    "/" +
    sellMonth.textContent +
    "/" +
    sellYear.textContent;
  record.order = tbody.children.length;
  record.quantity = calculateTotalProduct();
  customerRecord.push(record);
  localStorage.setItem("customerRecord", JSON.stringify(customerRecord));
}

function generatePDF() {
  // Choose the element that your content will be rendered to.
  const textContainer = document.querySelector(".invoice-detail");
  // Choose the element and save the PDF for your user.
  html2pdf().from(textContainer).save();
}
// click purchase button to purchase
purchaseBtn.addEventListener("click", () => {
  // Prevent purchasing when there is no cart added
  if (tbody.children.length !== 0) {
    let id = IdGenerator();
    customId.textContent = id;
    alert("Purchase Completed!!");
    generatePDF();
    // Remove all Items when clicked purchase
    for (let i = 0; i < cartItems.length; i++) {
      cartItems.splice(i);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    // Remove all elements
    tbody.children.remove();
  } else {
    // Alert when the cart is empty
    alert("Cart is emtpy!");
  }
  setInterval(100, location.reload());
});
