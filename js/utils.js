'use strict';

var SERVER_URL = 'https://1510.dump.academy/code-and-magick';

var KEY_CODES = {
    RIGHT: 39,
    LEFT: 37,
    TOP: 38,
    BOTTOM: 40,
    SHIFT: 16,
    SPACEBAR: 32,
    ESC: 27,
    ENTER: 13
};

/**
 * Получает случайный индекс массива
 *
 * @param {Array} array 
 * @return {Number}
 */
function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
};
