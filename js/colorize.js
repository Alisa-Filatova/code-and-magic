import { getRandomIndex } from './utils';

// Перекрашивание элементов персонажа по клику в случайный цвет

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

var setupWindow = document.querySelector('.setup');
var setupForm = setupWindow.querySelector('.setup-wizard-form');    
var inputCoatColor = setupForm.querySelector('input[name="coat-color"]');
var inputEyesColor = setupForm.querySelector('input[name="eyes-color"]');
var inputFireballColor = setupForm.querySelector('input[name="fireball-color"]');
var fireball = setupForm.querySelector('.fireball-group');
var fireballGroup = document.querySelector('.fireball-path');
var userCharacter = setupForm.querySelector('.my_wizard');

function onClickCharacter(characterElement, colors, input) {
    var randomColorIndex = getRandomIndex(colors);
    var color = colors[randomColorIndex];

    input.value = color;
    characterElement.style.fill = color;
}

userCharacter.querySelector('.wizard-coat').addEventListener('click', function() {
    onClickCharacter(this, COAT_COLORS, inputCoatColor);
});

userCharacter.querySelector('.wizard-eyes').addEventListener('click', function() {
    onClickCharacter(this, EYES_COLORS, inputEyesColor);
});

fireball.addEventListener('click', function() {
    onClickCharacter(fireballGroup, FIREBALL_COLORS, inputFireballColor);
});
