
/**
 * Game 
 */
(function() {
    var wizard = document.querySelector('.wizard');
    var wizardParams = document.querySelector('.wizard_vector')
    var clouds = document.querySelector('.clouds');
    var description = document.querySelector('.demo__description');
    var gameOver = document.querySelector('.demo__game-over');
    var fireball = wizard.querySelector('.fireball');
    var fireballCount = document.querySelector('.fireball__count');
    var wizardName = document.querySelector('.wizard__name');
    var userName = document.querySelector('.user-name');

    var demoWidth = document.querySelector('.demo').offsetWidth;
    var demoHeight = 210 + 'px';
    var steps = 100;
    var keyPress = 0;

    window.addEventListener('scroll', function(event) {
        var scrolled = window.scrollY;
        
        clouds.style.backgroundPositionX = -scrolled + 'px';
    });

    window.addEventListener('keydown', function(event) {
        var positionLeft = wizard.offsetLeft;
        var descriptionIsInvisible = description.classList.contains('invisible');
        var galleryIsInvisible = document.querySelector('.overlay-gallery').classList.contains('invisible');
        var gameOverIsInvisible = gameOver.classList.contains('invisible');
        var setupWindowIsInvisible = document.querySelector('.setup').classList.contains('hidden');
       
        if (event.keyCode == KEY_CODES.SHIFT 
            && setupWindowIsInvisible
            && descriptionIsInvisible 
            && galleryIsInvisible 
            && gameOverIsInvisible) {
            keyPress++;
            fireballCount.textContent = keyPress;
        }

        if (event.keyCode == KEY_CODES.SPACEBAR && setupWindowIsInvisible) {
            event.preventDefault();
            description.classList.add('invisible');
            gameOver.classList.add('invisible');
            wizard.style.bottom = 2 + 'px';
        }

        if (event.keyCode == KEY_CODES.ENTER 
            && galleryIsInvisible 
            && setupWindowIsInvisible) {
            event.preventDefault();
            keyPress = keyPress - fireballCount.textContent;
            fireballCount.textContent = keyPress;
            gameOver.classList.add('invisible');
            description.classList.remove('invisible');
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

            wizardParams.classList.remove('wizard-reversed');
            wizard.style.left = positionLeft + steps + 'px';
            wizard.style.transition = 0.3 + 's';

            fireball.classList.remove('fireball-reversed');
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

            wizardParams.classList.add('wizard-reversed');
            wizard.style.left = positionLeft - steps + 'px';
            wizard.style.transition = 0.3 + 's';

            fireball.classList.add('fireball-reversed');
        }

        if (event.keyCode == KEY_CODES.TOP 
            && descriptionIsInvisible 
            && galleryIsInvisible 
            && gameOverIsInvisible
            && setupWindowIsInvisible) {
            event.preventDefault();
            
            wizard.style.bottom = demoHeight;
            wizard.style.transition = 0.3 + 's';
        }

        if (event.keyCode == KEY_CODES.BOTTOM 
            && descriptionIsInvisible 
            && galleryIsInvisible 
            && gameOverIsInvisible
            && setupWindowIsInvisible) {
            event.preventDefault();
            
            wizard.style.bottom = 0;
            wizard.style.transition = 0.3 + 's';
        }

        // Запуск фаербола
      
        if (event.keyCode == KEY_CODES.SHIFT 
            && wizardParams.classList.contains('wizard-reversed') 
            && descriptionIsInvisible 
            && galleryIsInvisible 
            && gameOverIsInvisible
            && setupWindowIsInvisible) {
            event.preventDefault();

            fireballShot = fireball.cloneNode(true);
            fireballShot.classList.add('slide-out-left');
            fireballShot.classList.add('fireball-reversed');
            wizard.appendChild(fireballShot);

            setTimeout(function () {
                removeElementsByClass('slide-out-left');
                removeElementsByClass('slide-out-right');
                wizardName.textContent = userName.textContent;
                gameOver.classList.remove('invisible');
            }, 6000);
        }

        if (event.keyCode == KEY_CODES.SHIFT 
            && descriptionIsInvisible 
            && wizardParams.classList.contains('wizard-reversed') === false
            && galleryIsInvisible 
            && gameOverIsInvisible
            && setupWindowIsInvisible) {
            event.preventDefault();

            fireballShot = fireball.cloneNode(true);
            fireballShot.classList.remove('fireball-reversed');
            fireballShot.classList.remove('slide-out-left');
            fireballShot.classList.add('slide-out-right');
            wizard.appendChild(fireballShot);
        }

    });

    window.addEventListener('keyup', function(event) {
        var descriptionIsInvisible = description.classList.contains('invisible');
        var galleryIsInvisible = document.querySelector('.overlay-gallery').classList.contains('invisible');

        if (event.keyCode == KEY_CODES.TOP 
            && descriptionIsInvisible 
            && galleryIsInvisible) {
            event.preventDefault();
            
            wizard.style.bottom = 2 + 'px';
            wizard.style.transition = 1 +'s ease-in';
        }
    });
})();

