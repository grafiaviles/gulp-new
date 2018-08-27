/* Your Javascript */
$(document).ready(function() {
    $('.mobile').click(function() {
        $('nav').toggleClass('active');
    });

    $('nav ul li ul').each(function() {
        $(this).before('<span class=\"arrow\"></span>');
    });

    $('nav ul li').click(function() {
        $(this).children('ul').toggleClass('active');
        $(this).children('.arrow').toggleClass('rotate');
    });
});

//Hamburger
var forEach = function(t, o, r) {
    if ("[object Object]" === Object.prototype.toString.call(t))
        for (var c in t) Object.prototype.hasOwnProperty.call(t, c) && o.call(r, t[c], c, t);
    else
        for (var e = 0, l = t.length; l > e; e++) o.call(r, t[e], e, t)
};

var hamburgers = document.querySelectorAll(".hamburger");
if (hamburgers.length > 0) {
    forEach(hamburgers, function(hamburger) {
        hamburger.addEventListener("click", function() {
            this.classList.toggle("is-active");
        }, false);
    });
};

//Scroll Animation
$("a").on('click', function(event) {

    if (this.hash !== "") {
        event.preventDefault();

        var hash = this.hash;

        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800, function() {

            window.location.hash = hash;
        });
    }
});

//Paralax Header
$(document).ready(function() {
    var moving__background = $(".header__background");
    $(window).scroll(function() {
        moving__background.css('margin-top', ($(window).scrollTop()) / 3); // Parallax scrolling
        moving__background.css('opacity', 1 - ($(window).scrollTop()) / moving__background.height()); // Fading out
    });
});