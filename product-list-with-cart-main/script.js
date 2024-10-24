const buttons = document.querySelectorAll('button[data-name]');
const cartQuantityElement = document.getElementById('cart-quantity');
const emptyCartImage = document.getElementById('empty-cart');
const cartMessage = document.getElementById('cart-message');

let itemCount = 0;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        itemCount++;
        cartQuantityElement.textContent = itemCount;
        if (itemCount === 1) {
            emptyCartImage.style.display = 'none';
            cartMessage.textContent = `You added: ${button.dataset.name}`;
        }

        const productImage = button.closest('article').querySelector('.product-image img');
        productImage.style.border = '2px solid hsl(14, 86%, 42%)';
    });
});

