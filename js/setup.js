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

var KEY_CODES = {
    ENTER: 13,
    ESC: 27
};

var setupIcon = document.querySelector('.setup-open-icon');
var setupWindow = document.querySelector('.setup');
var setupClose = document.querySelector('.setup-close');
var setupSimilar = document.querySelector('.setup-similar');
var similarListElement = document.querySelector('.setup-similar-list');
var similarCharacterTemplate = document.getElementById('similar-wizard-template').content;

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

setupIcon.addEventListener('click', function() {
    setupWindow.classList.remove('hidden');
    setupSimilar.classList.remove('hidden');
});

setupClose.addEventListener('click', function() {
    setupWindow.classList.add('hidden');
});
