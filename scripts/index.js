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

// მიღებული მონაცემების დამუშავება (ეკრანზე გამოტანა)
function renderProducts(page) {
    productsContainer.innerHTML = "";
    const startIndex = (page - 1) * productPerPage;
    const endIndex = startIndex + productPerPage;
    const currentProducts = allProducts.slice(startIndex, endIndex);
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
        </div>`
        productsContainer.appendChild(card);

        // details გვერდზე გადასვლა პროდუქტის card-ზე კლიკის დროს
        card.addEventListener("click", () => {
            localStorage.setItem("selectedProductId", product.id); 
            window.location.href = "details.html";               
        });
    })
}


function renderPagination() {
    paginationContainer.innerHTML = '';
    const totalPage = Math.ceil(allProducts.length / productPerPage);

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