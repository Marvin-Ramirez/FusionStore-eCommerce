// Datos de productos
const products = [
    { id: 1, name: 'Auriculares Inalámbricos', price: 59.99, image: 'https://picsum.photos/id/1/300/300', category: 'electronics' },
    { id: 2, name: 'Smart Watch Pro', price: 129.99, image: 'https://picsum.photos/id/2/300/300', category: 'electronics' },
    { id: 3, name: 'Mochila de Cuero', price: 79.99, image: 'https://picsum.photos/id/3/300/300', category: 'accessories' },
    { id: 4, name: 'Zapatillas Urbanas', price: 89.99, image: 'https://picsum.photos/id/4/300/300', category: 'footwear' },
    { id: 5, name: 'Gafas de Sol Polarizadas', price: 39.99, image: 'https://picsum.photos/id/5/300/300', category: 'accessories' },
    { id: 6, name: 'Mouse Gamer RGB', price: 29.99, image: 'https://picsum.photos/id/6/300/300', category: 'electronics' },
    { id: 7, name: 'Taza de Cerámica', price: 14.99, image: 'https://picsum.photos/id/7/300/300', category: 'home' },
    { id: 8, name: 'Libreta de Notas', price: 9.99, image: 'https://picsum.photos/id/8/300/300', category: 'office' },
];

// Variables globales
let cartCount = 0;
const cartCountElement = document.getElementById('cartCount');
const productsGrid = document.getElementById('productsGrid');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const nav = document.querySelector('.nav');

// Renderizar productos en el grid
function renderProducts() {
    if (!productsGrid) return;

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Añadir al carrito</button>
            </div>
        </div>
    `).join('');

    // Agregar event listeners a los botones "Añadir al carrito"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Función para añadir al carrito
function addToCart(event) {
    event.preventDefault();
    const button = event.target;
    const productId = button.getAttribute('data-id');
    const product = products.find(p => p.id == productId);

    // Incrementar contador del carrito
    cartCount++;
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }

    // Feedback visual en el botón
    button.textContent = '¡Añadido!';
    button.style.backgroundColor = '#10b981';
    setTimeout(() => {
        button.textContent = 'Añadir al carrito';
        button.style.backgroundColor = ''; // vuelve al color original (definido en CSS)
    }, 1000);

    console.log(`Producto añadido: ${product.name} (ID: ${productId})`);
}

// Menú hamburguesa (móvil)
function toggleMobileMenu() {
    hamburgerBtn?.addEventListener('click', () => {
        nav?.classList.toggle('show');
        // Animación del ícono hamburguesa
        const bars = hamburgerBtn.querySelectorAll('.bar');
        bars.forEach(bar => bar.classList.toggle('active'));
    });

    // Cerrar menú al hacer click en un enlace 
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav?.classList.remove('show');
        });
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    toggleMobileMenu();

    // Prevenir envío del formulario de newsletter (demo)
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias por suscribirte!');
            newsletterForm.reset();
        });
    }
});