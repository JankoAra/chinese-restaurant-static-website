class Food {
    constructor(name, imgPath, price, desc) {
        this.name = name;
        this.imgPath = imgPath;
        this.priceSmall = price;
        this.desc = desc;
        this.priceLarge = this.priceSmall * 1.5;
    }
}

function compareFoodPrice(a, b) {
    return a.priceSmall - b.priceSmall;
}

function compareFoodName(a, b) {
    if (a.name < b.name)
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
}


class OrderItem {
    constructor(name, quantity, size, pricePerOne) {
        this.name = name;
        this.quantity = parseInt(quantity);
        this.size = size;
        this.pricePerOne = parseFloat(pricePerOne);
        this.price = this.quantity * this.pricePerOne;
    }

    toString() {
        let sz = this.size==='large' ? 'velika' : 'mala';
        return `${this.quantity} x ${this.name} (${sz})`;
    }
}

let foodList = [];

//predjela
let predjela = [];
predjela.push(new Food('Hladan krastavac', 'hrana-images/hladan-krastavac.jpg', 390, 'Salata sa krastavcem i sirćetom'));
predjela.push(new Food('Salata od gljiva', 'hrana-images/salata-od-gljiva.jpg', 480, 'Salata od kineskih pečuraka'));
predjela.push(new Food('Voćna salata', 'hrana-images/vocna-salata.jpg', 490, 'Salata od sezonskog voća'));
predjela.push(new Food('Ljuto-kisela supa', 'hrana-images/ljuto-kisela-supa.jpg', 260, 'Ljuto-kisela supa sa pečurkama'));

//glavna jela
let glavnaJela = [];
glavnaJela.push(new Food('Pileći prženi rezanci', 'hrana-images/pileci-przeni-rezanci.jpg', 500, 'Piletina sa rezancima u slatko-kiselom sosu'));
glavnaJela.push(new Food('Knedle od škampa', 'hrana-images/knedle-od-skampa.jpg', 990, 'Porcija kineskih knedli punjenih škampima'));
glavnaJela.push(new Food('Pirinač', 'hrana-images/pirinac.jpg', 150, 'Kuvani beli pirinač'));

//pića
let pica = [];
pica.push(new Food('Bubble tea', 'hrana-images/bubble-tea.jpg', 250, 'Mlečni čaj sa kuglicama tapioke'));
pica.push(new Food('Mleko od kikirikija', 'hrana-images/mleko-od-kikirikija.jpg', 200, 'Mleko od kikirikija'));
pica.push(new Food('Kineski čaj', 'hrana-images/kineski-caj.jpg', 190, 'Originalni kineski čaj spremljen na tradicionalan način'));

//dezerti
let dezerti = [];
dezerti.push(new Food('Pohovana banana', 'hrana-images/pohovana-banana.jpg', 400, 'Pohovana banana sa prelivom'));
dezerti.push(new Food('Pohovani ananas', 'hrana-images/pohovani-ananas.jpg', 400, 'Pohovani ananas sa prelivom'));
dezerti.push(new Food('Pohovana čokolada', 'hrana-images/pohovana-cokolada.jpg', 400, 'Pohovana čokolada sa prelivom'));

foodList.push(...predjela, ...glavnaJela, ...pica, ...dezerti);

function buildFoodCard(food) {
    return `<div class="col-sm-12 col-md-6 col-lg-4">
        <a href="#" class="card-link" data-bs-toggle="modal" data-bs-target="#dishModal" 
        data-food-name="${food.name}" 
        data-food-desc="${food.desc}" 
        data-food-price="${food.priceSmall.toFixed(2)}" 
        data-food-img="${food.imgPath}">
            <div class="card jelo-card my-xs-5 mx-xs-3 my-md-3 mx-md-0">
                <img src="${food.imgPath}" class="card-img-top" alt="${food.name + ' slika'}">
                <div class="card-body jelo-kartica">
                    <h4 class="card-title">${food.name}</h4>
                    <p class="card-text">${food.desc}</p>
                    <h5 class="text-start">${food.priceSmall.toFixed(2)}</h5>
                </div>
            </div>
        </a>
    </div>`;
}

