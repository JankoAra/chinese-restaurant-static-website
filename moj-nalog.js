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

function orderItemToString(item, lang) {
    if (lang === 'srb') {
        return `${item.quantity} x ${item.name} (${item.sizeSrb})`;
    }
    else if (lang === 'eng') {
        return `${item.quantity} x ${item.engName} (${item.sizeEng})`;
    }
}

function showCorrectLanguage() {
    let lang = localStorage.getItem("vd-proj-lang");
    if (lang === "srb") {
        $(".eng").hide();
        $(".srb").show();
    }
    else if (lang === "eng") {
        $(".srb").hide();
        $(".eng").show();
    }
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

function finalizeOrder() {
    let cart = JSON.parse(sessionStorage.getItem('vd-proj-cart'));
    if (cart === null || cart.length === 0) {
        alert('Nema proizvoda u korpi!');
        return;
    }
    let previousOrders = JSON.parse(localStorage.getItem('vd-proj-previous-orders'));
    if (previousOrders === null) {
        previousOrders = [];
    }
    previousOrders.push(cart);
    sessionStorage.removeItem('vd-proj-cart');
    localStorage.setItem('vd-proj-previous-orders', JSON.stringify(previousOrders));
    showCart();
}

function showCart() {
    showOrderHistory();
    $("#cartTable").html('');
    let cart = JSON.parse(sessionStorage.getItem('vd-proj-cart'));
    if (cart === null || cart.length === 0) {
        $('#cartTable').html(`<tr><td colspan="5" class="text-center">
        <span class="srb">Nema proizvoda u korpi</span>
        <span class="eng">Cart is empty</span>
        </td></tr>`);
        showCorrectLanguage();
        return;
    }
    cart.forEach(element => {
        let pricePerOne = parseFloat(element.pricePerOne);
        let quantity = parseInt(element.quantity);
        let price = pricePerOne * quantity;
        let foodName = element.name + ' (' + element.sizeSrb + ')';
        let foodNameEng = element.engName + ' (' + element.sizeEng + ')';
        let btnMinus = `<button type="button" class="btn btn-outline-primary rounded-circle btn-minus" 
                        data-name="${element.name}" data-size="${element.size}">&minus;</button>`;
        let btnPlus = `<button type="button" class="btn btn-outline-primary rounded-circle btn-plus" 
                        data-name="${element.name}" data-size="${element.size}">&plus;</button>`;
        let btnQuantity = `<button type="button" class="btn btn-quantity" disabled>${element.quantity}</button>`;
        let quantityInnerHTML = `<div class="btn-group" role="group">${btnMinus}${btnQuantity}${btnPlus}</div>`;

        let btnClose = `<button type="button" class="btn-close btn-remove-from-cart" 
                        data-name="${element.name}" data-size="${element.size}"></button>`;
        let foodNameSpan = `<span class="srb">${foodName}</span><span class="eng">${foodNameEng}</span>`;
        let tr = `<tr><td>${btnClose}</td><td>${foodNameSpan}</td><td>${quantityInnerHTML}</td><td>${pricePerOne.toFixed(2)}
        </td><td>${price.toFixed(2)}</td></tr>`;
        $("#cartTable").append(tr);
    });
    $("#cartTable").append(`<tr id="totalPriceRow"><td colspan="4" class="text-end">
                        <span class="srb">Ukupno</span>
                        <span class="eng">Total</span>
                        </td>
                        <td>${calculateTotalPrice().toFixed(2)}</td>
                        </tr>`);
    $("#cartTable").append(`<tr id="orderButtonRow"><td colspan="5" class="text-end">
                        <button class="btn" id="orderButton">
                        <span class="srb">Poruči</span>
                        <span class="eng">Order</span>
                        </button></td></tr>`);
    showCorrectLanguage();

};

function showOrderHistory() {
    let previousOrders = JSON.parse(localStorage.getItem('vd-proj-previous-orders'));
    $("#orderHistoryList").html('');
    if (previousOrders === null || previousOrders.length === 0) {
        $('#orderHistoryList').html(`<div class="text-start">
        <span class="srb">Nema narudžbina</span>
        <span class="eng">No orders yet</span>
        </div>`);
        return;
    }
    for (let i = 0; i < previousOrders.length; i++) {
        let div = $("<div></div>");
        div.addClass('previous-order');
        let totalPrice = 0;
        for (let j = 0; j < previousOrders[i].length; j++) {
            let orderItem = previousOrders[i][j];
            let orderStringSrb = orderItemToString(orderItem, 'srb');
            let orderStringEng = orderItemToString(orderItem, 'eng');
            let spanSrb = $(`<span class="srb">${orderStringSrb}</span>`);
            let spanEng = $(`<span class="eng">${orderStringEng}</span>`);
            let innerDiv = $("<div class='my-1 py-0'></div>").append(spanSrb).append(spanEng);
            div.append(innerDiv);
            totalPrice += orderItem.price;
        }
        let cenaSpan = $('<span class="cena-span srb">').text('Ukupna cena: ' + totalPrice.toFixed(2) + ' RSD');
        let cenaSpanEng = $('<span class="cena-span eng">').text('Total price: ' + totalPrice.toFixed(2) + ' RSD');
        div.append(cenaSpan).append(cenaSpanEng);
        $("#orderHistoryList").append(div).append("<hr>");
    }
    
}


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

        else if (event.target.classList.contains('btn-plus')) {
            let name = event.target.getAttribute('data-name');
            let size = event.target.getAttribute('data-size');
            increaseQuantity(name, size);
        }

        else if (event.target.classList.contains('btn-remove-from-cart')) {
            let name = event.target.getAttribute('data-name');
            let size = event.target.getAttribute('data-size');
            $('#confirmationModalRemoveItem').modal('show');

            $('#confirmRemove').off('click').on('click', function () {
                removeFromCart(name, size);
                $('#confirmationModalRemoveItem').modal('hide');
            });
        }

        else if (event.target.id === 'orderButton') {
            $('#confirmationModalFinalizeOrder').modal('show');

            $('#confirmOrder').off('click').on('click', function () {
                finalizeOrder();
                $('#confirmationModalFinalizeOrder').modal('hide');
            });
        }
        else if (event.target.parentNode.id === 'orderButton') {
            $('#confirmationModalFinalizeOrder').modal('show');

            $('#confirmOrder').off('click').on('click', function () {
                finalizeOrder();
                $('#confirmationModalFinalizeOrder').modal('hide');
            });
        }
    });
});