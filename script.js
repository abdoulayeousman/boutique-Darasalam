// Données des produits (Exemple - À modifier par l'utilisateur)
const products = [
    {
        id: 1,
        name: "Montre de Luxe Gold",
        price: 25000,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
    },
    {
        id: 2,
        name: "Parfum Signature",
        price: 15000,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
    },
    {
        id: 3,
        name: "Lunettes de Soleil VIP",
        price: 10000,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Sac à Main Élégance",
        price: 35000,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=635&q=80"
    },
    {
        id: 5,
        name: "Montre Classique",
        price: 10000,
        image: "image/mntre2.jpeg"
    },
    {
        id: 6,
        name: "Sac Chic",
        price: 20000,
        image: "image/sac1.jpeg"
    },
    {
        id: 7,
        name: "Ce Top",
        price: 10000,
        image: "image/mtre1.jpeg"
    },
    {
        id: 8,
        name: "Ce Chic",
        price: 10000,
        image: "image/mtre.jpeg"
    },
    {
        id: 9,
        name: "Lafaya Endico Bawal",
        price: 12500,
        image: "image/lafaya1.jpeg"
    },
    {
        id: 10,
        name: "Lafaya Endico Bawal",
        price: 12500,
        image: "image/lafaya.jpeg"
    },
    {
        id: 11,
        name: "Lafaya Endico Bawal",
        price: 12500,
        image: "image/lafaya2.jpeg"
    },
    {
        id: 12,
        name: "Lafaya Endico Bawal",
        price: 12500,
        image: "image/lafaya3.jpeg"
    },

    


];

// Configuration WhatsApp (METTRE VOTRE NUMÉRO ICI)
const whatsappNumber = "23566803635"; // Format international sans le + (ex: 221770000000)

// État du panier
let cart = [];

// Chargement des produits au démarrage
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartUI();
});

// Afficher les produits
function displayProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <span class="product-price">${formatPrice(product.price)}</span>
                <button class="btn-outline" onclick="addToCart(${product.id})">Ajouter au panier</button>
            </div>
        </div>
    `).join('');
}

// Ajouter au panier
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    openCart();
}

// Retirer du panier
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

// Mettre à jour l'interface du panier
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total-price');

    // Mettre à jour le compteur
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;

    // Afficher les items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Votre panier est vide.</p>';
        cartTotal.innerText = '0 FCFA';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">${item.quantity} x ${formatPrice(item.price)}</div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
        </div>
    `).join('');

    // Calculer le total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.innerText = formatPrice(total);
}

// Ouvrir/Fermer le panier
function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
    document.getElementById('cart-overlay').classList.toggle('active');
}

function openCart() {
    document.getElementById('cart-sidebar').classList.add('active');
    document.getElementById('cart-overlay').classList.add('active');
}

// Formatage du prix
function formatPrice(price) {
    return price.toLocaleString('fr-FR') + ' FCFA';
}

// Commander via WhatsApp
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Votre panier est vide !");
        return;
    }

    let message = "Bonjour, je souhaite passer commande sur votre site :\n\n";
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        message += `- ${item.name} (x${item.quantity}) : ${formatPrice(itemTotal)}\n`;
        total += itemTotal;
    });

    message += `\n*TOTAL : ${formatPrice(total)}*\n\n`;
    message += "Merci de me confirmer la disponibilité.";

    // Encodage de l'URL pour WhatsApp
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Ouvrir WhatsApp
    window.open(url, '_blank');
}
