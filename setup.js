class FoodSetup {
    constructor(name, imgPath, price, desc, engName, engDesc) {
        this.name = name;
        this.imgPath = imgPath;
        this.priceSmall = price;
        this.desc = desc;
        this.priceLarge = this.priceSmall * 1.5;
        this.engName = engName;
        this.engDesc = engDesc;
        this.category = "Nema kategorije";
    }
}


function setFoodListInStorage() {
    let foodList = [];

    //predjela
    let predjela = [];
    predjela.push(new FoodSetup('Hladan krastavac', 'hrana-images/hladan-krastavac.jpg', 390, 'Salata sa krastavcem i sirćetom',
        'Cold Cucumber', 'Salad with cucumber and vinegar'));
    predjela.push(new FoodSetup('Salata od gljiva', 'hrana-images/salata-od-gljiva.jpg', 480, 'Salata od kineskih pečuraka',
        'Mushroom Salad', 'Chinese mushroom salad'));
    predjela.push(new FoodSetup('Voćna salata', 'hrana-images/vocna-salata.jpg', 490, 'Salata od sezonskog voća',
        'Fruit Salad', 'Seasonal fruit salad'));
    predjela.push(new FoodSetup('Ljuto-kisela supa', 'hrana-images/ljuto-kisela-supa.jpg', 260, 'Ljuto-kisela supa sa pečurkama',
        'Spicy and Sour Soup', 'Spicy and sour soup with mushrooms'));

    predjela.forEach((food) => food.category = "Predjela");

    //glavna jela
    let glavnaJela = [];
    glavnaJela.push(new FoodSetup('Pileći prženi rezanci', 'hrana-images/pileci-przeni-rezanci.jpg', 500, 'Piletina sa rezancima u slatko-kiselom sosu',
        'Chicken Fried Noodles', 'Chicken with noodles in sweet and sour sauce'));
    glavnaJela.push(new FoodSetup('Knedle od škampa', 'hrana-images/knedle-od-skampa.jpg', 990, 'Porcija kineskih knedli punjenih škampima',
        'Shrimp Dumplings', 'Chinese dumplings filled with shrimp'));
    glavnaJela.push(new FoodSetup('Pirinač', 'hrana-images/pirinac.jpg', 150, 'Kuvani beli pirinač',
        'Rice', 'Boiled white rice'));

    glavnaJela.forEach((food) => food.category = "Glavna jela");

    //pića
    let pica = [];
    pica.push(new FoodSetup('Bubble tea', 'hrana-images/bubble-tea.jpg', 250, 'Mlečni čaj sa kuglicama tapioke',
        'Bubble Tea', 'Milk tea with tapioca balls'));
    pica.push(new FoodSetup('Mleko od kikirikija', 'hrana-images/mleko-od-kikirikija.jpg', 200, 'Mleko od kikirikija',
        'Peanut Milk', 'Peanut milk'));
    pica.push(new FoodSetup('Kineski čaj', 'hrana-images/kineski-caj.jpg', 190, 'Originalni kineski čaj spremljen na tradicionalan način',
        'Chinese Tea', 'Original Chinese tea prepared in a traditional way'));

    pica.forEach((food) => food.category = "Pića");
    //dezerti
    let dezerti = [];
    dezerti.push(new FoodSetup('Pohovana banana', 'hrana-images/pohovana-banana.jpg', 400, 'Pohovana banana sa prelivom',
        'Fried Banana', 'Fried banana with topping'));
    dezerti.push(new FoodSetup('Pohovani ananas', 'hrana-images/pohovani-ananas.jpg', 400, 'Pohovani ananas sa prelivom',
        'Fried Pineapple', 'Fried pineapple with topping'));
    dezerti.push(new FoodSetup('Pohovana čokolada', 'hrana-images/pohovana-cokolada.jpg', 400, 'Pohovana čokolada sa prelivom',
        'Fried Chocolate', 'Fried chocolate with topping'));

    dezerti.forEach((food) => food.category = "Dezerti");


    foodList.push(...predjela, ...glavnaJela, ...pica, ...dezerti);

    localStorage.setItem('vd-proj-food-list', JSON.stringify(foodList));
}

function setLanguageInStorage() {
    localStorage.setItem('vd-proj-lang', "srb");
}

function setCategoryInStorage() {
    localStorage.setItem('vd-proj-kategorija', "Predjela");
}

function setDefaultSortInStorage() {
    localStorage.setItem('vd-proj-sort', "name-asc");
}

function initGradesInLocalStorage() {
    if (localStorage.getItem('vd-proj-food-grades') === null) {
        let grades = {};
        for (const key in foodNamesDictionary) {
            grades[key] = [];
            for (let i = 0; i < 5; i++) {
                grades[key].push(Math.floor(Math.random() * 5) + 1);
            }
        }
        if (localStorage.getItem('vd-proj-previous-orders') !== null) {
            let previousOrders = JSON.parse(localStorage.getItem('vd-proj-previous-orders'));
            for (const order of previousOrders) {
                for (const key in order["grades"]) {
                    let grade = order["grades"][key];
                    if (grade > 0) {
                        grades[key].push(grade);
                    }
                }
            }
        }
        localStorage.setItem('vd-proj-food-grades', JSON.stringify(grades));
    }
}

