$(document).ready(function() {

    $('.to-order').click(function() {
        event.preventDefault();

	    $('html, body').animate({
	        scrollTop: $( $.attr(this, 'href') ).offset().top
	    }, 500);
    });

    $('.slider__list').slick({
        slidesToShow: 1,
        infinite: true,
        slidesToScroll: 1,
        arrows: false,
    });

    $('.order__label input').focus(function() {
        $(this).siblings('.order__label-hint').addClass('focused');
    });

    $('.order__label input').blur(function() {
        $(this).siblings('.order__label-hint').removeClass('focused');
    });

    $("#getting-started").countdown("2019/07/30", function(event) {
        $(this).text(event.strftime('%H:%M:%S'));
    });

});