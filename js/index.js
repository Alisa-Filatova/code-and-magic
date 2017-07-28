/**
 * Created by Alisa on 27.07.17.
 */

var $window = $(window);

//скролл облаков

$window.scroll(function() {
    var scrolled = $window.scrollTop();
    var $clouds = $('.clouds');

    $clouds.css('background-position-x', -scrolled + 'px');
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

/**
 *ScreenShots Gallery
 */

// элементы галереи

var $imageSmall = $('.photogallery img');
var $imageBig = $('.overlay-gallery-preview img');
var $imageSmallBox = $('.photogallery-image');
var $imageBigBox = $('.overlay-gallery-preview');
var $overlay = $('.overlay-gallery');

// навигация

var $close = $('.overlay-gallery-close');
var $next = $('.overlay-gallery-control-right');
var $prev = $('.overlay-gallery-control-left');
var $moreScreenShots = $('.btn');

// функция отображения кол-ва скриншотов

var $ImageCount = $imageSmall.clone();
var currentStep = 1;
var $currentBox = $('.preview-number-current');
var $totalBox = $('.preview-number-total');

function totalImages() {
    $totalBox.text($ImageCount.length);
}

//кнопка "Больше скриншотов"

$moreScreenShots.on('click', function(event) {
    event.preventDefault();
    $(this).remove();
    $imageSmallBox.filter('.invisible').removeClass('invisible');
    totalImages();
});

//открытие галереи по клику на картинку

$imageSmallBox.on('click', function() {
    var $this = $(this);
    $overlay.removeClass('invisible');
    currentStep = $this.attr('data-img');
    $currentBox.text(currentStep);
    totalImages();
    $this.children('img')
        .clone()
        .appendTo($imageBigBox)
        .siblings('img')
        .remove();
});

//перелистывание картинок вперед и назад

$next.on('click', function() {
    currentStep++;
    $currentBox.text(currentStep);
    totalImages();
    $imageSmall
        .filter($('[data-img = ' + currentStep + ']'))
        .clone().appendTo($imageBigBox)
        .siblings('img')
        .remove();
    if (currentStep >= $totalBox.text()) {
        currentStep = $totalBox.text();
        $currentBox.text(currentStep);
    }
});

$prev.on('click', function() {
    currentStep--;
    $currentBox.text(currentStep);
    totalImages();
    $imageSmall
        .filter($('[data-img = ' + currentStep + ']'))
        .clone().appendTo($imageBigBox)
        .siblings('img')
        .remove();
    if (currentStep <= 1) {
        currentStep = 1;
        $currentBox.text(currentStep);
    }
});

//закрытие галереи по нажатию крестика

$close.on('click', function() {
    $imageBig.remove().siblings('img').remove();
    $overlay.addClass('invisible');
});


/**
 * Reviews Filter
 */

