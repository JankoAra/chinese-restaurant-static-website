class OrderItem {
    constructor(name, quantity, size, pricePerOne) {
        this.name = name;
        this.quantity = parseInt(quantity);
        this.size = size;
        this.pricePerOne = parseFloat(pricePerOne);
        this.price = this.quantity * this.pricePerOne;
    }

    toString() {
        let sz = this.size === 'large' ? 'velika' : 'mala';
        return `${this.quantity} x ${this.name} (${sz})`;
    }
}

function orderItemToString(item) {
    let sz = item.size === 'large' ? 'velika' : 'mala';
    return `${item.quantity} x ${item.name} (${sz})`;
}

function calculateTotalPrice() {
    let cart = JSON.parse(sessionStorage.getItem('vd-proj-cart'));
    let total = 0;
    cart.forEach(element => {
        total += parseFloat(element.price);
    });
    return total;
}

function increaseQuantity(name, size) {
    console.log(name, size);
    let cart = JSON.parse(sessionStorage.getItem('vd-proj-cart'));
    cart.forEach(element => {
        if (element.name === name && element.size === size && element.quantity < 99) {
            element.quantity++;
            element.price = element.pricePerOne * element.quantity;
            sessionStorage.setItem('vd-proj-cart', JSON.stringify(cart));
            showCart();
        }
    });
}

function decreaseQuantity(name, size) {
    let cart = JSON.parse(sessionStorage.getItem('vd-proj-cart'));
    cart.forEach(element => {
        if (element.name === name && element.size === size && element.quantity > 1) {

            element.quantity--;
            element.price = element.pricePerOne * element.quantity;
            sessionStorage.setItem('vd-proj-cart', JSON.stringify(cart));
            showCart();

        }
    });
}

function removeFromCart(name, size) {
    let cart = JSON.parse(sessionStorage.getItem('vd-proj-cart'));
    cart.forEach(element => {
        if (element.name === name && element.size === size) {
            cart.splice(cart.indexOf(element), 1);
            sessionStorage.setItem('vd-proj-cart', JSON.stringify(cart));
            showCart();
        }
    });
}

function showCart() {
    $("#cartTable").html('');
    let cart = JSON.parse(sessionStorage.getItem('vd-proj-cart'));
    if (cart === null || cart.length === 0) {
        $('#cartTable').html('<tr><td colspan="5" class="text-center">Nema proizvoda u korpi</td></tr>');
        return;
    }
    cart.forEach(element => {
        let pricePerOne = parseFloat(element.pricePerOne);
        let quantity = parseInt(element.quantity);
        let price = pricePerOne * quantity;
        let sz = element.size === 'large' ? 'velika' : 'mala';
        let foodName = element.name + ' (' + sz + ')';
        let btnMinus = `<button type="button" class="btn btn-outline-primary rounded-circle btn-minus" 
                        data-name="${element.name}" data-size="${element.size}">&minus;</button>`;
        let btnPlus = `<button type="button" class="btn btn-outline-primary rounded-circle btn-plus" 
                        data-name="${element.name}" data-size="${element.size}">&plus;</button>`;
        let btnQuantity = `<button type="button" class="btn btn-quantity" disabled>${element.quantity}</button>`;
        let quantityInnerHTML = `<div class="btn-group" role="group">${btnMinus}${btnQuantity}${btnPlus}</div>`;

        let btnClose = `<button type="button" class="btn-close btn-remove-from-cart" 
                        data-name="${element.name}" data-size="${element.size}"></button>`;
        let tr = `<tr><td>${btnClose}</td><td>${foodName}</td><td>${quantityInnerHTML}</td><td>${pricePerOne.toFixed(2)}
        </td><td>${price.toFixed(2)}</td></tr>`;
        $("#cartTable").append(tr);
    });
    $("#cartTable").append(`<tr><td colspan="4" class="text-end"><b>Ukupno</b></td><td>${calculateTotalPrice().toFixed(2)}</td></tr>`);
    $("#cartTable").append(`<tr><td colspan="5" class="text-end"><button class="btn btn-primary" onclick="clearCart()">Obrisi</button></td></tr>`);

};


let cart = null;
let previousOrders = null;
$(document).ready(function () {
    cart = JSON.parse(sessionStorage.getItem('vd-proj-cart'));
    previousOrders = JSON.parse(localStorage.getItem('vd-proj-previous-orders'));
    showCart();

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-minus')) {
            let name = event.target.getAttribute('data-name');
            let size = event.target.getAttribute('data-size');
            decreaseQuantity(name, size);
        }

        if (event.target.classList.contains('btn-plus')) {
            let name = event.target.getAttribute('data-name');
            let size = event.target.getAttribute('data-size');
            increaseQuantity(name, size);
        }

        if (event.target.classList.contains('btn-remove-from-cart')) {
            let name = event.target.getAttribute('data-name');
            let size = event.target.getAttribute('data-size');
            // Show confirmation modal
            $('#confirmationModal').modal('show');

            // Add event listener to confirm removal
            $('#confirmRemove').on('click', function () {
                removeFromCart(name, size);
                $('#confirmationModal').modal('hide');
            });
        }
    });
});