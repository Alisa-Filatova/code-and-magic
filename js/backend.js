(function() {
    var SERVER_URL = 'http://lenortat.spb.ru/enroll';
    var URL = 'data/wizards.json'
    
    var setup = function(onSuccess, onError) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
       
        xhr.addEventListener('load', function(event) {
            if (xhr.status === 200) {
                onSuccess(xhr.response);
            } else {
                onError('Произошла ошибка. Статус '  + xhr.status + ' ');
            }
        });

        xhr.addEventListener('error', function(event) {
            onError('Произошла ошибка соединения.');
        });

        xhr.addEventListener('timeout', function(event) {
            onError('Превышено время ожидания запроса.');
        });

        xhr.timeout = 15000;
        
        return xhr;
    };

    window.backend = { 
        upload: function(data, onSuccess, onError) {
            var xhr = setup(onSuccess, onError);
            xhr.open('POST', SERVER_URL);
            xhr.send(data);
        },
        load: function(onSuccess, onError) {
            var xhr = setup(onSuccess, onError);
            xhr.open('GET', URL);
            xhr.send();
        }
    };
})();
