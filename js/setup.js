'use strict';

// Setup 

var setupIcon = document.querySelector('.setup-open-icon');
var setupWindow = document.querySelector('.setup');
var setupClose = document.querySelector('.setup-close');
var setupSimilar = document.querySelector('.setup-similar');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.getElementById('similar-wizard-template').content;

var CHARACTERS_AMOUNT = 4;

var FIRST_NAMES = ['Дамблдор', 'Хуан', 'Волдеморт', 'Джон', 'Виктор', 'Ходор', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['Поттер', 'Верон', 'Сноу', 'Вальц', 'Онопко', 'Ходор', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomArrayElement = function(arrey) {
    return Math.floor(Math.random() * arrey.length);
};
  
var createWizard = function (namesArr, surnamesArr, coatsArr, eyesArr) {
    var wizard = [];
  
    for (var i = 0; i < CHARACTERS_AMOUNT; i++) {
        wizard[i] = {
            name: namesArr[getRandomArrayElement(namesArr)] + ' ' + surnamesArr[getRandomArrayElement(surnamesArr)],
            coatColor: coatsArr[getRandomArrayElement(coatsArr)],
            eyesColor: eyesArr[getRandomArrayElement(eyesArr)]
        };
    }
    return wizard;
};

var wizards = createWizard(FIRST_NAMES, LAST_NAMES, COAT_COLORS, EYES_COLORS);
  
function renderWizard(wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
  
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  
    return wizardElement;
};
  
function renderRandomWizards() {
    var fragment = document.createDocumentFragment();
    
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
};

renderRandomWizards();

setupIcon.addEventListener('click', function() {
    setupWindow.classList.remove('hidden');
    setupSimilar.classList.remove('hidden');
});

setupClose.addEventListener('click', function() {
    setupWindow.classList.add('hidden');
});
