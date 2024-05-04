$(document).ready(function () {
    loadTemplates();
    setTimeout(() => {
        selectActiveNavigationItem();
    }, 30);

    addFooter();

    $("#menuBtn").click(function () {
        window.location.href = "/jelovnik.html";
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
        //console.log(path);
        if (path === '/') {
            path = '/index.html';
        }
        elements.each(function () {
            if ($(this).attr("href") === path) {
                $(this).addClass("active");
            }
        });
    }

    function addFooter() {
        let footerHTML = `<footer class="text-center">
        <p class="my-0">&copy; Copyright 2024, Janko Aranđelović<br>
            Odsek za softversko inženjerstvo Elektrotehničkog fakulteta Univerziteta u Beogradu.</p>
        </footer>`;
        $("body").append(footerHTML);
    }
});