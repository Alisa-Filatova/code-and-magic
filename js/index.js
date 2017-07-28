/**
 * Created by Alisa on 27.07.17.
 */

var $window = $(window);

// Скролл облаков

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

    // Передвижения мага

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

// Элементы галереи

var $imageSmall = $('.photogallery img');
var $imageBig = $('.overlay-gallery-preview img');
var $imageSmallBox = $('.photogallery-image');
var $imageBigBox = $('.overlay-gallery-preview');
var $overlay = $('.overlay-gallery');

// Навигация

var $closeGallery = $('.overlay-gallery-close');
var $next = $('.overlay-gallery-control-right');
var $prev = $('.overlay-gallery-control-left');
var $moreScreenShots = $('.btn_screenshots');

// Функция отображения кол-ва скриншотов

var $ImageCount = $imageSmall.clone();
var currentStep = 1;
var $currentBox = $('.preview-number-current');
var $totalBox = $('.preview-number-total');

function totalImages() {
    $totalBox.text($ImageCount.length);
}

// Кнопка "Больше скриншотов"

$moreScreenShots.on('click', function(event) {
    event.preventDefault();
    $(this).remove();
    $imageSmallBox.filter('.invisible').removeClass('invisible');
    totalImages();
});

// Открытие галереи по клику на картинку

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

// Перелистывание картинок вперед и назад

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

// Закрытие галереи по нажатию крестика

$closeGallery.on('click', function(event) {
    event.preventDefault();
    $imageBig.remove().siblings('img').remove();
    $overlay.addClass('invisible');
});

/**
 * Reviews
 */

var $moreReviews = $('.reviews-controls-more');
var $addReview = $('.reviews-controls-new');
var $review = $('.review');
var $reviewForm = $('.overlay-container');
var $closeForm = $('.review-form-close');

$moreReviews.on('click', function(event) {
    event.preventDefault();
    $(this).remove();
    $review.filter('.invisible').removeClass('invisible');
});

$addReview.on('click', function(event) {
    event.preventDefault();

    $reviewForm.removeClass('invisible');
});

$closeForm.on('click', function(event) {
    event.preventDefault();

    $reviewForm.addClass('invisible');
});

/**
 * Filter reviews
 */

var $filterAll = $('[for=reviews-all]');
var $filterGood = $('[for=reviews-good]');
var $filterBad = $('[for=reviews-bad]');
var $filterRecent = $('[for=reviews-recent]');
var $filterPopular = $('[for=reviews-popular]');

var $ratingBad = $('.review-rating[data-star=1], .review-rating[data-star=2], .review-rating[data-star=3]');
var $ratingGood = $('.review-rating[data-star=4], .review-rating[data-star=5]');

$filterGood.on('click', function(event) {
    event.preventDefault();

    $('#reviews-good').prop('checked', true);
    $ratingBad.closest($review).addClass('invisible');
    $ratingGood.closest($review).removeClass('invisible');
    $moreReviews.remove();
});

$filterBad.on('click', function(event) {
    event.preventDefault();

    $('#reviews-bad').prop('checked', true);
    $ratingGood.closest($review).addClass('invisible');
    $ratingBad.closest($review).removeClass('invisible');
    $moreReviews.remove();
});

$filterAll.on('click', function(event) {
    event.preventDefault();
    $('#reviews-all').prop('checked', true);
    $review.removeClass('invisible');
});

$filterRecent.on('click', function(event) {
    event.preventDefault();
    $('#reviews-recent').prop('checked', true);
    $moreReviews.remove();
});

$filterPopular.on('click', function(event) {
    event.preventDefault();
    $('#reviews-popular').prop('checked', true);
    $moreReviews.remove();
});







