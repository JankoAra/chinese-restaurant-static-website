$(document).ready(function () {
    loadTemplates();
    setTimeout(() => {
        selectActiveNavigationItem();
        showCorrectLanguage();

        $("#srb").click(function () {
            event.preventDefault();
            let lang = localStorage.getItem("vd-proj-lang");
            if (lang === "srb") return;
            localStorage.setItem("vd-proj-lang", "srb");
            showCorrectLanguage();
            selectActiveNavigationItem();
        });

        $("#eng").click(function () {
            event.preventDefault();
            let lang = localStorage.getItem("vd-proj-lang");
            if (lang === "eng") return;
            localStorage.setItem("vd-proj-lang", "eng");
            showCorrectLanguage();
            selectActiveNavigationItem();
        });
        $("#menuBtn").click(function () {
            window.location.href = "/jelovnik.html";
        });
        $("#dostavaBtn").click(function () {
            window.location.href = "/jelovnik.html";
        });

        $("#predjela-link").click(function () {
            localStorage.setItem("vd-proj-kategorija", "Predjela");
            localStorage.removeItem("vd-proj-search");
        });

        $("#glavnaJela-link").click(function () {
            localStorage.setItem("vd-proj-kategorija", "Glavna jela");
            localStorage.removeItem("vd-proj-search");
        });

        $("#dezerti-link").click(function () {
            localStorage.setItem("vd-proj-kategorija", "Dezerti");
            localStorage.removeItem("vd-proj-search");
        });

        $("#pica-link").click(function () {
            localStorage.setItem("vd-proj-kategorija", "Pića");
            localStorage.removeItem("vd-proj-search");
        });

        $("#noviDezert").click(function () {
            localStorage.setItem("vd-proj-kategorija", "Dezerti");
            localStorage.removeItem("vd-proj-search");
        });
    }, 50);


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
            $("#trazi-text").attr("placeholder", "Pretrazite jelo po imenu...");
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

});