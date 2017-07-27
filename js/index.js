/**
 * Created by Alisa on 27.07.17.
 */

var $window = $(window);

$window.scroll(function() {
    var scrolled = $window.scrollTop();
    $('.clouds').css('background-position-x', -scrolled + 'px');
});

/**
 * DEMO
 */
$window.keydown(function(event) {
    var $wizard = $('.wizard');
    var $description = $('.demo__description');
    var $fireball = $('.fireball');
    var positionLeft = $wizard.position().left;
    var positionTop = $wizard.position().top;

    var right = 39;
    var left = 37;
    var top = 38;
    var bottom = 40;
    var spaceBar = 32;
    var shift = 16;

    var descriptionIsInvisible = $description.hasClass('invisible');

    if (event.keyCode == spaceBar) {
        event.preventDefault();

        $description.addClass('invisible');

        $wizard
            .css('bottom', 0)
            .removeClass('float');
    }

    // передвижения мага

    if (event.keyCode == right && descriptionIsInvisible) {
        event.preventDefault();

        if (positionLeft >= 700 || positionLeft <= -150) {
            return;
        }

        $wizard
            .css('transform', 'translateX(' + positionLeft + 'px)')
            .removeClass('wizard-reversed');

        $fireball.removeClass('fireball-reversed');
    }

    if (event.keyCode == left && descriptionIsInvisible) {
        event.preventDefault();


        if (positionLeft >= 700 || positionLeft <= -150) {
            return;
        }

        $wizard
            .css('transform', 'translateX(' + -positionLeft + 'px)')
            .addClass('wizard-reversed');

        $fireball.addClass('fireball-reversed');
    }

    if (event.keyCode == top && descriptionIsInvisible) {
        event.preventDefault();
        $wizard.css('transform', 'translateY(' + -positionTop + 'px)');
    }

    if (event.keyCode == bottom && descriptionIsInvisible) {
        event.preventDefault();
        $wizard.css('transform', 'translateY(0)');
    }

    // запуск фаербола

    if (event.keyCode == shift && descriptionIsInvisible && $wizard.hasClass('wizard-reversed')) {
        event.preventDefault();
        $fireball.addClass('slide-out-left');
    }

    if (event.keyCode == shift && descriptionIsInvisible) {
        event.preventDefault();
        $fireball.addClass('slide-out-right');
    }
});

$window.keyup(function(event) {
    var $wizard = $('.wizard');
    var $fireball = $('.fireball');
    var shift = 16;
    var descriptionIsInvisible = $('.demo__description').hasClass('invisible');

    if (event.keyCode == shift && descriptionIsInvisible && $wizard.hasClass('wizard-reversed')) {
        setTimeout(function() {
            $fireball.removeClass('slide-out-left');
        }, 500);
    }

    if (event.keyCode == shift && descriptionIsInvisible) {
        setTimeout(function() {
            $fireball.removeClass('slide-out-right');
        }, 500);
    }
});


var $imageBox = $('.photogallery-image');
var $overlay = $('.overlay-gallery');
var $close = $('.overlay-gallery-close');
var $current = $('.preview-number-current');
var $total = $('preview-number-total');
var currentStep = 1;
var $next = $('.overlay-gallery-control-right');
var $prev = $('.overlay-gallery-control-left');


$imageBox.on('click', function() {
    $overlay.removeClass('invisible');
    $total.text($('img[data-img]').length);
    currentStep = $(this).attr('data-img');
    $current.text(currentStep);
    $('.overlay-gallery-preview').append($(this).children('img'));
});

$close.on('click', function() {
    $overlay.addClass('invisible');
});

$next.on('click', function() {
    currentStep++;
    $current.text(currentStep);

    if (currentStep >= 6) {
        currentStep = 5;
    }
});

$next.on('click', function() {
    $('.overlay-gallery-preview').append($imageBox.children('img').next());
    currentStep++;
    $current.text(currentStep);

    if (currentStep > 6) {
        currentStep = 6;
    }
});

$prev.on('click', function() {
    currentStep--;
    $current.text(currentStep);

    if (currentStep <= 1) {
        currentStep = 1;
    }
});
