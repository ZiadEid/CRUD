let namee = document.getElementById('name');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
let deleteeAll = document.getElementById('deleteAll');
let tbody = document.getElementById('tbody');
let tmp;
let search = document.getElementById('search');
let searchIcon = document.getElementById('searchIcon');
let searchName = document.getElementById('searchName');
let searchCategory = document.getElementById('searchCategory');

// Get Total

function calcTotal() {
  if (price.value != "" && price.value > 0) {
    total.classList.remove('bg-danger');
    total.classList.add('bg-info');
    total.innerHTML = (+price.value) + (+taxes.value) + (+ads.value) - (+discount.value);
  } else {
    total.classList.remove('bg-info');
    total.classList.add('bg-danger');
    total.innerHTML = "";
  }
}
price.addEventListener('keyup', function () {
  calcTotal();
})
taxes.addEventListener('keyup', function () {
  calcTotal();
})
ads.addEventListener('keyup', function () {
  calcTotal();
})
discount.addEventListener('keyup', function () {
  calcTotal();
})

// Create Products

let allProducts;
if (localStorage.localProducts != null) {
  allProducts = JSON.parse(localStorage.localProducts);
  displayProduct(allProducts);
  displayDeleteBtn();
}
else {
  allProducts = [];
  displayDeleteBtn();
}
create.addEventListener('click', function () {
  let newProduct = {
    name: namee.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value? count.value : 1,
    category: category.value
  };
  if (create.value === 'Create') {
    if (newProduct.name.length > 0 && newProduct.price.length > 0 && newProduct.category.length > 0) {
      allProducts.push(newProduct);
      // Save Local Storage
      localStorage.setItem('localProducts', JSON.stringify(allProducts));
      clearInputs();

    }
  }
  else {
    allProducts.splice(tmp, 1, newProduct);
    localStorage.setItem('localProducts', JSON.stringify(allProducts));
    create.value = 'Create'
    clearInputs();
  }
  displayProduct(allProducts);
  displayDeleteBtn();
})

// Clear Inputs

function clearInputs() {
  namee.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
  total.classList.remove('bg-info');
  total.classList.add('bg-danger');
}

// Display Products

function displayProduct(displayMe) {
  let box = "";
  for (let i = 0; i < displayMe.length; i++) {
    box += `
    <tr class="tableRow">
      <td>${i + 1}</td>
      <td class="nameItem">${displayMe[i].name}</td>
      <td>${displayMe[i].price}</td>
      <td>${displayMe[i].taxes}</td>
      <td>${displayMe[i].ads}</td>
      <td>${displayMe[i].discount}</td>
      <td>${displayMe[i].total}</td>
      <td>${displayMe[i].count}</td>
      <td class="categoryItem">${displayMe[i].category}</td>
      <td><button class="update btn btn-warning py-1 px-3 rounded-5">update</button></td>
      <td><button class="delete btn btn-danger py-1 px-3 rounded-5">delete</button></td>
    </tr>
  `
  }
  tbody.innerHTML = box;
  deleteButton();
  updateBtn();
}

// Delet All Products

function displayDeleteBtn() {
  if (allProducts.length > 0) {
    deleteeAll.style.display = 'block';
    deleteeAll.innerHTML = `Delet All (${allProducts.length})`
  }
  else {
    deleteeAll.style.display = 'none';
  }
}
deleteeAll.addEventListener('click', function () {
  localStorage.clear();
  location.reload();
})

// Delete Product

function deleteButton() {
  let deletee = document.querySelectorAll('.delete');
  for (let i = 0; i < deletee.length; i++) {
    deletee[i].addEventListener('click', function () {
      allProducts.splice(i, 1);
      localStorage.setItem('localProducts', JSON.stringify(allProducts));
      displayProduct(allProducts);
    })
  }
  displayDeleteBtn();
}

// Update Product

function updateBtn() {
  let updatee = document.querySelectorAll('.update');
  let deletee = document.querySelectorAll('.delete');
  let tableRow = document.querySelectorAll('.tableRow')
  for (let i = 0; i < updatee.length; i++) {
    updatee[i].addEventListener('click', function () {
      namee.value = allProducts[i].name;
      price.value = allProducts[i].price;
      taxes.value = allProducts[i].taxes;
      ads.value = allProducts[i].ads;
      discount.value = allProducts[i].discount;
      total.innerHTML = allProducts[i].total;
      count.value = allProducts[i].count;
      category.value = allProducts[i].category;
      total.classList.remove('bg-danger');
      total.classList.add('bg-info');
      deletee[i].setAttribute('disabled', 'true');
      tableRow[i].style.backgroundColor = '#111';
      create.value = 'Update';
      tmp = i;
      scroll({
        top: 0
      });
    });
  }
}

// Search Product

searchName.addEventListener('click', function () {
  searchIcon.innerHTML = 'Name';
  searchIcon.style.backgroundColor = '#00222e';
  search.value = '';
  displayProduct(allProducts);
});
searchCategory.addEventListener('click', function () {
  searchIcon.innerHTML = 'Category';
  searchIcon.style.backgroundColor = '#003a00';
  search.value = '';
  displayProduct(allProducts);
});

function searchProducts(value) {
  let searchedProducts = []
  for (let i = 0; i < allProducts.length; i++) {
    if (searchIcon.innerHTML.includes('Name') == true) {
      if (allProducts[i].name.toLowerCase().includes(value.toLowerCase()) == true) {
        searchedProducts.push(allProducts[i]);
        displayProduct(searchedProducts);
      }
      else {
        displayProduct(searchedProducts);
      }
    }
    else {
      if (allProducts[i].category.toLowerCase().includes(value.toLowerCase()) == true) {
        searchedProducts.push(allProducts[i]);
        displayProduct(searchedProducts);
      }
      else {
        displayProduct(searchedProducts);
      }
    }
  }
}
search.addEventListener('keyup', function () {
  searchProducts(this.value);
})