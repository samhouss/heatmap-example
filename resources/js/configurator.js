import Vue from 'vue';

class configurator {
    constructor() {
        this.runConfigurator();
    }

    runConfigurator() {
        // this will be a wrapper div for bootstrap classes
        let wrapper = document.createElement("div");
        wrapper.id = "s-ux-c";
        document.body.appendChild(wrapper);

        Vue.component('wrapper-component', require('./components/wrapper').default);
        wrapper.innerHTML = "<wrapper-component></wrapper-component>";

        new Vue({
            el: '#s-ux-c'
        });
    }
}

new configurator;
