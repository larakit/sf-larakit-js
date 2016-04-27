var $body = $('body');
var LarakitJs = {
    debug: false,
    startDebug: function () {
        LarakitJs.debug = true;
    },
    stopDebug: function () {
        LarakitJs.debug = false;
    },
    log: function (type, message) {
        if (!LarakitJs.debug && !$('body').hasClass('js-debug')) {
            return false;
        }
        switch (type) {
            case 'info':
                console.info(message);
                break;
            case 'warn':
            case 'warning':
                console.warn(message);
                break;
            case 'error':
                console.error(message);
                break;
            default:
                console.log(message);
                break;
        }
    },
    initSelector: function (selector, callback) {
        var key = LarakitJs.makeKey(selector);
        LarakitJs.log('info', 'Инициализация селектора: ' + selector);
        $body.on('larakit.js', function () {
            //LarakitJs.log('info', 'LarakitJs');
            $body
                .find(selector + ':not(.' + key + ')')
                .each(function () {
                    LarakitJs.log('info', selector);
                    if (!$(this).closest('.repeatPrototype').length) {
                        try {
                            var res = callback.call($(this));
                            if (false != res) {
                                $(this).addClass(key);
                            } else {
                                LarakitJs.log('warning', 'Колбэк вернул отрицательный результат');
                            }
                        } catch (e) {
                            LarakitJs.log('error', 'Ошибка инициализации элемента: ' + selector);
                            LarakitJs.log('error', e);
                        }
                    }
                });
        });
    },

    makeKey: function (key) {
        return 'js-init-' + key.replace('.js-', '')
                .replace('.', '')
                .replace(/\s/g, '')
                .replace(/\[/g, '')
                .replace(/=/g, '')
                .replace(/\]/g, '')
            ;
    },

    fire: function () {
        $('body').trigger('larakit.js');
    }
};

$.ajaxSetup({
    complete: function () {
        $('body').trigger('larakit.js');
    }
});
$(document).ready(function () {
    $('body').trigger('larakit.js');
});