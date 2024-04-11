var swiper = new Swiper(".mySwiper", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
    loop: true,
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    thumbs: {
        swiper: swiper,
    },
});


//---------------------Giỏ Hàng--------------------//

document.addEventListener("DOMContentLoaded", () => {
    const cartItems = [];
    const cartTableBody = document.querySelector(".cart tbody");
    const priceTotalElement = document.querySelector(".price-total .sale-price");
    const cartItemCount = document.querySelector(".cart-icon span");
    const cartIcon = document.querySelector(".cart-icon");
    const cartSection = document.querySelector(".cart");
    const closeButton = cartSection.querySelector(".fa-times");
    const checkoutButton = cartSection.querySelector("button");

    // Hiển thị sản phẩm trong giỏ hàng
    function renderCartItems() {
        cartTableBody.innerHTML = "";
        cartItems.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td style="display: flex; align-items: center;">
                    <img style="width: 70px;" src="${item.image}" alt="${item.name}">
                    ${item.name}
                </td>
                <td><p class="sale-price">${formatCurrency(item.price)}đ</p></td>
                <td>
                    <input style="width: 50px; outline: none;" type="number" value="${item.quantity}" min="1">
                </td>
                <td style="cursor: pointer;">Xóa</td>
            `;
            cartTableBody.appendChild(row);

            // Xử lý sự kiện xóa sản phẩm
            row.querySelector("td:last-child").addEventListener("click", () => {
                removeCartItem(item);
            });

            // Xử lý sự kiện thay đổi số lượng sản phẩm
            row.querySelector("input").addEventListener("change", event => {
                updateCartItemQuantity(item, event.target.value);
            });
        });

        updateCartSummary();
    }

    // Thêm sản phẩm vào giỏ hàng
    function addToCart(product) {
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ ...product, quantity: 1 });
        }

        renderCartItems();
    }

    // Xóa sản phẩm khỏi giỏ hàng
    function removeCartItem(itemToRemove) {
        const index = cartItems.findIndex(item => item.id === itemToRemove.id);
        if (index !== -1) {
            cartItems.splice(index, 1);
            renderCartItems();
        }
    }

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    function updateCartItemQuantity(itemToUpdate, newQuantity) {
        const quantity = parseInt(newQuantity);
        if (quantity > 0) {
            const item = cartItems.find(item => item.id === itemToUpdate.id);
            if (item) {
                item.quantity = quantity;
                renderCartItems();
            }
        }
    }

    // Cập nhật tổng số lượng và tổng tiền
    function updateCartSummary() {
        let totalQuantity = 0;
        let totalPrice = 0;

        cartItems.forEach(item => {
            totalQuantity += item.quantity;
            totalPrice += item.price * item.quantity;
        });

        cartItemCount.textContent = totalQuantity;
        priceTotalElement.textContent = formatCurrency(totalPrice);
    }

    // Định dạng số tiền sang định dạng tiền tệ
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }

    // Xử lý sự kiện click vào biểu tượng giỏ hàng
    cartIcon.addEventListener("click", () => {
        if (cartSection.style.display === "none" || cartSection.style.display === "") {
            cartSection.style.display = "block";
        } else {
            cartSection.style.display = "none";
        }
    });

    // Xử lý sự kiện click vào nút đóng giỏ hàng
    closeButton.addEventListener("click", () => {
        cartSection.style.display = "none";
    });

    // Xử lý sự kiện click vào nút "Chốt đơn"
    checkoutButton.addEventListener("click", () => {
        // Thực hiện các hành động khi chốt đơn hàng
        alert("Đã chốt đơn hàng!");
        cartItems.length = 0; // Xóa danh sách sản phẩm trong giỏ hàng
        renderCartItems(); // Cập nhật lại giỏ hàng sau khi xóa
    });

    // Lấy danh sách sản phẩm và gắn sự kiện cho nút "Mua ngay"
    const buyNowButtons = document.querySelectorAll(".hot-product-main-item button");
    buyNowButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productContainer = button.closest(".hot-product-main-item");
            const productImage = productContainer.querySelector("img");
            const productName = productContainer.querySelector("h1").textContent.trim();
            const productPriceText = productContainer.querySelector(".sale-price").textContent;
            const productPrice = parseFloat(productPriceText.replace(/\D/g, ''));
            
            const product = {
                id: productImage.src,
                name: productName,
                price: productPrice,
                image: productImage.src
            };
            addToCart(product);
        });
    });
});






