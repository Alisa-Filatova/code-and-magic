/**
 * ScreenShots Gallery
 */

var gallery = document.querySelector('.photogallery');
var imageBigBox = document.querySelector('.overlay-gallery__preview');
var imageSmall = document.querySelectorAll('.photogallery__image');
var imageBig = imageBigBox.querySelector('img');
var imageSmallBox = document.querySelector('.photogallery__image-box');

var overlayGallery = document.querySelector('.overlay-gallery');

// Навигация

var closeGallery = document.querySelector('.gallery__btn_close');
var next = document.querySelector('.overlay-gallery-control_right');
var prev = document.querySelector('.overlay-gallery-control_left');
var moreScreenShots = document.querySelector('.photogallery__btn');
var totalBox = document.querySelector('.preview-number_total');

var currentStep = 1;
var currentBox = document.querySelector('.preview-number_current');

// Функция отображения кол-ва скриншотов

function totalImages() {
    totalBox.textContent = imageSmall.length;
}

moreScreenShots.addEventListener('click', function(event) {
    event.preventDefault();
    var imageSmallBox = document.querySelectorAll('.photogallery__image-box');

    for (var i = 0; i < imageSmallBox.length; i++) {
        imageSmallBox[i].classList.remove('invisible');
    }
    
    this.classList.add('invisible');
    
    totalImages();
});

gallery.addEventListener('click', function(event) {
    event.preventDefault();
    if (event.target.className.toLowerCase() === 'photogallery__image') {
        var openItem = event.target;
        
        overlayGallery.classList.remove('invisible');
        
        currentStep = openItem.getAttribute('data-img');
        currentBox.textContent = currentStep;
        
        totalImages();
        
        var cloneImage = openItem.cloneNode(true);
        imageBigBox.appendChild(cloneImage);
    }
});

// Перелистывание картинок вперед и назад

next.addEventListener('click', function() {
    if (currentStep >= totalBox.textContent) {
        currentStep = totalBox.textContent;
        currentBox.textContent = currentStep;
    } else {
        var prevImg = imageBigBox.querySelector('img');
        imageBigBox.removeChild(prevImg);
        
        var cloneImage = imageSmall[currentStep].cloneNode(true);
        imageBigBox.appendChild(cloneImage);
        
        currentStep++;
        currentBox.textContent = currentStep;
        totalImages();
    }
});

prev.addEventListener('click', function() {
    if (currentStep <= 1) {
        currentStep = 1;
        currentBox.textContent = currentStep;
    } else {
        var prevImg = imageBigBox.querySelector('img');
        imageBigBox.removeChild(prevImg);
        
        var cloneImage = imageSmall[currentStep].cloneNode(true);
        imageBigBox.appendChild(cloneImage);

        currentStep--;
        currentBox.textContent = currentStep;
        totalImages();
    }
});

window.addEventListener('keydown', function() {

    var checkOverlay = overlayGallery.classList.contains('invisible') === false;

    if (event.keyCode == KEY_CODES.RIGHT && checkOverlay) {
        if (currentStep >= totalBox.textContent) {
            currentStep = totalBox.textContent;
            currentBox.textContent = currentStep;
        } else {
            var cloneImage = imageSmall[currentStep].cloneNode(true);
            imageBigBox.appendChild(cloneImage);

            var prevImg = imageBigBox.querySelector('img');
            imageBigBox.removeChild(prevImg);
            
            currentStep++;
            currentBox.textContent = currentStep;
            totalImages();
        }
    }

    if (event.keyCode == KEY_CODES.LEFT && checkOverlay) {
        if (currentStep <= 1) {
            currentStep = 1;
            currentBox.textContent = currentStep;
        } else {
            var cloneImage = imageSmall[currentStep].cloneNode(true);
            imageBigBox.appendChild(cloneImage);

            var prevImg = imageBigBox.querySelector('img');
            imageBigBox.removeChild(prevImg);
    
            currentStep--;
            currentBox.textContent = currentStep;
            totalImages();
        }
    }

    if (event.keyCode == KEY_CODES.ESC && checkOverlay) {
        var prevImg = imageBigBox.querySelector('img');
        
        imageBigBox.removeChild(prevImg);
        overlayGallery.classList.add('invisible');
    }
});

closeGallery.addEventListener('click', function(event) {
    event.preventDefault();
    
    var prevImg = imageBigBox.querySelector('img');

    imageBigBox.removeChild(prevImg);
    overlayGallery.classList.add('invisible');
});
