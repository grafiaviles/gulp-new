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

/* Sticky Menu */
var header = document.querySelector('.nav-indice');
var origOffsetY = header.offsetTop;

function onScroll(e) {
    window.scrollY >= origOffsetY ? header.classList.add('sticky') :
        header.classList.remove('sticky');
}
document.addEventListener('scroll', onScroll);