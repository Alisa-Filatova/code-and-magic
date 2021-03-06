import { KEY_CODES, removeElementsByClass } from './utils';

/**
 * Game 
 */
var wizard = document.querySelector('.wizard');
var wizardParams = document.querySelector('.wizard_vector')
var clouds = document.querySelector('.clouds');
var description = document.querySelector('.demo__description');
var gameOver = document.querySelector('.demo__game-over');
var fireball = wizard.querySelector('.fireball');
var fireballCount = document.querySelector('.fireball__count');
var wizardName = document.querySelector('.wizard__name');
var userName = document.querySelector('.user-name');
var gameResult = document.querySelector('.fireball__result');
var enemy = document.querySelector('.dark-knight');

var DEMO_WIDTH = document.querySelector('.demo').offsetWidth;
var DEMO_HEIGHT = 210 + 'px';

var steps = 100;
var keyPress = 0;

var gameWin = ' и уничтожил Мордор! Гордись своей победой';
var gameLose = 'и спалил лес с эльфами! Ты проиграл';

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
    var fireballShot = null;
    
    if (event.keyCode == KEY_CODES.SHIFT 
        && setupWindowIsInvisible
        && descriptionIsInvisible 
        && galleryIsInvisible 
        && gameOverIsInvisible) {
        keyPress++;
        fireballCount.textContent = keyPress;
    }

    if (event.keyCode == KEY_CODES.SPACEBAR 
        && setupWindowIsInvisible  
        && gameOverIsInvisible) {
        event.preventDefault();
        
        description.classList.add('invisible');
        gameOver.classList.add('invisible');
        
        wizard.style.bottom = 2 + 'px';
        
        enemy.style.transition = 8 + 's';
        enemy.style.left = 200 + 'px';
        enemy.classList.add('float');
    }

    if (event.keyCode == KEY_CODES.ENTER 
        && galleryIsInvisible 
        && setupWindowIsInvisible) {
        event.preventDefault();
        
        keyPress = keyPress - fireballCount.textContent;
        fireballCount.textContent = keyPress;
        
        enemy.classList.remove('dark-knight_dead');
        enemy.style.transition = 0.3 + 's';
        enemy.style.left = -80 + 'px';
        
        gameResult.textContent = gameWin;
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
        
        if (positionLeft > DEMO_WIDTH) {
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
        
        wizard.style.bottom = DEMO_HEIGHT;
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
            enemy.classList.remove('float');
            enemy.style.transition = 0.3 + 's';
            
            if (gameResult.textContent === gameLose) {
                enemy.classList.remove('dark-knight_dead');
            } else {
                enemy.classList.add('dark-knight_dead');
            }

            removeElementsByClass('slide-out-left');
            removeElementsByClass('slide-out-right');

            wizardName.textContent = userName.textContent;
            gameOver.classList.remove('invisible');
        }, 3000);
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

        setTimeout(function () {
            enemy.classList.remove('float');
            enemy.style.transition = 0.3 + 's';

            removeElementsByClass('slide-out-left');
            removeElementsByClass('slide-out-right');

            wizardName.textContent = userName.textContent;
            gameResult.textContent = gameLose;
            gameOver.classList.remove('invisible');
        }, 1000);
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
