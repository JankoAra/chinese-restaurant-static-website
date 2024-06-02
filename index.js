$(document).ready(function () {
    loadTemplates();
    let setLangRepeat = setInterval(() => {
        showCorrectLanguage();
    }, 10);
    setTimeout(() => {
        if (setLangRepeat) clearInterval(setLangRepeat);
    }, 1000);
    setTimeout(() => {
        selectActiveNavigationItem();
        //showCorrectLanguage();
        buildBestRatedFood(3);
        $("#srb").click(function () {
            event.preventDefault();
            let lang = localStorage.getItem("vd-proj-lang");
            if (lang === "srb") return;
            localStorage.setItem("vd-proj-lang", "srb");
            showCorrectLanguage();
            selectActiveNavigationItem();
            if ($("#navbarNav").hasClass("show")) $(".navbar-toggler").click();
        });

        $("#eng").click(function () {
            event.preventDefault();
            let lang = localStorage.getItem("vd-proj-lang");
            if (lang === "eng") return;
            localStorage.setItem("vd-proj-lang", "eng");
            showCorrectLanguage();
            selectActiveNavigationItem();
            if ($("#navbarNav").hasClass("show")) $(".navbar-toggler").click();
        });
        $("#menuBtn").click(function () {
            window.location.href = "/jelovnik.html";
        });
        $("#dostavaBtn").click(function () {
            window.location.href = "/jelovnik.html";
        });

        $("#noviDezert").click(function () {
            localStorage.setItem("vd-proj-kategorija", "Dezerti");
            localStorage.removeItem("vd-proj-search");
        });

        $(".food-category-card").click(function () {
            localStorage.setItem("vd-proj-kategorija", $(this).data("category"));
            localStorage.removeItem("vd-proj-search");
            window.location.href = "/jelovnik-kategorija.html";
        });

        $(".index-food-card").on("click", function () {
            localStorage.setItem("vd-proj-kategorija", $(this).data("food-category"));
            localStorage.removeItem("vd-proj-search");
            window.location.href = "/jelovnik-kategorija.html";
        });
    }, 90);



    function getBestRatedFood(n) {
        let bestRatedFood = [];
        let foodRatingsDictionary = JSON.parse(localStorage.getItem('vd-proj-food-grades'));

        for (const key in foodRatingsDictionary) {
            let sum = 0;
            for (let i = 0; i < foodRatingsDictionary[key].length; i++) {
                sum += foodRatingsDictionary[key][i];
            }
            let avg = sum / foodRatingsDictionary[key].length;
            bestRatedFood.push([key, avg]);
        }
        bestRatedFood.sort((a, b) => b[1] - a[1]);
        bestRatedFood = bestRatedFood.slice(0, n);
        console.log(bestRatedFood);
        return bestRatedFood;
    }
    function buildBestRatedFood(n) {
        let bestRatedFood = getBestRatedFood(n);
        let row = $("#bestRatedFoodCards");
        let foodList = JSON.parse(localStorage.getItem('vd-proj-food-list'));
        if(foodList === null) foodList = [];

        for (let i = 0; i < bestRatedFood.length; i++) {
            
            let foodName = bestRatedFood[i][0];
            let foodRating = bestRatedFood[i][1];

            let foodObj = foodList.find(food => food.name === foodName);
            foodObj.avgGrade = foodRating;
            console.log(foodObj);

            let col = buildFoodCard(foodObj);

            row.append(col);
        }
    }

    function buildFoodCard(food) {
        let nameSerbian = food.name;
        let nameEnglish = food.engName;
        let descSerbian = food.desc;
        let descEnglish = food.engDesc;
        let price = food.priceSmall.toFixed(2);
        let altText = nameSerbian + ' slika';
        let avgGrade = food.avgGrade;
        let coloredStars = Math.round(avgGrade);

        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= coloredStars) {
                stars += '<span style="color: #e40319">&starf;</span>';
            } else {
                stars += '<span style="color: #e40319">&star;</span>';
            }
        }
        stars += "&nbsp;" + avgGrade.toFixed(1) + '/5';
        console.log(avgGrade);
        
        return `
        <div class="col">
            <div class="card h-100 index-food-card" data-food-category="${food.category}">
                <div class="row g-1">
                    <div class="col-4 col-lg-12">
                        <img src="${food.imgPath}" class="img-fluid food-card-img" alt="${altText}">
                    </div>
                    <div class="col-8 col-lg-12">
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

    function osisajLatinicu(str) {
        str = str.toLowerCase();
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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



    function loadTemplates() {
        let elements = $(".template");
        elements.each(function () {
            $(this).load("templates/" + $(this).attr("id") + ".html");
        });
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

    initGradesInLocalStorage();
});