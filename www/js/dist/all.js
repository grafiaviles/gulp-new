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