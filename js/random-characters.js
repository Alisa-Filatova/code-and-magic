'use strict';

(function() {
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

    var characterTemplate = document.getElementById('similar-wizard-template').textContent.trim();
    var similarListElement = document.querySelector('.setup-similar-list');

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
     * Отрисовывает персонажа в DOM-шаблон на основе объекта characters
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
})();
