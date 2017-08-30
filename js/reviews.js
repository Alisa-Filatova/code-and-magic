// Reviews

(function() {
    var URL = 'data/reviews.json';
    var REVIEWS_START = 4;
    
    var $window = $(window);
    var $reviewsList = $('.reviews-list');
    
    /**
     * Создает разметку отзыва
     *
     * @param {Object} item 
     * @return {String}
     */
    function createItemHtml(item) {
        return (
            '<article class="review ' + (item.new ? 'new' : '') + '">' +
                '<img src="' + item.avatar + '" class="review__author" alt="' + item.author + '">' +
                '<span class="review__rating" data-like="' + item.rate + '"></span>' +
                '<p class="review__text">' + item.review + '</p>' +
                '<div class="review__quiz">Полезный отзыв?' +
                    '<button class="review__quiz-answer review__quiz-answer_yes">Да</button>' +
                    '<button class="review__quiz-answer review__quiz-answer_no">Нет</button>' +
                '</div>' +
            '</article>'
        );
    }

    // Стартовая загрузка отзывов

    $(function() {
        $.getJSON(URL).done(function(data) {
            
            $.each(data.slice(0, REVIEWS_START), function(index, item) {
                var itemHtml = createItemHtml(item);
                $reviewsList.append(itemHtml);
            });
        }).fail(function() { 
            alert('Ошибка загрузки!'); 
        })
    });

    var $allReviews = $('.reviews__btn_more');
    var $addReview = $('.reviews__btn_add');
    var $reviewsList = $('.reviews-list');
    var $reviewOverlay = $('.overlay-review-form');
    var $closeForm = $('.review-form__btn_close');

    $allReviews.on('click', function(event) {
        event.preventDefault();
            
        $(this).remove();

        $.getJSON(URL).done(function(data) {
                var reviewsAll = data.lengtn;
                $.each(data.slice(4, reviewsAll), function(index, item) {
                    var itemHtml = createItemHtml(item);
                    $reviewsList.append(itemHtml);
                });
            }).fail(function() { 
                alert('Ошибка загрузки!'); 
        })
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

    /**
    * Review Form
    */

    $('.review-form').on('submit', function(event) {
        event.preventDefault();

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


        if ($reviewRatingFirst.attr('data-like') <= 3) {
            $reviewAuthorFirst.attr('src', 'img/avatars/new-review-bad.jpg');
        }

        if ($reviewRatingFirst.attr('data-like') > 3) {
            $reviewAuthorFirst.attr('src', 'img/avatars/new-review-good.jpg');
        }

        $reviewOverlay.addClass('invisible');
        $nameValue.val('');
        $reviewText.val('');
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

        $reviewsList
            .find($ratingBad)
            .closest($review)
            .addClass('invisible');
        $reviewsList
            .find($ratingGood)
            .closest($review)
            .removeClass('invisible');

        $allReviews.hide();
        $addReview.hide();
    });

    $filterBad.on('click', function() {
        var $ratingBad = $('.review__rating[data-like=1], .review__rating[data-like=2], .review__rating[data-like=3]');
        var $ratingGood = $('.review__rating[data-like=4], .review__rating[data-like=5]');

        $filterBadRadio.prop('checked', true);

        var $review = $('.review');

            $reviewsList
                .find($ratingGood)
                .closest($review)
                .addClass('invisible');
            $reviewsList
                .find($ratingBad)
                .closest($review)
                .removeClass('invisible');

        $allReviews.hide();
        $addReview.hide();
    });

    $filterAll.on('click', function() {
        $filterAllRadio.prop('checked', true);

        $reviewsList
            .find('.review')
            .removeClass('invisible');

        $addReview.show();
        $allReviews.show(); 
    });

    $filterRecent.on('click', function() {
        $filterRecentRadio.prop('checked', true);

        $reviewsList
            .find($('.review'))
            .addClass('invisible');
        $reviewsList
            .find('.new')
            .removeClass('invisible');

        $allReviews.hide();
        $addReview.hide();
    });

    $filterPopular.on('click', function() {
        $filterPopularRadio.prop('checked', true);

        $reviewsList
            .find('.review')
            .addClass('invisible');
        $reviewsList
            .find('.popular')
            .removeClass('invisible');

        $allReviews.hide();
        $addReview.hide();
    });

    // Кнопки полезный отзыв (да/нет)

    $reviewsList.on('click', '.review__quiz-answer', function() {
        var $this = $(this);

        if ($this.hasClass('review__quiz-answer_yes')) {
            $this.addClass('review__quiz-answer_check');
            $this.closest('.review').addClass('popular');
        } else {
            $this.addClass('review__quiz-answer_check');
        }
    });
})();