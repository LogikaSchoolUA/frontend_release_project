let cart_list = document.querySelector('.cart-items-list') 
let cart_total = document.querySelector('.cart-total') 
let orderBtn = document.querySelector("#orderBtn")
let orderSection = document.querySelector(".order")


function get_item(item)  {
    let itemElement = `<div class = "cart-item">
        <h4 class="cart-item-title">${item.title}</h4>
        
        <div class="cart-item-quantity">Кількість: 
        <input type="number" name="quantity" min="1" value="${item.quantity}">
        </div>
        <div class="cart-item-price" data-price="${item.price}">${item.price * item.quantity} грн</div>
        <!-- Додайте інші дані про товар, які вам потрібні -->
        </div>`;
    return itemElement;
}

function showCartList(){
    if (cart.items.length > 0){
        cart_list.innerHTML = ''
        cart.items.forEach(item => {
            let itemElement = get_item(item);
            cart_list.innerHTML+=itemElement;
        })
    }
    
    cart_total.innerHTML = cart.calculateTotalPrice()
}

showCartList()

// Навішуємо обробник подій на зміну кількості товару у полі вводу
cart_list.addEventListener('change', function(event) {

    const target = event.target;
    if (target && target.matches('.cart-item-quantity input')) {
        let new_quantity = +target.value
        if (new_quantity >= 1){
            // Викликаємо функцію для оновлення вартості товарів у кошику
            let item = target.closest('.cart-item');
            let title = item.querySelector('.cart-item-title').textContent
            cart.updateQuantity(title, new_quantity)
            showCartList(); // показуємо оновлений кошик
        }
    }
});

//анімація появи кошика поступова поява кошика
anime({
    targets: '.cart', 
    opacity: 1, // Кінцева прозорість (1 - повністю видимий)
    duration: 500, // Тривалість анімації в мілісекундах
    easing: 'easeInOutQuad'
})

orderBtn.addEventListener("click", function(event) {
    if (cart.items.length > 0){
        orderBtn.style.display = "none";
        orderSection.style.display = "block";
        anime({
            targets: '.order',
            opacity: 1, // Кінцева прозорість (1 - повністю видимий)
            duration: 1000, // Тривалість анімації в мілісекундах
            easing: 'easeInOutQuad'
        })
    }
   
})
