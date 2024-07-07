let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let category = document.getElementById("category");
let create = document.getElementById("create");
let count = document.getElementById("count");
let mood = "create";
let messi;
let search = document.getElementById("search");
function gettotal() {
  if (price.value != "") {
    total.innerHTML =
      +price.value + +taxes.value + +ads.value - +discount.value;
  }
}
// create
let y = [];
if (localStorage.mahmoud != null) {
  y = JSON.parse(localStorage.mahmoud);
} else {
  y = [];
}
create.onclick = function () {
  let product = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    category: category.value,
    count: count.value,
  };
  if (
    title.value !== "" &&
    price.value !== "" &&
    taxes.value !== "" &&
    ads.value !== "" &&
    discount.value !== "" &&
    total.innerHTML !== "" &&
    category.value !== "" &&
    count.value <= 100
  ) {
    if (mood == "create") {
      if (product.count > 1) {
        for (let i = 0; i < product.count; i++) {
          y.push(product);
        }
      } else {
        y.push(product);
      }
      localStorage.setItem("mahmoud", JSON.stringify(y));
      clear();
      read();
    } else {
      y[messi] = product;
      count.style.display = "block";
      mood = "create";
      create.innerHTML = "Create";
      read();
      clear();
    }
  }
};
//clear
function clear() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  category.value = "";
  count.value = "";
}
//read
function read() {
  let tbody = document.getElementById("tbody");
  let table = "";
  for (let i = 0; i < y.length; i++) {
    table += `
  <tr>
  <td>${1 + i}</td>
  <td>${y[i].title}</td>
  <td>${y[i].price}</td>
  <td>${y[i].taxes}</td>
  <td>${y[i].ads}</td>
  <td>${y[i].discount}</td>
  <td>${y[i].total}</td>
  <td>${y[i].category}</td>

  <td><button id="ubdate" onclick="update(  ${i}  )">update</button></td>
  <td ><button id="deleteee" onclick="abdelsalam(   ${i}   )">delete</button></td>
  </tr>
  `;
    tbody.innerHTML = table;
    let btndeleteALL = document.getElementById("deleteAll");
    if (y.length > 0) {
      btndeleteALL.innerHTML = `
    <button id="btn" onclick="deleteall()">delete All (${y.length}) </button>
    `;
    }
  }
}
read();
//delete
function abdelsalam(i) {
  y.splice(i, 1);
  localStorage.mahmoud = JSON.stringify(y);
  read();
  location.reload();
}
function deleteall() {
  localStorage.clear();
  y.splice(0);
  read();
  location.reload();
}
// ubdate
function update(p) {
  title.value = y[p].title;
  price.value = y[p].price;
  taxes.value = y[p].taxes;
  ads.value = y[p].ads;
  discount.value = y[p].discount;
  total.innerHTML = y[p].innerHTML;
  category.value = y[p].category;
  count.value = y[p].count;
  create.innerHTML = "update";
  mood = "updatee";
  messi = p;
  gettotal();
  count.style.display = "none";
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
// search
let boom = "title";
function searchproduct(id) {
  if (id == "btn1") {
    search.placeholder = "search by title";
  } else {
    search.placeholder = "search by category";
    boom = "category";
  }
  search.focus();
  search.value = "";
  read();
}
function searchdata(value) {
  let table = "";
  let tbody = document.getElementById("tbody");
  if (boom == "title") {
    for (let i = 0; i < y.length; i++) {
      if (y[i].title.includes(value.toLowerCase())) {
        table += `
  <tr>
  <td>${1 + i}</td>
  <td>${y[i].title}</td>
  <td>${y[i].price}</td>
  <td>${y[i].taxes}</td>
  <td>${y[i].ads}</td>
  <td>${y[i].discount}</td>
  <td>${y[i].total}</td>
  <td>${y[i].category}</td>
  <td><button id="ubdate" onclick="update(  ${i}  )">update</button></td>
  <td ><button id="deleteee" onclick="abdelsalam(   ${i}   )">delete</button></td>
  </tr>
  `;
        tbody.innerHTML = table;
      }
    }
  } else if ((boom = "category")) {
    for (let i = 0; i < y.length; i++) {
      if (y[i].category.includes(value.toLowerCase())) {
        table += `
  <tr>
  <td>${1 + i}</td>
  <td>${y[i].title}</td>
  <td>${y[i].price}</td>
  <td>${y[i].taxes}</td>
  <td>${y[i].ads}</td>
  <td>${y[i].discount}</td>
  <td>${y[i].total}</td>
  <td>${y[i].category}</td>
  <td><button id="ubdate" onclick="update(  ${i}  )">update</button></td>
  <td ><button id="deleteee" onclick="abdelsalam(   ${i}   )">delete</button></td>
  </tr>
  `;
        tbody.innerHTML = table;
      }
    }
  }
}
