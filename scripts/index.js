// ჰედერი სქროლის დროს
window.addEventListener('scroll', function () {
    const menuDiv = document.querySelector('.menu');

    if (window.scrollY > 80) {
        menuDiv.classList.add('scrolled');
    } else {
        menuDiv.classList.remove('scrolled');
    }
});

const productsContainer = document.getElementById("product-container");
const paginationContainer = document.getElementById("pagination");
const productPerPage = 6;
let allProducts = [];
let currentPage = 1;

// სერვერიდან მონაცემების მიღება
async function fetchProducts() {
    try {
        const response = await fetch('nike.json');
        const data = await response.json();
        allProducts = data;
        renderProducts(currentPage);
        renderPagination();
    } catch (error) {
        console.log(error);
    }
}

// სერჩი
const searchInput = document.getElementById('search');
let filteredProducts = [];  // სერჩის შედეგები

searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();

    if (query === "") {
        filteredProducts = allProducts.slice();
    } else {
        filteredProducts = allProducts.filter(product =>
            product.Title.toLowerCase().includes(query)
        );
    }

    currentPage = 1;
    renderProducts(currentPage);
    renderPagination();
});


// პროდუქტის ეკრანზე გამოტანა
function renderProducts(page) {
    productsContainer.innerHTML = "";

    const dataToShow = (filteredProducts.length > 0 || searchInput.value.trim() !== "") ? filteredProducts : allProducts;

    const startIndex = (page - 1) * productPerPage;
    const endIndex = startIndex + productPerPage;
    const currentProducts = dataToShow.slice(startIndex, endIndex);

    currentProducts.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-4");
        card.innerHTML = `
        <div class="card">
            <img src="${product.imageUrl}" alt="${product.Title}">
            <div class="card-body">
                <p class="card-title">${product.Title}</p>
                <p class="card-category">${product.category}</p>
                <p class="card-shortdescription">${product.shortdescription}</p>
                <p class="card-price">$ ${product.price}</p>
            </div>
        </div>`;
        productsContainer.appendChild(card);

        card.addEventListener("click", () => {
            localStorage.setItem("selectedProductId", product.id);
            window.location.href = "details.html";
        });
    });
}

// პაგინაცია
function renderPagination() {
    paginationContainer.innerHTML = '';

    const dataToPaginate = (filteredProducts.length > 0 || searchInput.value.trim() !== "") ? filteredProducts : allProducts;
    const totalPage = Math.ceil(dataToPaginate.length / productPerPage);

    for (let i = 1; i <= totalPage; i++) {
        const listItem = document.createElement("li");
        listItem.classList.add("page-item");

        if (i === currentPage) {
            listItem.classList.add("active");
        }

        const link = document.createElement("a");
        link.classList.add("page-link");
        link.href = "#";
        link.textContent = i;
        link.addEventListener("click", (e) => {
            e.preventDefault();
            currentPage = i;
            renderProducts(currentPage);
            const activeItem = paginationContainer.querySelector(".page-item.active");
            if (activeItem) {
                activeItem.classList.remove("active");
            }
            listItem.classList.add("active");
        })
        listItem.appendChild(link);
        paginationContainer.appendChild(listItem);
    }
}

fetchProducts();