function selectActiveNavigationItem() {
    let elements = $(".nav-link");
    let path = window.location.pathname;
    if (path === '/') {
        path = '/index.html';
    }
    else if (path === '/jelovnik-kategorija.html') {
        path = '/jelovnik.html';
    }
    elements.each(function () {
        if ($(this).attr("href") === path) {
            $(this).addClass("active");
        }
    });

    let lang = localStorage.getItem("vd-proj-lang");
    if (lang === null || (lang !== "eng" && lang !== "srb")) {
        lang = "srb";
        localStorage.setItem("vd-proj-lang", "srb");
    }
    if (lang === "srb") {
        $("#srb").addClass("active");
        $("#eng").removeClass("active");
    }
    else if (lang === "eng") {
        $("#eng").addClass("active");
        $("#srb").removeClass("active");
    }
}

function loadTemplates() {
    let elements = $(".template");
    elements.each(function () {
        $(this).load("templates/" + $(this).attr("id") + ".html");
    });
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

    //placeholder za search
    if (lang === "srb") {
        $("#trazi-text").attr("placeholder", "Pretražite jelo po imenu...");
    } else if (lang === "eng") {
        $("#trazi-text").attr("placeholder", "Search for food by name...");
    }
    //opcije za sortiranje
    let options = document.querySelectorAll('#sortiranje option');
    if (lang === 'srb') {
        options.forEach(option => {
            option.textContent = sortingOptionsLanguage['srb'][option.value];
        });
    } else if (lang === 'eng') {
        options.forEach(option => {
            option.textContent = sortingOptionsLanguage['eng'][option.value];
        });
    }

    //naslov stranice
    let path = window.location.pathname;
    if (path === '/') {
        path = '/index.html';
    }
    else if (path === '/jelovnik-kategorija.html') {
        path = localStorage.getItem('vd-proj-kategorija');
    }
    if (lang === 'srb') {
        document.title = pageTitles['srb'][path];
    }
    else if (lang === 'eng') {
        document.title = pageTitles['eng'][path];
    }
    document.title = document.title + " | Xi-jajno";

}

const pageTitles = {
    'srb': {
        '/index.html': "Početna",
        '/jelovnik.html': "Jelovnik",
        '/jelovnik-kategorija.html': "Jelovnik",
        '/galerija.html': "Galerija",
        '/o-nama.html': "O nama",
        '/moj-nalog.html': "Moj nalog",
        'Predjela': "Predjela",
        'Glavna jela': "Glavna jela",
        'Dezerti': "Dezerti",
        'Pića': "Pića"
    },
    'eng': {
        '/index.html': "Home",
        '/jelovnik.html': "Menu",
        '/jelovnik-kategorija.html': "Menu",
        '/galerija.html': "Gallery",
        '/o-nama.html': "About us",
        '/moj-nalog.html': "My account",
        'Predjela': "Appetizers",
        'Glavna jela': "Main courses",
        'Dezerti': "Desserts",
        'Pića': "Drinks"
    }
}

const sortingOptionsLanguage = {
    'srb': {
        'name-asc': 'Imenu rastuće',
        'name-desc': 'Imenu opadajuće',
        'price-asc': 'Ceni rastuće',
        'price-desc': 'Ceni opadajuće'
    },
    'eng': {
        'name-asc': 'Name ascending',
        'name-desc': 'Name descending',
        'price-asc': 'Price ascending',
        'price-desc': 'Price descending'
    }
}

const foodNamesDictionary = {
    'Hladan krastavac': 'Cold Cucumber',
    'Salata od gljiva': 'Mushroom Salad',
    'Voćna salata': 'Fruit Salad',
    'Ljuto-kisela supa': 'Spicy and Sour Soup',
    'Pileći prženi rezanci': 'Chicken Fried Noodles',
    'Knedle od škampa': 'Shrimp Dumplings',
    'Pirinač': 'Rice',
    'Bubble tea': 'Bubble Tea',
    'Mleko od kikirikija': 'Peanut Milk',
    'Kineski čaj': 'Chinese Tea',
    'Pohovana banana': 'Fried Banana',
    'Pohovani ananas': 'Fried Pineapple',
    'Pohovana čokolada': 'Fried Chocolate'
};

$(document).ready(function () {
    loadTemplates();
    let endTime = Date.now() + 2000;
    //pocetno podesavanje localStorage, izvrsava se na svakih 50ms tokom 2s da bi se sigurno primenile promene
    let setupInterval = setInterval(() => {
        if (Date.now() >= endTime) {
            clearInterval(setupInterval);
        } else {
            setFoodListInStorage();
            initGradesInLocalStorage();
            if (localStorage.getItem('vd-proj-lang') === null) {
                setLanguageInStorage();
            }
            if (localStorage.getItem('vd-proj-kategorija') === null) {
                setCategoryInStorage();
            }
            if (localStorage.getItem('vd-proj-sort') === null) {
                setDefaultSortInStorage();
            }
            selectActiveNavigationItem();
            showCorrectLanguage();
        }
    }, 50);
});

