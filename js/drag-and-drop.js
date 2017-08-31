'use strict';

// Перетаскивание артефактов из магазина в рюкзак

(function() {
    var shopElement = document.querySelector('.setup-artifacts-shop');
    var artifactsElement = document.querySelector('.setup-artifacts');
    var money = document.querySelector('.money__count');

    var draggedItem = null;

    // Перенос из магазина в рюкзак

    shopElement.addEventListener('dragstart', function(event) {
        if (event.target.tagName.toLowerCase() === 'img') {
            draggedItem = event.target;
            event.dataTransfer.setData('text/plain', event.target.alt);
        }
    });

    artifactsElement.addEventListener('dragover', function(event) {
        event.preventDefault();
    });

    artifactsElement.addEventListener('drop', function(event) {
        if (draggedItem.classList.contains('bought')) {
            event.target.style.backgroundColor = '';
            event.target.appendChild(draggedItem);
            
            money.textContent = money.textContent;
        } else {
            event.target.style.backgroundColor = '';
            event.target.appendChild(draggedItem);
            
            draggedItem.classList.add('bought');
            draggedItem.classList.remove('sold');

            money.textContent = money.textContent - draggedItem.getAttribute('data');
        }
    });

    artifactsElement.addEventListener('dragenter', function(event) {
        event.target.style.backgroundColor = 'yellow';
        event.preventDefault();
    });

    artifactsElement.addEventListener('dragleave', function(event) {
        event.target.style.backgroundColor = '';
        event.preventDefault();
    });

    // Перенос из рюкзака в магазин

    artifactsElement.addEventListener('dragstart', function(event) {
        if (event.target.tagName.toLowerCase() === 'img') {
            draggedItem = event.target;
            event.dataTransfer.setData('text/plain', event.target.alt);
        }
    });

    shopElement.addEventListener('dragover', function(event) {
        event.preventDefault();
    });

    shopElement.addEventListener('drop', function(event) {
        if (draggedItem.classList.contains('sold')) {
            event.target.style.backgroundColor = '';
            event.target.appendChild(draggedItem);
            
            money.textContent = money.textContent;
        } else {
            event.target.style.backgroundColor = '';
            event.target.appendChild(draggedItem);
            
            draggedItem.classList.add('sold');
            draggedItem.classList.remove('bought');
        
            money.textContent = Number(money.textContent) + Number(draggedItem.getAttribute('data'));
        }
    });

    shopElement.addEventListener('dragenter', function(event) {
        event.target.style.backgroundColor = '';
        event.preventDefault();
    });

    shopElement.addEventListener('dragleave', function(event) {
        event.target.style.backgroundColor = '';
        event.preventDefault();
    });
})();