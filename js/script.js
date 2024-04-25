/* Файл із спільними скриптами для всього сайту (анімації, меню, кошик) */

// Очікуємо завантаження сторінки
document.addEventListener('DOMContentLoaded', () => {
    // Отримуємо всі написи для анімації
    const textElements = document.querySelectorAll('.fade-in-text');
    
    // Додаємо клас "show" для запуску анімації
    textElements.forEach(element => {
        element.classList.add('show');
    });

    let theme = getCookieValue('theme')
    if (theme=='light') {
        document.body.classList.add("light-theme");
    }
});

// Отримуємо дані про товари з JSON файлу
async function getProducts (){
    const response = await fetch("store_db.json");
    const products = await response.json();
    return products;
};

// Функція для отримання значення кукі за ім'ям
function getCookieValue(cookieName) {
    // Розділяємо всі куки на окремі частини
    const cookies = document.cookie.split(';');

    // Шукаємо куки з вказаним ім'ям
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim(); // Видаляємо зайві пробіли

        // Перевіряємо, чи починається поточне куки з шуканого імені
        if (cookie.startsWith(cookieName + '=')) {
            // Якщо так, повертаємо значення куки
            return cookie.substring(cookieName.length + 1); // +1 для пропуску символу "="
        }
    }

    // Якщо куки з вказаним іменем не знайдено, повертаємо порожній рядок або можна повернути null
    return '';
}


// Отримуємо кнопку "Кошик"
const cartBtn = document.getElementById('cartBtn');

// Навішуємо обробник подій на клік кнопки "Кошик"
cartBtn.addEventListener("click", () => {
    // Переходимо на сторінку кошика
    window.location.assign('/cart.html');
});


// Створення класу кошика
class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.cartCounter = document.querySelector('.cart-counter');
        this.cartElement = document.querySelector('#cart-items'); // Знаходимо елемент кошика у HTML
    }

    // Додавання товару до кошика
    addItem(item) {
         // Перевіряємо, чи товар вже є в кошику
        const index =  this.items.findIndex(function(existingItem) {
            return existingItem.title === item.title;
        });
        if (index !== -1){
            // Якщо товар вже є, збільшуємо його кількість на одиницю
            this.items[index].quantity += 1;
        } else {
            // Якщо товару немає в кошику, додаємо його разом з кількістю 1
            item.quantity = 1;
            this.items.push(item);
        }
        this.updateCounter(); // Оновлюємо лічильник товарів
        this.saveCartToCookies()
    }

    updateQuantity(item_title, newQuantity) {
        const index = this.items.findIndex(function(existingItem) {
            return existingItem.title === item_title;
        });
        if (index !== -1) {
            // Змінюємо кількість товару на нове значення
            this.items[index].quantity = newQuantity;
            this.updateCounter(newQuantity - this.items[index].quantity); // Оновлюємо лічильник товарів з урахуванням змін
            this.saveCartToCookies(); // Зберігаємо зміни у куки
        }
    }
    updateCounter(value=1) {
        // Збільшуємо лічильник кількості товарів у кошику
        this.cartCounter.innerHTML = +this.cartCounter.innerHTML + value
    }

    calculateTotalPrice(){
        this.total = 0;
        // Проходимося по кожному товару у кошику
        this.items.forEach(item => {
            // Додаємо до загальної суми вартість кожного товару, помножену на його кількість
            this.total += item.price * item.quantity;
        });
        return this.total
    }

    // Перетворення об'єкту кошика у JSON та збереження у куки
    saveCartToCookies() {
         // Перетворюємо об'єкт кошика у JSON рядок
        let cartJSON = JSON.stringify(this.items);

        // Зберігаємо JSON рядок у кукі
        document.cookie = `cart=${cartJSON}; max-age=${60 * 60 * 24 * 7}; path=/`;
        // console.log(document.cookie)
    }

     // Завантаження кошика з кукісів
    loadCartFromCookies() {
        let cartCookie = getCookieValue('cart');
        if (cartCookie && cartCookie != ''){
            let items = JSON.parse(cartCookie);
            items.forEach(item => {
                this.items.push(item);
                this.updateCounter(item.quantity);
            });
        }
    }

}

// Створення об'єкта кошика
let cart = new ShoppingCart();


// Завантажуємо кошик з кукісів при завантаженні сторінки
cart.loadCartFromCookies();

let themeBtn = document.querySelector("#themeToggle")
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle('light-theme'); // Перемикаємо клас теми
    let currentTheme = 'dark'
    if (document.body.classList.contains('light-theme')){
        currentTheme = 'light'
        themeBtn.innerHTML = '<i class="bi bi-moon"></i>';
    } else{
        themeBtn.innerHTML = '<i class="bi bi-brightness-high"></i>';
    }

    // Зберігаємо JSON рядок у кукі
    document.cookie = `theme=${currentTheme}; max-age=${60 * 60 * 24 * 7}; path=/`;
})

// TODO:
// Анімації
// Адаптивність