function osisajLatinicu(str) {
    str = str.toLowerCase();
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


function buildFoodList() {
    const category = localStorage.getItem('vd-proj-kategorija');
    let list = null;
    const naslov = $('#ime-kategorije');
    let searchQuery = localStorage.getItem('vd-proj-search');
    if (searchQuery !== null) {
        naslov.text('Pretraga');
        $("title").text('Pretraga | Xi-jajno');
        searchQuery = osisajLatinicu(searchQuery);
        list = foodList.filter(food => osisajLatinicu(food.name).includes(searchQuery));
    } else {
        switch (category) {
            case 'predjela':
                list = predjela;
                naslov.text('Predjela');
                break;
            case 'glavna jela':
                list = glavnaJela;
                naslov.text('Glavna jela');
                break;
            case 'dezerti':
                list = dezerti;
                naslov.text('Dezerti');
                break;
            case 'pica':
                list = pica;
                naslov.text('Pića');
                break;
            default:
                console.log('Nema kategorije');
                break;
        }
        $("title").text(naslov.text() + ' | Xi-jajno');
    }
    let sort = localStorage.getItem('vd-proj-sort');
    if (sort === null) {
        sort = 'name-asc';
    }
    switch (sort) {
        case 'name-asc':
            list.sort(compareFoodName);
            break;
        case 'name-desc':
            list.sort(compareFoodName).reverse();
            break;
        case 'price-asc':
            list.sort(compareFoodPrice);
            break;
        case 'price-desc':
            list.sort(compareFoodPrice).reverse();
            break;
        default:
            console.log('Nema sortiranja');
            break;
    }
    let foodDiv = $('#jela');
    foodDiv.html('');
    list.forEach(element => {
        foodDiv.html(foodDiv.html() + buildFoodCard(element));
    });
}

$(document).ready(function () {
    localStorage.setItem("vd-proj-sort", "name-asc");

    $("#predjela-sidebar").click(function () {
        localStorage.setItem("vd-proj-kategorija", "predjela");
        localStorage.removeItem("vd-proj-search");
    });

    $("#glavnaJela-sidebar").click(function () {
        localStorage.setItem("vd-proj-kategorija", "glavna jela");
        localStorage.removeItem("vd-proj-search");
    });

    $("#dezerti-sidebar").click(function () {
        localStorage.setItem("vd-proj-kategorija", "dezerti");
        localStorage.removeItem("vd-proj-search");
    });

    $("#pica-sidebar").click(function () {
        localStorage.setItem("vd-proj-kategorija", "pica");
        localStorage.removeItem("vd-proj-search");
    });

    $("#sortiranje").change(function () {
        let sort = $(this).val();
        localStorage.setItem("vd-proj-sort", sort);
        buildFoodList();
    });

    $("#trazi-btn").click(function () {
        let searchText = $("#trazi-text").val();
        searchText = osisajLatinicu(searchText);
        localStorage.setItem("vd-proj-search", searchText);
        buildFoodList();
    });
    $("#trazi-text").keypress(function (e) {
        if (e.which == 13) {
            $("#trazi-btn").click();
            $(this).blur();
        }
    });

    $('#dishModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var foodName = button.data('food-name'); // Extract info from data-* attributes
        var foodDesc = button.data('food-desc');
        var foodPriceSmall = button.data('food-price');
        foodPriceSmall = parseFloat(foodPriceSmall);
        var foodPriceLarge = foodPriceSmall * 1.5;
        var modal = $(this);
        $("#portionNumber").val("1");
        $("#smallPortion").prop("checked", true);
        modal.find('.modal-title').text(foodName);
        modal.find('#dishImage').attr('src', button.data('food-img'));
        modal.find('#dishDesc').text(foodDesc);
        modal.find('#dishName').text(foodName);
        modal.find('#smallPrice').text(foodPriceSmall.toFixed(2));
        modal.find('#largePrice').text(foodPriceLarge.toFixed(2));
    });

    $("#dodajUKorpu").click(function () {
        var dishName = $("#dishName").text();
        var portionSize = $('input[name="portionSize"]:checked').val();
        var portionPrice = $("#" + portionSize + "Price").text();
        var portionNumber = $("#portionNumber").val();

        let orderItem = new OrderItem(dishName, portionNumber, portionSize, portionPrice);
        let cart = JSON.parse(sessionStorage.getItem("vd-proj-cart"));
        if (cart === null) {
            cart = [orderItem];
        }
        else {
            let found = false;
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].name === orderItem.name && cart[i].size === orderItem.size) {
                    cart[i].quantity = parseInt(cart[i].quantity) + parseInt(orderItem.quantity);
                    cart[i].price = parseFloat(cart[i].price) + parseFloat(orderItem.price);
                    found = true;
                    break;
                }
            }
            if (!found)
                cart.push(orderItem);
        }
        sessionStorage.setItem("vd-proj-cart", JSON.stringify(cart));

        console.log("Dish added to cart:", orderItem);
        $("#toastBody").html(orderItem.toString());
        $("#addToCartToast").toast('show');
    });

    $("#increasePortion").click(function () {
        let portions = $("#portionNumber").val();
        portions = parseInt(portions) + 1;
        $("#portionNumber").val(portions);
    });
    $("#decreasePortion").click(function () {
        let portions = $("#portionNumber").val();
        portions = parseInt(portions);
        if (portions > 1) {
            portions--;
        }
        $("#portionNumber").val(portions);
    });

    buildFoodList();
})