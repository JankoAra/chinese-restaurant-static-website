class Food {
    constructor(name, imgPath, price, desc, engName, engDesc) {
        this.name = name;
        this.imgPath = imgPath;
        this.priceSmall = price;
        this.desc = desc;
        this.priceLarge = this.priceSmall * 1.5;
        this.engName = engName;
        this.engDesc = engDesc;
    }
}

function compareFoodPrice(a, b) {
    return a.priceSmall - b.priceSmall;
}

function compareFoodName(a, b) {
    let lang = localStorage.getItem("vd-proj-lang");
    if (lang === 'srb') {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    }
    else if (lang === 'eng') {
        if (a.engName < b.engName)
            return -1;
        if (a.engName > b.engName)
            return 1;
        return 0;
    }
}


class OrderItem {
    constructor(name, quantity, size, pricePerOne, engName) {
        this.name = name;
        this.engName = engName;
        this.quantity = parseInt(quantity);
        if (size === 'large') {
            this.sizeSrb = 'velika';
            this.sizeEng = 'large';
        }
        else {
            this.sizeSrb = 'mala';
            this.sizeEng = 'small';
        }
        this.size = size;
        this.pricePerOne = parseFloat(pricePerOne);
        this.price = this.quantity * this.pricePerOne;
    }

    toString() {
        let lang = localStorage.getItem("vd-proj-lang");
        if (lang === 'srb') {
            return `${this.quantity} x ${this.name} (${this.sizeSrb})`;
        }
        else if (lang === 'eng') {
            return `${this.quantity} x ${this.engName} (${this.sizeEng})`;
        }
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

let foodList = [];

//predjela
let predjela = [];
predjela.push(new Food('Hladan krastavac', 'hrana-images/hladan-krastavac.jpg', 390, 'Salata sa krastavcem i sirćetom',
    'Cold Cucumber', 'Salad with cucumber and vinegar'));
predjela.push(new Food('Salata od gljiva', 'hrana-images/salata-od-gljiva.jpg', 480, 'Salata od kineskih pečuraka',
    'Mushroom Salad', 'Chinese mushroom salad'));
predjela.push(new Food('Voćna salata', 'hrana-images/vocna-salata.jpg', 490, 'Salata od sezonskog voća',
    'Fruit Salad', 'Seasonal fruit salad'));
predjela.push(new Food('Ljuto-kisela supa', 'hrana-images/ljuto-kisela-supa.jpg', 260, 'Ljuto-kisela supa sa pečurkama',
    'Spicy and Sour Soup', 'Spicy and sour soup with mushrooms'));

//glavna jela
let glavnaJela = [];
glavnaJela.push(new Food('Pileći prženi rezanci', 'hrana-images/pileci-przeni-rezanci.jpg', 500, 'Piletina sa rezancima u slatko-kiselom sosu',
    'Chicken Fried Noodles', 'Chicken with noodles in sweet and sour sauce'));
glavnaJela.push(new Food('Knedle od škampa', 'hrana-images/knedle-od-skampa.jpg', 990, 'Porcija kineskih knedli punjenih škampima',
    'Shrimp Dumplings', 'Chinese dumplings filled with shrimp'));
glavnaJela.push(new Food('Pirinač', 'hrana-images/pirinac.jpg', 150, 'Kuvani beli pirinač',
    'Rice', 'Boiled white rice'));

//pića
let pica = [];
pica.push(new Food('Bubble tea', 'hrana-images/bubble-tea.jpg', 250, 'Mlečni čaj sa kuglicama tapioke',
    'Bubble Tea', 'Milk tea with tapioca balls'));
pica.push(new Food('Mleko od kikirikija', 'hrana-images/mleko-od-kikirikija.jpg', 200, 'Mleko od kikirikija',
    'Peanut Milk', 'Peanut milk'));
pica.push(new Food('Kineski čaj', 'hrana-images/kineski-caj.jpg', 190, 'Originalni kineski čaj spremljen na tradicionalan način',
    'Chinese Tea', 'Original Chinese tea prepared in a traditional way'));

//dezerti
let dezerti = [];
dezerti.push(new Food('Pohovana banana', 'hrana-images/pohovana-banana.jpg', 400, 'Pohovana banana sa prelivom',
    'Fried Banana', 'Fried banana with topping'));
dezerti.push(new Food('Pohovani ananas', 'hrana-images/pohovani-ananas.jpg', 400, 'Pohovani ananas sa prelivom',
    'Fried Pineapple', 'Fried pineapple with topping'));
dezerti.push(new Food('Pohovana čokolada', 'hrana-images/pohovana-cokolada.jpg', 400, 'Pohovana čokolada sa prelivom',
    'Fried Chocolate', 'Fried chocolate with topping'));


foodList.push(...predjela, ...glavnaJela, ...pica, ...dezerti);

function buildFoodCard(food) {
    let nameSerbian = food.name;
    let nameEnglish = food.engName;
    let descSerbian = food.desc;
    let descEnglish = food.engDesc;
    let price = food.priceSmall.toFixed(2);
    let altText = nameSerbian + ' slika';
    let avgGrade = getAvgGrade(food.name);
    let coloredStars = Math.round(avgGrade);

    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= coloredStars) {
            stars += '<span style="color: #e40319">&starf;</span>';
        } else {
            stars += '<span style="color: #e40319">&star;</span>';
        }
    }
    stars+="&nbsp;"+avgGrade.toFixed(1)+'/5';
    console.log(avgGrade);
    return `
    <div class="col">
        <div class="card h-100" data-food-name="${food.name}" 
            data-food-name-eng="${food.engName}" 
            data-food-desc="${food.desc}" 
            data-food-desc-eng="${food.engDesc}" 
            data-food-price="${food.priceSmall.toFixed(2)}" 
            data-food-img="${food.imgPath}" 
            data-food-avg-grade="${avgGrade.toFixed(1)}"
            data-bs-toggle="modal" data-bs-target="#dishModal">
            <div class="row g-1">
                <div class="col-4 col-md-12">
                    <img src="${food.imgPath}" class="img-fluid food-card-img" alt="${altText}">
                </div>
                <div class="col-8 col-md-12">
                    <div class="card-body">
                        <h4 class="card-title srb">${nameSerbian}</h4>
                        <h4 class="card-title eng">${nameEnglish}</h4>
                        <p class="card-text srb">${descSerbian}</p>
                        <p class="card-text eng">${descEnglish}</p>
                        <div class="mt-auto">
                        <h5 class="justify-content-between d-flex">
                        <span class="">${stars}</span>
                        <span class="">${price} RSD</span>
                        </h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    `;
}

