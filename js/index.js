/* Файл з скриптом для головної сторінки (відображення товарів, фільтрація, додавання в кошик) */

// Відображаємо товари на сторінці
async function renderProducts (){
    const products = await getProducts();
    const productsList = document.querySelector('.products-list');
    
    if (productsList) {
        products.forEach(product => {
            productsList.innerHTML += getCardHTML(product);
        });
    }
    // Отримуємо всі кнопки "Купити" на сторінці
    let buyButtons = document.querySelectorAll('.products-list .cart-btn');
    // Навішуємо обробник подій на кожну кнопку "Купити"
    if (buyButtons){ 
        buyButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
    }
};


// Генеруємо HTML-код для карточки товару
function getCardHTML(product) {
    return `
        <div class="card" style="">
            <img src="/img/${product.image}">
            <h5 class="text-card">${product.title}</h5>
            <p class="description-card">
            ${product.description}
           </p>
            <p class="price-card">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="25"  height="25"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-currency-hryvnia"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a2.64 2.64 0 0 1 2.562 -2h3.376a2.64 2.64 0 0 1 2.562 2a2.57 2.57 0 0 1 -1.344 2.922l-5.876 2.938a3.338 3.338 0 0 0 -1.78 3.64a3.11 3.11 0 0 0 3.05 2.5h2.888a2.64 2.64 0 0 0 2.562 -2" /><path d="M6 10h12" /><path d="M6 14h12" /></svg>
            ${product.price}
           </p>
            <button type="button" class="cart-btn">
            <svg class="bell" xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M12.5 17h-6.5v-14h-2" /><path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
            Купити</button>
        </div>
    `
}

// / Функція для додавання товару до кошика при кліку на кнопку "Купити"

// Функція для додавання товару до кошика при кліку на кнопку "Купити"
function addToCart(event) {
    // Отримуємо батьківський елемент (картку товару), який містить інформацію про товар
    let productCard = event.target.closest('.card');

    // Отримуємо дані про товар з елементів картки товару
    let title = productCard.querySelector('.text-card').textContent;
    let price = parseFloat(productCard.querySelector('.price-card').textContent.replace(/[^\d.]/g, '')); // Витягуємо ціну і перетворюємо на число
    // Інші дані про товар (зображення, опис) можна отримати аналогічно
    
    // Створюємо об'єкт товару
    let product = {
        title: title,
        price: price,
        quantity: 1,
    };

    // Додаємо товар до кошика
    cart.addItem(product);
    console.log(cart);
}

// відображаємо товари на сторінці
renderProducts();
