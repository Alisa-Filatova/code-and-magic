'use strict';

// События на диалоговом окне

(function() {

    var setupOpen = document.querySelector('.setup-open');
    var setupWindow = document.querySelector('.setup');
    var setupClose = setupWindow.querySelector('.setup-close');
    var setupSimilar = setupWindow.querySelector('.setup-similar');
    var similarListElement = setupWindow.querySelector('.setup-similar-list');
    
    var overlaySetup = document.querySelector('.overlay');
    
    var setupForm = setupWindow.querySelector('.setup-wizard-form');
    var dialogHandle = setupWindow.querySelector('.setup-user-pic');
    
    var userName = setupOpen.querySelector('.user-name');
    var inputUserName = setupForm.querySelector('input[name="username"]');
    var inputCoatColor = setupForm.querySelector('input[name="coat-color"]');
    var inputEyesColor = setupForm.querySelector('input[name="eyes-color"]');
    var inputFireballColor = setupForm.querySelector('input[name="fireball-color"]');

    var myWizard = document.querySelector('#wizard');
    var myWizardCoat = document.querySelector('#wizard-coat');
    var myWizardEyes = document.querySelector('#wizard-eyes');

    userName.textContent = inputUserName.value;

    setupOpen.addEventListener('click', function() {
        setupWindow.classList.remove('hidden');
        setupSimilar.classList.remove('hidden');
        overlaySetup.classList.remove('invisible');
    });

    setupOpen.addEventListener('keydown', function(event) {
        event.preventDefault();
        
        if (event.keyCode === KEY_CODES.ENTER) {
            setupWindow.classList.remove('hidden');
            setupSimilar.classList.remove('hidden');
            overlaySetup.classList.remove('invisible');
        }
    });

    setupClose.addEventListener('click', function(event) {
        setupWindow.classList.add('hidden');
        setupSimilar.classList.add('hidden');
        overlaySetup.classList.add('invisible');
    });

    document.addEventListener('keydown', function(event) {
        if (event.keyCode === KEY_CODES.ESC) {
            event.preventDefault();

            setupWindow.classList.add('hidden');
            setupSimilar.classList.add('hidden');
            overlaySetup.classList.add('invisible');
        }
    });

    var successHandler = function(response) {
        myWizardEyes.style.fill = inputEyesColor.value; 
        myWizard.style.fill = inputCoatColor.value; 
        userName.textContent = inputUserName.value; 
        
        setupWindow.classList.add('hidden');
        setupSimilar.classList.add('hidden');
        overlaySetup.classList.add('invisible');
    };

    var errorHandler = function(errorMessage) {
        var node = document.createElement('div');
        node.classList.add('.error-message');
        node.textContent = errorMessage;
        document.body.insertAdjacentElement('afterbegin', node);
    };

    setupForm.addEventListener('submit', function(event) {
        window.backend.upload(new FormData(setupForm), successHandler, errorHandler);

        event.preventDefault();
    });
    
// // Перетаскивание диалогового окна настроек

//     dialogHandle.addEventListener('mousedown', function(event) {
//         event.preventDefault();

//         var startCoords = {
//             x: event.clientX,
//             y: event.clientY
//         };

//         var onMouseMove = function(moveEvent) {
//             moveEvent.preventDefault();

//             var shift = {
//                 x: startCoords.x - moveEvent.clientX,
//                 y: startCoords.y - moveEvent.clientY
//             };

//             startCoords = {
//                 x: moveEvent.clientX,
//                 y: moveEvent.clientY
//             };

//             setupWindow.style.top = (setupWindow.offsetTop - shift.y) + 'px';
//             setupWindow.style.left = (setupWindow.offsetLeft - shift.x) + 'px';
//         };

//         var onMouseUp = function(upEvent) {
//             upEvent.preventDefault();

//             document.removeEventListener('mousemove', onMouseMove);
//             document.removeEventListener('mouseup', onMouseUp);
//         };

//         document.addEventListener('mousemove', onMouseMove);
//         document.addEventListener('mouseup', onMouseUp);
//     });
})();
