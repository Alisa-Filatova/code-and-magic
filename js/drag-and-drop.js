// Перетаскивание артефактов из магазина в рюкзак

(function() {
    var shopElement = document.querySelector('.setup-artifacts-shop');
    var artifactsElement = document.querySelector('.setup-artifacts');

    var draggedItem = null;

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
        event.target.style.backgroundColor = '';
        event.target.appendChild(draggedItem);
    });

    artifactsElement.addEventListener('dragenter', function(event) {
        event.target.style.backgroundColor = 'yellow';
        event.preventDefault();
    });

    artifactsElement.addEventListener('dragleave', function(event) {
        event.target.style.backgroundColor = '';
        event.preventDefault();
    });
})();