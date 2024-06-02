$(document).ready(function () {
    setTimeout(() => {
        //selectActiveNavigationItem();
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
        $("#index_order_btn").click(function () {
            window.location.href = "/jelovnik.html";
        });
        $("#dostavaBtn").click(function () {
            window.location.href = "/jelovnik.html";
        });

        //klik na reklamu sa novim dezertom na index strani vodi do jelovnika sa dezertima
        $("#noviDezert").click(function () {
            localStorage.setItem("vd-proj-kategorija", "Dezerti");
            localStorage.removeItem("vd-proj-search");
        });

        //klik na karticu sa kategorijom jela na stranici jelovnik.html vodi do specificnog jelovnika
        $(".food-category-card").click(function () {
            localStorage.setItem("vd-proj-kategorija", $(this).data("category"));
            localStorage.removeItem("vd-proj-search");
            window.location.href = "/jelovnik-kategorija.html";
        });

        //klik na karticu sa najbolje ocenjenim jelima vodi do jelovnika sa kategorijom tog jela
        $(".index-food-card").on("click", function () {
            localStorage.setItem("vd-proj-kategorija", $(this).data("food-category"));
            localStorage.removeItem("vd-proj-search");
            window.location.href = "/jelovnik-kategorija.html";
        });
    }, 100);



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
    
    

});