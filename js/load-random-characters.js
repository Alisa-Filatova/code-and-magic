// Load random characters

(function() {
    
    var CHARACTERS_AMOUNT = 4;

    var characterTemplate = document.getElementById('similar-wizard-template').textContent.trim();
    var similarListElement = document.querySelector('.setup-similar-list');

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
        characterElement.querySelector('.wizard-coat').style.fill = characterObject.colorCoat;
        characterElement.querySelector('.wizard-eyes').style.fill = characterObject.colorEyes;
    
        return characterElement;
    };

    var successHandler = function(wizards) {
        var fragment = document.createDocumentFragment();
        
        for (var i = 0; i < CHARACTERS_AMOUNT; i++) {
            var character = wizards[getRandomIndex(wizards)];
            var renderedCharacter = renderCharacter(character);

            fragment.appendChild(renderedCharacter);
        }
            
        similarListElement.appendChild(fragment);  
    };

    var errorHandler = function(errorMessage) {
        var node = document.createElement('div');
        node.classList.add('.error-message');
        node.textContent = errorMessage;
        document.body.insertAdjacentElement('afterbegin', node);
    };

    window.backend.load(successHandler, errorHandler);
})();
