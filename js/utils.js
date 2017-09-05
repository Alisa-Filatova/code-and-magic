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

/**
 * Удаляет все элементы с соответствующим классом
 * 
 * @param {ClassName} className 
 */
function removeElementsByClass(className) {
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

export {
    KEY_CODES,
    getRandomIndex,
    removeElementsByClass,
};
