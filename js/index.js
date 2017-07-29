/**
 * Created by Alisa on 27.07.17.
 */

var $window = $(window);
var $wizard = $('.wizard');
var $clouds = $('.clouds');
var $description = $('.demo__description');
var $descriptionText = $('.demo__description_text');
var $fireball = $('.fireball');

var $demoWidth = $('.demo').width();
var demoHeight = 210 + 'px';

var steps = 100;

var keyCodes = {
    right: 39,
    left: 37,
    top: 38,
    bottom: 40,
    shift: 16,
    spaceBar: 32,
    esc: 27
};

// Скролл облаков

$window.scroll(function() {
    var scrolled = $window.scrollTop();

    $clouds.css('background-position-x', -scrolled + 'px');
});

/**
 * DEMO
 */
$window.keydown(function(event) {
    var $positionLeft = $wizard.position().left;

    var descriptionIsInvisible = $description.hasClass('invisible');
    var galleryIsInvisible = $('.overlay-gallery').hasClass('invisible');

    if (event.keyCode == keyCodes.spaceBar) {
        event.preventDefault();

        $description.addClass('invisible');

        $wizard
            .css('bottom', 0)
            .removeClass('float');
    }

    // Передвижения мага

    if (event.keyCode == keyCodes.right && descriptionIsInvisible && galleryIsInvisible) {
        event.preventDefault();

        if ($positionLeft > $demoWidth) {
            return;
        }

        $wizard.removeClass('wizard-reversed')
            .css({
                left: $positionLeft + steps + 'px',
                transition: 0.3 + 's'
            });

        $fireball.removeClass('fireball-reversed');
    }

    if (event.keyCode == keyCodes.left && descriptionIsInvisible && galleryIsInvisible) {
        event.preventDefault();

        if ($positionLeft < 0) {
            return;
        }

        $wizard.addClass('wizard-reversed')
            .css({
                left: $positionLeft - steps + 'px',
                transition: 0.3 + 's'
            });

        $fireball.addClass('fireball-reversed');
    }

    if (event.keyCode == keyCodes.top && descriptionIsInvisible && galleryIsInvisible) {
        event.preventDefault();
        $wizard.css({
            bottom: demoHeight,
            transition: 0.3 + 's'
        });
    }

    if (event.keyCode == keyCodes.bottom && descriptionIsInvisible && galleryIsInvisible) {
        event.preventDefault();
        $wizard.css({
            bottom: 0,
            transition: 0.3 + 's'
        });
    }

    // Запуск фаербола

    if (event.keyCode == keyCodes.shift && descriptionIsInvisible && $wizard.not('.wizard-reversed') && galleryIsInvisible) {
        event.preventDefault();
        $fireball
            .clone()
            .removeClass('fireball-reversed')
            .addClass('slide-out-right')
            .prependTo($wizard);

        $('.slide-out-left').remove();

        setTimeout(function() {
            $('.slide-out-right').remove();
            $descriptionText.text('Ты убил кого-то случайным фаерболом! Гордись своей победой жестокий человек! GAME OVER');
            $description.removeClass('invisible');
        }, 5000);
    }

    if (event.keyCode == keyCodes.shift && descriptionIsInvisible && $wizard.hasClass('wizard-reversed') && galleryIsInvisible) {
        event.preventDefault();
        $fireball
            .clone()
            .addClass('slide-out-left fireball-reversed')
            .prependTo($wizard);

        $('.slide-out-right').remove();

        setTimeout(function() {
            $('.slide-out-left').remove();
            $descriptionText.text('Ты убил кого-то случайным фаерболом! Гордись своей победой жестокий человек! GAME OVER');
            $description.removeClass('invisible');
        }, 5000);
    }
});

$window.keyup(function(event) {
    var descriptionIsInvisible = $description.hasClass('invisible');
    var galleryIsInvisible = $('.overlay-gallery').hasClass('invisible');

    if (event.keyCode == keyCodes.top && descriptionIsInvisible && galleryIsInvisible) {
        event.preventDefault();
        $wizard.css({
            bottom: 0,
            transition: 1 +'s ease-in'
        });
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
var $overlayGallery = $('.overlay-gallery');

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
    $imageSmallBox
        .filter('.invisible')
        .removeClass('invisible');
    totalImages();
});

// Открытие галереи по клику на картинку

$imageSmallBox.on('click', function() {
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

    if (event.keyCode == keyCodes.right && $checkOverlay) {
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

    if (event.keyCode == keyCodes.left && $checkOverlay) {
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

    if (event.keyCode == keyCodes.esc && $checkOverlay) {
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

var $moreReviews = $('.reviews-controls-more');
var $addReview = $('.reviews-controls-new');
var $review = $('.review');
var $reviewOverlay = $('.overlay-container');
var $closeForm = $('.review-form-close');

$moreReviews.on('click', function(event) {
    event.preventDefault();
    $(this).remove();
    $review.filter('.invisible').removeClass('invisible');
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
    if (event.keyCode == keyCodes.esc && $reviewForm.not('invisible')) {
        $reviewOverlay.addClass('invisible');
    }
});

/**
 * Filter reviews
 */

var $filterAll = $('[for=reviews-all]');
var $filterGood = $('[for=reviews-good]');
var $filterBad = $('[for=reviews-bad]');
var $filterRecent = $('[for=reviews-recent]');
var $filterPopular = $('[for=reviews-popular]');
var $filterAllRadio = $('#reviews-all');
var $filterGoodRadio = $('#reviews-good');
var $filterBadRadio = $('#reviews-bad');
var $filterRecentRadio = $('#reviews-recent');
var $filterPopularRadio = $('#reviews-popular');

var $ratingBad = $('.review-rating[data-star=1], .review-rating[data-star=2], .review-rating[data-star=3]');
var $ratingGood = $('.review-rating[data-star=4], .review-rating[data-star=5]');

$filterGood.on('click', function() {
    $filterGoodRadio.prop('checked', true);
    $ratingBad.closest($review).addClass('invisible');
    $ratingGood.closest($review).removeClass('invisible');
    $moreReviews.remove();
});

$filterBad.on('click', function() {
    $filterBadRadio.prop('checked', true);
    $ratingGood.closest($review).addClass('invisible');
    $ratingBad.closest($review).removeClass('invisible');
    $moreReviews.remove();
});

$filterAll.on('click', function() {
    $filterAllRadio.prop('checked', true);
    $review.removeClass('invisible');
});

$filterRecent.on('click', function() {
    $filterRecentRadio.prop('checked', true);
    $moreReviews.remove();
});

$filterPopular.on('click', function() {
    $filterPopularRadio.prop('checked', true);
    $moreReviews.remove();
});







