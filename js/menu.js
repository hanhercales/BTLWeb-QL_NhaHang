document.addEventListener('DOMContentLoaded', () => {
  const products = [
    { name: "Mì trộn rau củ", category: "Mì trộn", price: "25.000đ", image: "../images/IMG_8462.PNG" },
    { name: "Mì trộn thâp cẩm", category: "Mì trộn", price: "37.000đ", image: "../images/IMG_8114.PNG" },
    { name: "Mì trộn nem rán", category: "Mì trộn", price: "36.000đ", image: "../images/IMG_8460.PNG" },
    { name: "Mì trộn xúc xích", category: "Mì trộn", price: "30.000đ", image: "../images/IMG_8476.JPG" },
    { name: "Mì trộn bò khô", category: "Mì trộn", price: "29.000đ", image: "../images/IMG_8454.PNG" },
    { name: "Mì trộn hồ lô", category: "Mì trộn", price: "32.000đ", image: "../images/IMG_8458.PNG" },
    { name: "Mì trộn mực xoắn", category: "Mì trộn", price: "33.000đ", image: "../images/IMG_8459.PNG" },
    { name: "Mì trộn sủi cảo", category: "Mì trộn", price: "31.000đ", image: "../images/IMG_8463.PNG" },
    { name: "Mì trộn tôm surimi", category: "Mì trộn", price: "34.000đ", image: "../images/IMG_8464.PNG" },
    { name: "Khoai tây chiên", category: "Đồ ăn vặt", price: "40.000đ", image: "../images/IMG_8405.JPG" },
    { name: "Khoai lang kén", category: "Đồ ăn vặt", price: "35.000đ", image: "../images/IMG_8404.JPG" },
    { name: "Bánh gà (2 cái)", category: "Đồ ăn vặt", price: "20.000đ", image: "../images/IMG_8401.JPG" },
    { name: "Gà popcorn chiên", category: "Đồ ăn vặt", price: "52.000đ", image: "../images/IMG_8403.JPG" },
    { name: "Phô mai que(5 cái)", category: "Đồ ăn vặt", price: "40.000đ", image: "../images/IMG_8407.JPG" },
    { name: "Khoai môn lệ phố (3 viên)", category: "Đồ ăn vặt", price: "20.000đ", image: "../images/IMG_8408.JPG" },
    { name: "Kimbap chiên", category: "Đồ ăn vặt", price: "28.000đ", image: "../images/IMG_8406.JPG" },
    { name: "Hot dog", category: "Đồ ăn vặt", price: "24.000đ", image: "../images/IMG_8402.JPG" },
    { name: "Lạp xưởng rán", category: "Đồ ăn vặt", price: "15.000đ", image: "../images/IMG_8409.JPG" },
    { name: "Xúc xích rán", category: "Đồ ăn vặt", price: "17.000đ", image: "../images/IMG_8410.JPG" },
    { name: "Trà quất", category: "Nước uống", price: "15.000đ", image: "../images/IMG_8416.JPG" },
    { name: "Soda dâu", category: "Nước uống", price: "28.000đ", image: "../images/IMG_8419.JPG" },
    { name: "Soda ổi hồng", category: "Nước uống", price: "30.000đ", image: "../images/IMG_8425.JPG" },
    { name: "Combo 1 kimbap + 2 hotdog + 2 bánh gà thường", category: "Các combo", price: "90.000đ", image: "../images/IMG_8488.PNG" },
    { name: "Set đồ ăn vặt lớn", category: "Các combo", price: "123.000đ", image: "../images/IMG_8484.PNG" },
    { name: "Combo 1 kimbap + 5 nem chua rán + 1 trà quất", category: "Các combo", price: "70.000đ", image: "../images/IMG_8423.JPG" },
    { name: "Combo 1 kimbap + 5 nem vỏ giòn + 1 coca", category: "Các combo", price: "80.000đ", image: "../images/IMG_8424.JPG" }
  ];

  const productsPerPage = 6;  // Hiển thị 6 sản phẩm trên mỗi trang
  let currentPage = 1;
  let currentCategory = 'Toàn bộ';

  // Chức năng hiển thị sản phẩm
  function renderProducts(page = 1, category = 'Toàn bộ') {
    const startIndex = (page - 1) * productsPerPage;
    
    // Chuyển về dạng không dấu để so sánh chính xác hơn
    const normalizeCategory = category.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const filteredProducts = category === 'Toàn bộ' 
      ? products 
      : products.filter(product => product.category.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() === normalizeCategory);

    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = ''; // Xóa các sản phẩm hiện tại

    paginatedProducts.forEach(product => {
      const productCard = `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}">
          <p>Giá: ${product.price}</p>
          <p>${product.name}</p>
        </div>
      `;
      productGrid.innerHTML += productCard;
    });

    updatePagination(filteredProducts.length);
  }

  // Cập nhật số trang
  function updatePagination(totalProducts) {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const pagination = document.querySelector('.pagination span');
    pagination.textContent = `Page ${currentPage} of ${totalPages}`;
  }

  // Xử lý nút chuyển trang
  document.querySelector('.prev').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderProducts(currentPage, currentCategory);
    }
  });

  document.querySelector('.next').addEventListener('click', () => {
    const totalProducts = currentCategory === 'Toàn bộ' ? products.length : products.filter(p => p.category === currentCategory).length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderProducts(currentPage, currentCategory);
    }
  });

  // Lọc theo danh mục
  document.querySelectorAll('.category-list ul li a').forEach(categoryLink => {
    categoryLink.addEventListener('click', (e) => {
      e.preventDefault();
      currentCategory = e.target.innerText.trim(); // Xử lý tên danh mục
      currentPage = 1; // Quay lại trang 1 khi chọn danh mục mới
      renderProducts(currentPage, currentCategory);
    });
  });

  // Hiển thị ban đầu
  renderProducts();
});
