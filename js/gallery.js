/**
 * ScreenShots Gallery
 */

// Элементы галереи
var $window = $(window);
var $imageSmall = $('.photogallery__image');
var $imageBig = $('.overlay-gallery-preview img');
var $imageSmallBox = $('.photogallery__image-box');
var $imageBigBox = $('.overlay-gallery__preview');
var $overlayGallery = $('.overlay-gallery');

// Навигация

var $closeGallery = $('.gallery__btn_close');
var $next = $('.overlay-gallery-control_right');
var $prev = $('.overlay-gallery-control_left');
var $moreScreenShots = $('.photogallery__btn');

// Функция отображения кол-ва скриншотов

var $ImageCount = $imageSmall.clone();
var currentStep = 1;
var $currentBox = $('.preview-number_current');
var $totalBox = $('.preview-number_total');

function totalImages() {
    $totalBox.text($ImageCount.length);
}

// Кнопка "Больше скриншотов"

$moreScreenShots.on('click', function(event) {
    event.preventDefault();
    $(this).remove();
    $imageSmallBox
        .filter('.invisible')
        .removeClass('invisible');
    totalImages();
});

// Открытие галереи по клику на картинку

$imageSmallBox.on('click', function(event) {
    event.preventDefault();
    var $this = $(this);
    $overlayGallery.removeClass('invisible');
    currentStep = $this.attr('data-img');
    $currentBox.text(currentStep);
    totalImages();
    $this
        .children('img')
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

$window.keydown(function() {

    var $checkOverlay = $overlayGallery.not('invisible');

    if (event.keyCode == KEY_CODES.RIGHT && $checkOverlay) {
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
    }

    if (event.keyCode == KEY_CODES.LEFT && $checkOverlay) {
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
    }

    // Закрытие галереи по нажатию esc

    if (event.keyCode == KEY_CODES.ESC && $checkOverlay) {
        $imageBig.remove().siblings('img').remove();
        $overlayGallery.addClass('invisible');
    }
});

// Закрытие галереи по нажатию крестика

$closeGallery.on('click', function(event) {
    event.preventDefault();
    $imageBig.remove().siblings('img').remove();
    $overlayGallery.addClass('invisible');
});

/**
 * Reviews
 */

var $moreReviews = $('.reviews__btn_more');
var $addReview = $('.reviews__btn_add');
var $reviewsList = $('.reviews-list');
var $reviewOverlay = $('.overlay-review-form');
var $closeForm = $('.review-form__btn_close');

$moreReviews.on('click', function(event) {
    event.preventDefault();

    var $review = $('.review');

    $(this).remove();
    $review
        .filter('.invisible')
        .removeClass('invisible');
});

$addReview.on('click', function(event) {
    event.preventDefault();

    $reviewOverlay.removeClass('invisible');
});

$closeForm.on('click', function(event) {
    event.preventDefault();

    $reviewOverlay.addClass('invisible');
});


$window.keydown(function() {
    if (event.keyCode == KEY_CODES.ESC && $reviewOverlay.not('invisible')) {
        $reviewOverlay.addClass('invisible');
    }
});
