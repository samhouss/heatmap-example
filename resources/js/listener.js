import domElementPath from 'dom-element-path';

export default class clickListener {
    lastClick = {};
    time = undefined;

    constructor() {
        this.addEventListeners();
    }

    addEventListeners() {
        document.addEventListener("click", this.singleClick);
    }

    singleClick = async (event) => {
        if (event.target.id === "test") {
            event.preventDefault();
            return;
        }

        let selector_path = domElementPath(event.target);

        let clickData = {
            selector_path: selector_path,
            top: event.clientY - event.target.getBoundingClientRect().top,
            left: event.clientX - event.target.getBoundingClientRect().left,
            width: event.target.offsetWidth,
            height: event.target.offsetHeight,
            screen: window.screen.width + "x" + window.screen.height,
            windowInner: window.innerWidth + "x" + window.innerHeight,
            windowOuter: window.outerWidth + "x" + window.outerHeight,
            pathName: window.location.pathname
        };

        if (Date.now() - this.time < 3000 && _.isEqual(this.lastClick, clickData))
            return;

        this.lastClick = clickData;
        this.time = Date.now();

        let array = [];

        if (localStorage.hasOwnProperty('clicks'))
            array = JSON.parse(localStorage.getItem('clicks'));

        array.push(clickData);

        localStorage.setItem('clicks', JSON.stringify(array));

        console.log(array);
    };
}

new clickListener();
