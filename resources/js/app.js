window._ = require('lodash');

try {
    window.Popper = require('popper.js').default;
    // window.$ = window.jQuery = require('jquery');
    window.jq = require('jquery');
    require('bootstrap');
} catch (e) {
}

listener = true;

if (!listener) {
    require('./configurator');
} else {
    require('./listener');
}
