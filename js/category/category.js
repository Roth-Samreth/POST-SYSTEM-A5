const categoryContainer = document.querySelector(".category-Container");
const productCategory = document.getElementById("product-category");
const productDescription = document.getElementById("product-description");
const addCategoryBtn = document.querySelector(".add");
const addFormPop = document.querySelector(".add-category");
const form = document.querySelector(".form");
const addFuntion1 = document.getElementById("update");
const cancelBtn = document.getElementById("cancel");
const formTitle = document.querySelector("form h2");
let allCategory;
function saveCategory(data) {
  localStorage.setItem("allCategory", JSON.stringify(allCategory));
}
function loadCategory() {
  let loadedData = localStorage.getItem("allCategory");
  if (loadedData === null) {
    allCategory = [];
  } else {
    allCategory = JSON.parse(loadedData);
  }
  localStorage.setItem("allCategory", JSON.stringify(allCategory));
}
loadCategory();

function showform() {
  form.classList.toggle("show-form");
}
function hide(element) {
  element.style.display = "none";
}
function show(element) {
  element.style.display = "block";
}
cancelBtn.addEventListener("click", showform);
function getCategory(e) {
  e.preventDefault();
  const categoryItem = {};
  categoryItem.name = productCategory.value;
  categoryItem.description = productDescription.value;
  allCategory.push(categoryItem);
  saveCategory(allCategory);
}
function createCategory(data, id) {
  const tableRow = document.createElement("tr");
  const tdId = document.createElement("td");
  const category = document.createElement("td");
  const cDescription = document.createElement("td");
  const cAction = document.createElement("td");
  const cAction1 = document.createElement("td");
  const cEditBtn = document.createElement("button");
  const cDeleteBtn = document.createElement("button");
  cEditBtn.textContent = "Edit";
  cEditBtn.classList.add("edit");
  cEditBtn.id = id;
  cDeleteBtn.textContent = "Remove";
  cDeleteBtn.classList.add("remove");
  cDeleteBtn.id = id;
  tdId.textContent = id + 1;
  category.textContent = data.name;
  cDescription.textContent = data.description;
  cAction.appendChild(cEditBtn);
  cAction1.appendChild(cDeleteBtn);
  tableRow.appendChild(tdId);
  tableRow.appendChild(category);
  tableRow.appendChild(cDescription);
  tableRow.appendChild(cAction);
  tableRow.appendChild(cAction1);
  categoryContainer.appendChild(tableRow);
}
addFormPop.addEventListener("click", () => {
  formTitle.textContent = "Add Category";
  hide(addFuntion1);
  show(addCategoryBtn);
  showform();
});
addCategoryBtn.addEventListener("click", (e) => {
  getCategory(e);
  showform();
  setInterval(1000, location.reload());
});
for (let i = 0; i < allCategory.length; i++) {
  createCategory(allCategory[i], i);
}
const removeBtn = document.querySelectorAll(".remove");
const editBtn = document.querySelectorAll("td .edit");
console.log(editBtn);
for (let btn of removeBtn) {
  btn.addEventListener("click", () => {
    btn.parentElement.parentElement.remove();
    allCategory.splice(btn.id, 1);
    localStorage.setItem("allCategory", JSON.stringify(allCategory));
  });
}
function update(index) {
  let loadedData = localStorage.getItem("allCategory");
  if (loadedData === null) {
    allCategory = [];
  } else {
    allCategory = JSON.parse(loadedData);
    console.log(allCategory);
  }
  productCategory.value = allCategory[index].name;
  productDescription.value = allCategory[index].description;
  addFuntion1.addEventListener("click", () => {
    allCategory[index].name = productCategory.value;
    allCategory[index].description = productDescription.value;
    localStorage.setItem("allCategory", JSON.stringify(allCategory));
  });
}
// addFuntion1.addEventListener("click", updateTable);
for (let btn of editBtn) {
  btn.addEventListener("click", () => {
    formTitle.textContent = "Edit Category";
    showform();
    show(addFuntion1);
    hide(addCategoryBtn);
    update(btn.id);
  });
}
