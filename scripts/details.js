// პროდუქტის დეტალების ჩვენება
document.addEventListener("DOMContentLoaded", () => {
    const productId = localStorage.getItem("selectedProductId");
    if (!productId) return;

    fetch("nike.json")
        .then(res => res.json())
        .then(data => {
            const product = data.find(item => item.id == productId);
            if (!product) return;

            const detailContainer = document.getElementById("product-details");
            detailContainer.innerHTML = `
                <div class="details-card">
                    <img src="${product.imageUrl}" alt="${product.Title}">
                    <div class="details-card-body">
                        <p class="details-card-title">${product.Title}</p>
                        <p class="details-card-category">${product.category}</p>
                        <p class="details-card-shortdescription">${product.shortdescription}</p>
                        <p class="details-card-price">$${product.price}</p>
                    </div>
                </div>
            `;
        })
        .catch(err => console.error("დეტალების შეცდომა:", err));
});