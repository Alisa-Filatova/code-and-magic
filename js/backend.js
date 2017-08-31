(function() {
    var SERVER_URL = 'http://lenortat.spb.ru/enroll';
    var URL = 'https://1510.dump.academy/code-and-magick/data'

    var setup = function(onSuccess, onError) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
       
        xhr.addEventListener('load', function(event) {
            if (xhr.status === 200) {
                onSuccess(xhr.response);
            } else {
                onError('Произошла ошибка соединения. Статус' + xhr.status + '');
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
