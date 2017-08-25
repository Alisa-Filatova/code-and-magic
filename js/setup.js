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

var setupOpen = document.querySelector('.setup-open');
var setupWindow = document.querySelector('.setup');
var setupClose = document.querySelector('.setup-close');
var setupSimilar = document.querySelector('.setup-similar');
var similarListElement = document.querySelector('.setup-similar-list');
var similarCharacterTemplate = document.getElementById('similar-wizard-template').content;
var setupUserName = document.querySelector('.setup-user-name');

/**
 * Получает случайный элемент массива
 * @param {Array} array 
 * @return {Array}
 */
function getRandomArrayElement(array) {
    return Math.floor(Math.random() * array.length);
};

/**
 * Возвращает массив с объектом персонажа со случаными характеристиками
 * @param {Array} namesArray 
 * @param {Array} surnamesArray 
 * @param {Array} coatsArray 
 * @param {Array} eyesArray 
 * @return {Array} character
 */
function createCharacter(namesArray, surnamesArray, coatsArray, eyesArray) {
    var character = [];
  
    for (var index = 0; index < CHARACTERS_AMOUNT; index++) {
        character[index] = {
            name: namesArray[getRandomArrayElement(namesArray)] + ' ' + surnamesArray[getRandomArrayElement(surnamesArray)],
            coatColor: coatsArray[getRandomArrayElement(coatsArray)],
            eyesColor: eyesArray[getRandomArrayElement(eyesArray)]
        };
    }
    return character;
};

var characters = createCharacter(FIRST_NAMES, LAST_NAMES, COAT_COLORS, EYES_COLORS);

/**
 * Отрисовывает персонажа в DOM-шаблон на основе объекта массива characters
 * @param {Object} characterObject 
 * @return {} DOM-element
 */
function renderCharacter(characterObject) {
    var characterElement = similarCharacterTemplate.cloneNode(true);
  
    characterElement.querySelector('.setup-similar-label').textContent = characterObject.name;
    characterElement.querySelector('.wizard-coat').style.fill = characterObject.coatColor;
    characterElement.querySelector('.wizard-eyes').style.fill = characterObject.eyesColor;
  
    return characterElement;
};

/**
 * Отрисовывает похожих персонажей во временном блоке DocumentFragment
 * и заполняет блок similarListElement случайными DOM-элементами из DocumentFragment
 */
function renderRandomCharacters() {
    var fragment = document.createDocumentFragment();
    
    for (var index = 0; index < characters.length; index++) {
      fragment.appendChild(renderCharacter(characters[index]));
    }
    similarListElement.appendChild(fragment);
};

renderRandomCharacters();

// Открытие и закрытие окна настроек персонажа 

setupOpen.addEventListener('click', function() {
    setupWindow.classList.remove('hidden');
    setupSimilar.classList.remove('hidden');
});

setupOpen.addEventListener('keydown', function(event) {
    event.preventDefault;
    if (event.keyCode === KEY_CODES.ENTER) {
        setupWindow.classList.remove('hidden');
        setupSimilar.classList.remove('hidden');
    }
});

setupClose.addEventListener('click', function() {
    setupWindow.classList.add('hidden');
    setupSimilar.classList.add('hidden');
});

document.addEventListener('keydown', function(event) {
    if (event.keyCode === KEY_CODES.ESC) {
        setupWindow.classList.add('hidden');
        setupSimilar.classList.add('hidden');
    }
});

var setupForm = document.querySelector('.setup-wizard-form');
var userCharacter = setupForm.querySelector('.my_wizard');
var coat = userCharacter.querySelector('.wizard-coat'); 
var eyes = userCharacter.querySelector('.wizard-eyes'); 
var fireball = setupForm.querySelector('.setup-fireball-wrap'); 
var setupSubmitBtn = setupWindow.querySelector('.setup-submit');
var inputCoatColor = setupForm.querySelector('input[name="coat-color"]');
var inputEyesColor = setupForm.querySelector('input[name="eyes-color"]');
var inputFireballColor = setupForm.querySelector('input[name="fireball-color"]');

console.log(inputCoatColor.value);

setupSubmitBtn.addEventListener('submit', function() {
    setupWindow.classList.add('hidden');
    setupSimilar.classList.add('hidden');
});

/**
 * Получает случайный цвет из массива и красит элемент, 
 * так же добавляет цвет в value соответствующего input
 * @param {DOM-element} element 
 * @param {Array} arrayColor 
 * @param {DOM-element} input
 * @return {string} color
 */
function getRandomColor(element, arrayColor, input) {
    var elementColor = [];
    for (var index = 0; index < 1; index++) {
        elementColor[index] = {
            color: arrayColor[getRandomArrayElement(arrayColor)]
        };
    }
    
    input.value = elementColor[0].color;
    
    if (element.classList.contains('setup-fireball-wrap')) {
        element.style.background = elementColor[0].color;   
    } else {
        element.style.fill = elementColor[0].color;
    }
}

// Перекрашивание элементов персонажа по клику в случайный цвет

coat.addEventListener('click', function(event) {
    getRandomColor(coat, COAT_COLORS, inputCoatColor);
});

eyes.addEventListener('click', function(event) {
    getRandomColor(eyes, EYES_COLORS, inputEyesColor);
});

fireball.addEventListener('click', function(event) {
    getRandomColor(fireball, FIREBALL_COLORS, inputFireballColor);
});
