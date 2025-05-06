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
      <a href="product.html?id=${product.id}" class="card-link">
        <img src="${product.image}" alt="${product.title}" loading="lazy">
        <h3>${product.title}</h3>
      <p class="price">$${product.price.toFixed(2)}</p>
      <p class="description">${product.description}</p>
      <button class="buy-btn">Add to Cart</button>
      </a>
    `;
      grid.appendChild(card);
      observer.observe(card);
      const buyBtn = card.querySelector('.buy-btn');
      buyBtn.addEventListener('click', (event) => {
        event.preventDefault();
        
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
      
        const cartItem = {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1
        };
      
        const existingIndex = cart.findIndex(item => item.id === cartItem.id);
      
        if (existingIndex > -1) {
          cart[existingIndex].quantity += 1;
        } else {
          cart.push(cartItem);
        }
      
        localStorage.setItem('cart', JSON.stringify(cart));
      
        const countEl = document.getElementById('cart-count');
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (countEl) countEl.textContent = total;
      
        alert(`Added "${product.title}" to cart!`);
        const successMsg = document.getElementById('add-success');

        successMsg.classList.add('show');
        setTimeout(() => {
        successMsg.classList.remove('show');
        }, 2000);

        const cartIcon = document.querySelector('.cart-icon i');
        if (cartIcon) {
        cartIcon.classList.add('cart-bounce');
        setTimeout(() => cartIcon.classList.remove('cart-bounce'), 400);
      }

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
        updateCartCount();
        displayProducts(data);
      })
  .catch(err => {
    grid.innerHTML = "<p>Failed to load products.</p>";
    console.error("Error fetching products:", err);
  });
  }