const buttons = document.querySelectorAll('button[data-name]');
const cartQuantityElement = document.getElementById('cart-quantity');
const emptyCartImage = document.getElementById('empty-cart');
const cartMessage = document.getElementById('cart-message');
const totalPriceContainer = document.getElementById('total-price');
const totalAmountElement = document.getElementById('total-amount');

const counters = {};
const prices = {};

buttons.forEach(button => {
    const name = button.dataset.name;
    const priceElement = button.closest('article').querySelector('p:nth-of-type(2)');
    const priceText = priceElement.textContent;
    const price = parseFloat(priceText.replace(/[^0-9.-]+/g,"")); 

    counters[name] = 0;
    prices[name] = price;

    button.addEventListener('click', () => {

        counters[name]++;
        itemCount = Object.values(counters).reduce((a, b) => a + b);
        cartQuantityElement.textContent = itemCount;
        
        if (itemCount > 0) {
            emptyCartImage.style.display = 'none';
        }

        cartMessage.innerHTML = Object.entries(counters)
            .filter(([_, count]) => count > 0)
            .map(([productName, count]) => {
                const totalPrice = (counters[productName] * prices[productName]).toFixed(2);
                return `<div class="cart-item">
                            <h3>${productName}</h3>
                            <p>
                                <span class="count">${count}x</span> 
                                <span class="normal-price">$${prices[productName].toFixed(2)}</span>
                                $${totalPrice}
                            </p>
                        </div>`; 
            })
            .join('<br>');
        

        button.classList.add('active');
        button.innerHTML = `${counters[name]}`;

        const productImage = button.closest('article').querySelector('.product-image img');
        productImage.style.border = '2px solid hsl(14, 86%, 42%)';

        const totalAmount = Object.entries(counters).reduce((sum, [productName, count]) => {
            return sum + (count * prices[productName]);
        }, 0);

        totalAmountElement.textContent = totalAmount.toFixed(2);

        if (totalAmount > 0) {
            totalPriceContainer.style.display = 'flex';
        }

    });
});