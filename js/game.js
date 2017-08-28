/**
 * Game 
 */
(function() {
    var $window = $(window);
    var $wizard = $('.wizard');
    var $wizardSvg = $('.wizard-svg')
    var $clouds = $('.clouds');
    var $description = $('.demo__description');
    var $gameOver = $('.demo__game-over');
    var $fireball = $('.fireball');

    var demoWidth = $('.demo').width();
    var demoHeight = 210 + 'px';
    var steps = 100;

    // Скролл облаков

    $window.scroll(function(event) {
        var scrolled = $window.scrollTop();

        $clouds.css('background-position-x', -scrolled + 'px');
    });

    /**
     * DEMO
     */
    $window.keydown(function(event) {
        var positionLeft = $wizard.position().left;
        var descriptionIsInvisible = $description.hasClass('invisible');
        var galleryIsInvisible = $('.overlay-gallery').hasClass('invisible');
        var gameOverIsInvisible = $gameOver.hasClass('invisible');
        var setupWindowIsInvisible = $('.setup').hasClass('hidden');

        if (event.keyCode == KEY_CODES.SPACEBAR && setupWindowIsInvisible) {
            event.preventDefault();
            $description.addClass('invisible');
            $wizard.css('bottom', 1 + 'px');
        }

        // Передвижения мага

        if (event.keyCode == KEY_CODES.RIGHT 
            && descriptionIsInvisible 
            && galleryIsInvisible 
            && gameOverIsInvisible
            && setupWindowIsInvisible) {
            event.preventDefault();

            if (positionLeft > demoWidth) {
                return;
            }

            $wizardSvg.removeClass('wizard-reversed');
            $wizard.css({
                    left: positionLeft + steps + 'px',
                    transition: 0.3 + 's'
                });

            $fireball.removeClass('fireball-reversed');
        }

        if (event.keyCode == KEY_CODES.LEFT 
            && descriptionIsInvisible 
            && galleryIsInvisible 
            && gameOverIsInvisible
            && setupWindowIsInvisible) {
            event.preventDefault();

            if (positionLeft < 0) {
                return;
            }

            $wizardSvg.addClass('wizard-reversed');
            $wizard.css({
                    left: positionLeft - steps + 'px',
                    transition: 0.3 + 's'
                });

            $fireball.addClass('fireball-reversed');
        }

        if (event.keyCode == KEY_CODES.TOP 
            && descriptionIsInvisible 
            && galleryIsInvisible 
            && gameOverIsInvisible
            && setupWindowIsInvisible) {
            event.preventDefault();
            
            $wizard.css({
                bottom: demoHeight,
                transition: 0.3 + 's'
            });
        }

        if (event.keyCode == KEY_CODES.BOTTOM 
            && descriptionIsInvisible 
            && galleryIsInvisible 
            && gameOverIsInvisible
            && setupWindowIsInvisible) {
            event.preventDefault();
            
            $wizard.css({
                bottom: 0,
                transition: 0.3 + 's'
            });
        }

        // Запуск фаербола

        if (event.keyCode == KEY_CODES.SHIFT 
            && $wizardSvg.is('.wizard-reversed') 
            && descriptionIsInvisible 
            && galleryIsInvisible 
            && gameOverIsInvisible
            && setupWindowIsInvisible) {
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

        if (event.keyCode == KEY_CODES.SHIFT 
            && descriptionIsInvisible 
            && $wizardSvg.is(':not(.wizard-reversed)') 
            && galleryIsInvisible 
            && gameOverIsInvisible
            && setupWindowIsInvisible) {
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

        if (event.keyCode == KEY_CODES.TOP 
            && descriptionIsInvisible 
            && galleryIsInvisible) {
            event.preventDefault();
            
            $wizard.css({
                bottom: 0,
                transition: 1 +'s ease-in'
            });
        }
    });
})();

