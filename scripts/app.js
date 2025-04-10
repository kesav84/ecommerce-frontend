console.log("E-Commerce Website Loaded");

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

const grid = document.getElementById("product-grid");

    function displayProducts(products) {
    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" loading="lazy">
        <h3>${product.title}</h3>
        <p class="price">$${product.price.toFixed(2)}</p>
        <p class="description">${product.description}</p>
        <button class="buy-btn">Add to Cart</button>
      `;
      grid.appendChild(card);
      observer.observe(card);
      const buyBtn = card.querySelector('.buy-btn');
      buyBtn.addEventListener('click', () => {
      alert(`Added "${product.title}" to cart!`); 
      });
    });
  }

  const cachedProducts = localStorage.getItem("products");

  if (cachedProducts) {
    displayProducts(JSON.parse(cachedProducts));
  } else {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("products", JSON.stringify(data));
        displayProducts(data);
      })
  .catch(err => {
    grid.innerHTML = "<p>Failed to load products.</p>";
    console.error("Error fetching products:", err);
  });
  }