$(document).ready(function () {
    loadTemplates();
    setTimeout(() => {
        selectActiveNavigationItem();
    }, 30);

    //addFooter();

    $("#menuBtn").click(function () {
        window.location.href = "/jelovnik.html";
    });
    $("#dostavaBtn").click(function () {
        window.location.href = "/jelovnik.html";
    });

    $("#predjela-link").click(function () {
        localStorage.setItem("vd-proj-kategorija", "predjela");
    });

    $("#glavnaJela-link").click(function () {
        localStorage.setItem("vd-proj-kategorija", "glavna jela");
    });

    $("#dezerti-link").click(function () {
        localStorage.setItem("vd-proj-kategorija", "dezerti");
    });

    $("#pica-link").click(function () {
        localStorage.setItem("vd-proj-kategorija", "pica");
    });

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
    }

    function addFooter() {
        let footerHTML = `<footer class="text-center bg-dark text-light">
        <p class="my-0">&copy; Copyright 2024, Janko Aranđelović<br>
            Odsek za softversko inženjerstvo Elektrotehničkog fakulteta Univerziteta u Beogradu.</p>
        </footer>`;
        $("body").append(footerHTML);
    }
});