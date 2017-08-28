'use strict';

// Setup of Character 

var CHARACTERS_AMOUNT = 4;

var FIRST_NAMES = [
    'Дамблдор', 
    'Хуан', 
    'Волдеморт', 
    'Джон', 
    'Виктор', 
    'Ходор', 
    'Люпита', 
    'Вашингтон'
];

var LAST_NAMES = [
    'Поттер', 
    'Верон', 
    'Сноу', 
    'Вальц', 
    'Онопко', 
    'Ходор', 
    'Нионго', 
    'Ирвинг'
];

var COAT_COLORS = [
    'rgb(101, 137, 164)', 
    'rgb(241, 43, 107)', 
    'rgb(146, 100, 161)', 
    'rgb(56, 159, 117)', 
    'rgb(215, 210, 55)', 
    'rgb(0, 0, 0)'
];

var EYES_COLORS = [
    'black', 
    'red', 
    'blue', 
    'yellow', 
    'green'
];

var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
];

var KEY_CODES = {
    ENTER: 13,
    ESC: 27
};

var SERVER_URL = 'https://1510.dump.academy/code-and-magick';

var setupOpen = document.querySelector('.setup-open');
var setupWindow = document.querySelector('.setup');
var setupClose = setupWindow.querySelector('.setup-close');
var setupSimilar = setupWindow.querySelector('.setup-similar');
var similarListElement = setupWindow.querySelector('.setup-similar-list');
var setupUserName = setupWindow.querySelector('.setup-user-name');
var characterTemplate = document.getElementById('similar-wizard-template').textContent.trim();
var overlaySetup = document.querySelector('.overlay');
var setupForm = setupWindow.querySelector('.setup-wizard-form');

var userCharacter = setupForm.querySelector('.my_wizard');
var fireball = setupForm.querySelector('.fireball-group');
var fireballGroup = document.querySelector('.fireball-path');

var setupSubmitBtn = setupWindow.querySelector('.setup-submit');
var inputCoatColor = setupForm.querySelector('input[name="coat-color"]');
var inputEyesColor = setupForm.querySelector('input[name="eyes-color"]');
var inputFireballColor = setupForm.querySelector('input[name="fireball-color"]');
var inputUserName = setupForm.querySelector('input[name="username"]');

var demo = document.querySelector('.demo');
var myWizard = demo.querySelector('#wizard');
var myWizardCoat = demo.querySelector('#wizard-coat');
var myWizardEyes = demo.querySelector('#wizard-eyes');
var userName = setupOpen.querySelector('.user-name');
var artifactItem = setupWindow.querySelector('.setup-artifacts-cell');
var artifact = setupWindow.querySelector('.artifact');

/**
 * Получает случайный индекс массива
 *
 * @param {Array} array 
 * @return {Number}
 */
function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
};

/**
 * Возвращает массив с объектом персонажа со случаными характеристиками
 *
 * @param {Array} namesArray 
 * @param {Array} surnamesArray 
 * @param {Array} coatsArray 
 * @param {Array} eyesArray
 *
 * @return {Object} character
 */
function createRandomCharacter(namesArray, surnamesArray, coatsArray, eyesArray) {
    var randomName = getRandomIndex(namesArray);
    var randomSurname = getRandomIndex(surnamesArray);
    var randomCoat = getRandomIndex(coatsArray);
    var randomEyes = getRandomIndex(eyesArray);

    return {
        name: namesArray[randomName] + ' ' + surnamesArray[randomSurname],
        coatColor: coatsArray[randomCoat],
        eyesColor: eyesArray[randomEyes]
    };
};

/**
 * Отрисовывает персонажа в DOM-шаблон на основе объекта массива characters
 *
 * @param {Object} characterObject 
 * @return {HTMLElement}
 */
function renderCharacter(characterObject) {
    var characterElementWrapper = document.createElement('div');

    characterElementWrapper.innerHTML = characterTemplate;

    var characterElement = characterElementWrapper.childNodes[0];
  
    characterElement.querySelector('.setup-similar-label').textContent = characterObject.name;
    characterElement.querySelector('.wizard-coat').style.fill = characterObject.coatColor;
    characterElement.querySelector('.wizard-eyes').style.fill = characterObject.eyesColor;
  
    return characterElement;
};

for (var i = 0; i < CHARACTERS_AMOUNT; i++) {
    var character = createRandomCharacter(FIRST_NAMES, LAST_NAMES, COAT_COLORS, EYES_COLORS);
    var renderedCharacter = renderCharacter(character);
    var fragment = document.createDocumentFragment();
    
    fragment.appendChild(renderedCharacter);
    similarListElement.appendChild(fragment);
}

userName.textContent = inputUserName.value;

// Открытие и закрытие окна настроек персонажа 

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

function onClickCharacter(characterElement, colors, input) {
    var randomColorIndex = getRandomIndex(colors);
    var color = colors[randomColorIndex];

    input.value = color;
    characterElement.style.fill = color;
}

// Перекрашивание элементов персонажа по клику в случайный цвет

userCharacter.querySelector('.wizard-coat').addEventListener('click', function() {
    onClickCharacter(this, COAT_COLORS, inputCoatColor);
});

userCharacter.querySelector('.wizard-eyes').addEventListener('click', function() {
    onClickCharacter(this, EYES_COLORS, inputEyesColor);
});

fireball.addEventListener('click', function() {
    onClickCharacter(fireballGroup, FIREBALL_COLORS, inputFireballColor);
});

setupForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    myWizard.style.fill = inputCoatColor.value; 
    myWizardEyes.style.fill = inputEyesColor.value; 
    userName.textContent = inputUserName.value;
    setupWindow.classList.add('hidden');
    setupSimilar.classList.add('hidden');
    overlaySetup.classList.add('invisible');
});

artifact.onmousedown = function(element) {
    
    var coords = artifact.getBoundingClientRect();
    var shiftX = element.pageX - coords.left;
    var shiftY = element.pageY - coords.top;
    
    artifact.style.position = 'absolute';
    document.body.appendChild(artifact);
    
    moveAt(element);

    artifact.style.zIndex = 7000; 

    function moveAt(element) {
        artifact.style.left = element.pageX - shiftX + 'px';
        artifact.style.top = element.pageY - shiftY + 'px';
    }

    document.onmousemove = function(element) {
        moveAt(element);
    };

    document.onmouseup = function() {
        document.onmousemove = null;
        artifact.onmouseup = null;
    };
}
    
artifact.ondragstart = function() {
    return false;
};
