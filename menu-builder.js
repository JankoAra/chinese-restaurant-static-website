class Food {
    constructor(name, imgPath, price, desc) {
        this.name = name;
        this.imgPath = imgPath;
        this.priceSmall = price;
        this.desc = desc;
        this.priceLarge = this.priceSmall * 1.5;
    }
}

let foodList = [];
//foodList.push(new Food('Jelo1', 'galerija-images/food1.jpg', 100, 'Jelo1 opis'));

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
dezerti.push(new Food('Pohovana cokolada', 'hrana-images/pohovana-cokolada.jpg', 400, 'Pohovana čokolada sa prelivom'));

foodList.push(...predjela, ...glavnaJela, ...pica, ...dezerti);

function buildFoodCard2(food) {
    return `<div class="col-sm-12 col-md-6 col-lg-4">
<div class="card jelo-card my-xs-5 mx-xs-3 my-md-3 mx-md-0">
    <img src="${food.imgPath}" class="card-img-top" alt="${food.name + ' slika'}">
    <div class="card-body jelo-kartica">
        <h4 class="card-title">${food.name}</h4>
        <p class="card-text">${food.desc}</p>
        <!-- <a href="#" class="btn">Go somewhere</a> -->
        <h5 class="text-start">${food.priceSmall.toFixed(2)}</h5>
        <button type="button" class="btn btn-info" 
        data-bs-toggle="modal" 
        data-bs-target="#dishModal" 
        data-food-name="${food.name}" 
        data-food-desc="${food.desc}" 
        data-food-price="${food.priceSmall.toFixed(2)}">
            View Details
        </button>
    </div>
</div>
</div>`;
}

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


function buildFoodList() {
    const category = window.localStorage.getItem('vd-proj-kategorija');
    let list = null;
    const naslov = $('#ime-kategorije');
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
    let foodDiv = $('#jela');
    foodDiv.html('');
    list.forEach(element => {
        foodDiv.html(foodDiv.html() + buildFoodCard(element));
    });
}

$(document).ready(function () {
    $("#predjela-sidebar").click(function () {
        localStorage.setItem("vd-proj-kategorija", "predjela");
    });

    $("#glavnaJela-sidebar").click(function () {
        localStorage.setItem("vd-proj-kategorija", "glavna jela");
    });

    $("#dezerti-sidebar").click(function () {
        localStorage.setItem("vd-proj-kategorija", "dezerti");
    });

    $("#pica-sidebar").click(function () {
        localStorage.setItem("vd-proj-kategorija", "pica");
    });

    $('#dishModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var foodName = button.data('food-name'); // Extract info from data-* attributes
        var foodDesc = button.data('food-desc');
        var foodPriceSmall = button.data('food-price');
        foodPriceSmall = parseFloat(foodPriceSmall);
        var foodPriceLarge = foodPriceSmall * 1.5;
        var modal = $(this);
        modal.find('.modal-title').text(foodName);
        modal.find('#dishImage').attr('src', button.data('food-img'));
        modal.find('#dishDesc').text(foodDesc);
        modal.find('#dishName').text(foodName);
        modal.find('#smallPrice').text(foodPriceSmall.toFixed(2));
        modal.find('#largePrice').text(foodPriceLarge.toFixed(2));
    });

    buildFoodList();
})