function getAvgGrade(foodName){
    let grades = JSON.parse(localStorage.getItem('vd-proj-food-grades'));
    if(grades === null){
        return 0;
    }
    return grades[foodName].reduce((a, b) => a + b, 0) / grades[foodName].length;
}


function osisajLatinicu(str) {
    str = str.toLowerCase();
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


function buildFoodList() {
    const category = localStorage.getItem('vd-proj-kategorija');
    let list = null;
    const naslov = $('#ime-kategorije');
    const naslovEng = $('#ime-kategorije-eng');
    const breadCrumbSrb = $(".srb.activeBreadCrumb");
    const breadCrumbEng = $(".eng.activeBreadCrumb");
    let searchQuery = localStorage.getItem('vd-proj-search');
    let lang = localStorage.getItem("vd-proj-lang");
    if (searchQuery !== null) {
        naslov.text('Pretraga');
        naslovEng.text('Search');
        breadCrumbSrb.text($(naslov).text());
        breadCrumbEng.text($(naslovEng).text());
        let titleText = lang === 'srb' ? 'Pretraga' : 'Search';
        $("title").text(`${titleText} | Xi-jajno`);
        searchQuery = osisajLatinicu(searchQuery);
        list = foodList.filter(food => osisajLatinicu(food.name).includes(searchQuery) ||
            osisajLatinicu(food.engName).includes(searchQuery));
    } else {
        switch (category) {
            case 'Predjela':
                list = predjela;
                naslov.text('Predjela');
                naslovEng.text('Appetizers');
                break;
            case 'Glavna jela':
                list = glavnaJela;
                naslov.text('Glavna jela');
                naslovEng.text('Main courses');
                break;
            case 'Dezerti':
                list = dezerti;
                naslov.text('Dezerti');
                naslovEng.text('Desserts');
                break;
            case 'Pića':
                list = pica;
                naslov.text('Pića');
                naslovEng.text('Drinks');
                break;
            default:
                console.log('Nema kategorije');
                break;
        }
        //$("title").text(naslov.text() + ' | Xi-jajno');
    }
    breadCrumbSrb.text($(naslov).text());
    breadCrumbEng.text($(naslovEng).text());
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
    showCorrectLanguage();
}

$(document).ready(function () {
    localStorage.setItem("vd-proj-sort", "name-asc");

    $("#predjela-sidebar").click(function () {
        localStorage.setItem("vd-proj-kategorija", "Predjela");
        localStorage.removeItem("vd-proj-search");
    });

    $("#glavnaJela-sidebar").click(function () {
        localStorage.setItem("vd-proj-kategorija", "Glavna jela");
        localStorage.removeItem("vd-proj-search");
    });

    $("#dezerti-sidebar").click(function () {
        localStorage.setItem("vd-proj-kategorija", "Dezerti");
        localStorage.removeItem("vd-proj-search");
    });

    $("#pica-sidebar").click(function () {
        localStorage.setItem("vd-proj-kategorija", "Pića");
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

    $(".card").on("click", function () {
        $('#dishModal').modal('show');
    })


    $('#dishModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var foodName = button.data('food-name'); // Extract info from data-* attributes
        var foodDesc = button.data('food-desc');
        var foodNameEng = button.data('food-name-eng');
        var foodDescEng = button.data('food-desc-eng');
        var foodPriceSmall = button.data('food-price');
        let foodAvgGrade = button.data('food-avg-grade');
        foodAvgGrade = parseFloat(foodAvgGrade);
        let coloredStars = Math.round(foodAvgGrade);

        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= coloredStars) {
                stars += '<span style="color: #e40319">&starf;</span>';
            } else {
                stars += '<span style="color: #e40319">&star;</span>';
            }
        }
        console.log(foodAvgGrade);
        stars+="&nbsp;"+foodAvgGrade.toFixed(1)+'/5';

        foodPriceSmall = parseFloat(foodPriceSmall);
        var foodPriceLarge = foodPriceSmall * 1.5;
        var modal = $(this);
        $("#portionNumber").val("1");
        $("#smallPortion").prop("checked", true);
        //modal.find('.modal-title').text(foodName);
        modal.find('#dishImage').attr('src', button.data('food-img'));
        modal.find('.dish-desc-srb').text(foodDesc);
        modal.find('.dish-desc-eng').text(foodDescEng);
        modal.find('.dish-name-srb').text(foodName);
        modal.find('.dish-name-eng').text(foodNameEng);
        modal.find('#smallPrice').text(foodPriceSmall.toFixed(2));
        modal.find('#largePrice').text(foodPriceLarge.toFixed(2));
        modal.find(".starsRating").html(stars);
    });

    $("#dodajUKorpu").click(function () {
        var dishName = $("#dishName").find("span.srb").text();
        var dishNameEng = $("#dishName").find("span.eng").text();
        var portionSize = $('input[name="portionSize"]:checked').val();
        var portionPrice = $("#" + portionSize + "Price").text();
        var portionNumber = $("#portionNumber").val();

        let orderItem = new OrderItem(dishName, portionNumber, portionSize, portionPrice, dishNameEng);
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
            if (!found) {
                cart.push(orderItem);
            }
        }
        sessionStorage.setItem("vd-proj-cart", JSON.stringify(cart));
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