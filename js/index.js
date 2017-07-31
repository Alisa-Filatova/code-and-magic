/**
 * Created by Alisa on 27.07.17.
 */

var $window = $(window);
var $wizard = $('.wizard');
var $clouds = $('.clouds');
var $description = $('.demo__description');
var $gameOver = $('.demo__game-over');
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
    var gameOverIsInvisible = $gameOver.hasClass('invisible');

    if (event.keyCode == keyCodes.spaceBar) {
        event.preventDefault();

        $description.addClass('invisible');
        $wizard.css('bottom', 1 + 'px');
    }

    // Передвижения мага

    if (event.keyCode == keyCodes.right && descriptionIsInvisible && galleryIsInvisible && gameOverIsInvisible) {
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

    if (event.keyCode == keyCodes.left && descriptionIsInvisible && galleryIsInvisible && gameOverIsInvisible) {
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

    if (event.keyCode == keyCodes.top && descriptionIsInvisible && galleryIsInvisible && gameOverIsInvisible) {
        event.preventDefault();
        $wizard.css({
            bottom: demoHeight,
            transition: 0.3 + 's'
        });
    }

    if (event.keyCode == keyCodes.bottom && descriptionIsInvisible && galleryIsInvisible && gameOverIsInvisible) {
        event.preventDefault();
        $wizard.css({
            bottom: 0,
            transition: 0.3 + 's'
        });
    }

    // Запуск фаербола

    if (event.keyCode == keyCodes.shift && $wizard.is('.wizard-reversed') && descriptionIsInvisible && galleryIsInvisible && gameOverIsInvisible) {
        event.preventDefault();

        $fireball
            .clone()
            .addClass('slide-out-left fireball-reversed')
            .prependTo($wizard);

        setTimeout(function () {
            $('.slide-out-left').remove();
            $('.slide-out-right').remove();
            $gameOver.removeClass('invisible')
        }, 6000);
    }

    if (event.keyCode == keyCodes.shift && descriptionIsInvisible && $wizard.is(':not(.wizard-reversed)') && galleryIsInvisible && gameOverIsInvisible ) {
        event.preventDefault();

        $fireball
            .clone()
            .removeClass('fireball-reversed slide-out-left')
            .addClass('slide-out-right')
            .prependTo($wizard);
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
 * ScreenShots Gallery
 */

// Элементы галереи

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

var $moreReviews = $('.reviews__btn_more');
var $addReview = $('.reviews__btn_add');
var $reviewsList = $('.reviews-list');
var $reviewOverlay = $('.overlay-review-form');
var $closeForm = $('.review-form__btn_close');

$moreReviews.on('click', function(event) {
    var $review = $('.review');
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
    if (event.keyCode == keyCodes.esc && $reviewOverlay.not('invisible')) {
        $reviewOverlay.addClass('invisible');
    }
});

/**
 * Review Form
 */

var $reviewSubmitBtn = $('.review__btn_submit');


$reviewSubmitBtn.on('click', function() {
    var $ratingValue = $('.review-form__group_mark input[type=radio]:checked');
    var $nameValue = $('#review-name');
    var $reviewText = $('#review-text');

    var $reviewFirst = $('.review:first');

    $reviewFirst.clone().prependTo($reviewsList);

    var $reviewRatingFirst = $('.review__rating:first');
    var $reviewAuthorFirst = $('.review__author:first');
    var $reviewTextFirst = $('.review__text:first');
    var $answerYes = $('.review__quiz-answer_yes:first');
    var $answerNo = $('.review__quiz-answer_no:first');

    $reviewTextFirst.text($reviewText.val());
    $reviewAuthorFirst.attr('alt', $nameValue.val());
    $reviewRatingFirst.attr('data-like', $ratingValue.val());
    $answerYes.addClass('new');
    $answerNo.addClass('new');


    if($reviewRatingFirst.attr('data-like') <= 3) {
        $reviewAuthorFirst.attr('src', 'img/new-review-bad.jpg');
    }

    if($reviewRatingFirst.attr('data-like') > 3) {
        $reviewAuthorFirst.attr('src', 'img/new-review-good.jpg');
    }


    $reviewOverlay.addClass('invisible');

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

$filterGood.on('click', function() {
    var $ratingBad = $('.review__rating[data-like=1], .review__rating[data-like=2], .review__rating[data-like=3]');
    var $ratingGood = $('.review__rating[data-like=4], .review__rating[data-like=5]');

    $filterGoodRadio.prop('checked', true);

    var $review = $('.review');

    $reviewsList.find($ratingBad).closest($review).addClass('invisible');
    $reviewsList.find($ratingGood).closest($review).removeClass('invisible');
    $moreReviews.remove();
});

$filterBad.on('click', function() {
    var $ratingBad = $('.review__rating[data-like=1], .review__rating[data-like=2], .review__rating[data-like=3]');
    var $ratingGood = $('.review__rating[data-like=4], .review__rating[data-like=5]');

    $filterBadRadio.prop('checked', true);

    var $review = $('.review');

    $reviewsList.find($ratingGood).closest($review).addClass('invisible');
    $reviewsList.find($ratingBad).closest($review).removeClass('invisible');
    $moreReviews.remove();
});

$filterAll.on('click', function() {
    $filterAllRadio.prop('checked', true);
    $reviewsList.find($('.review')).removeClass('invisible');
});

$filterRecent.on('click', function() {
    $filterRecentRadio.prop('checked', true);
    $moreReviews.remove();

    $reviewsList.find($('.review')).addClass('invisible');
    $reviewsList.find($('.new')).removeClass('invisible');
});

$filterPopular.on('click', function() {
    $filterPopularRadio.prop('checked', true);
    $moreReviews.remove();

    $reviewsList.find($('.review')).addClass('invisible');
    $reviewsList.find($('.popular')).removeClass('invisible');
});




$reviewsList.on('click', '.review__quiz-answer', function() {
    var $this = $(this);

    if ($this.hasClass('review__quiz-answer_yes')) {
        $this.addClass('review__quiz-answer_check');
        $this.closest('.review').addClass('popular');
    } else {
        $this.addClass('review__quiz-answer_check');
    }

});
