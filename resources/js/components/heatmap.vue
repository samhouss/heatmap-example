<template>
    <div class="heatmap-wrapper" :style="computedStyle" v-if="show">
        <div class="heatmap" style="height: 100% !important; width:100% !important;">
        </div>
    </div>
</template>

<script>
import heatmapJS from "heatmap.js-fixed/build/heatmap.min";
import slugify from "slugify";

export default {
    name: "heatmap",
    data() {
        return {
            show: false,
            contentSiteHeight: 0
        }
    },
    mounted() {
        this.$nextTick(() => {
            // scroll all the page to delete animations
            window.scrollTo(0, document.body.scrollHeight);

            this.generatePoints();
        });

        window.addEventListener("resize", (event) => {
            clearTimeout(this.timeOut);
            this.timeOut = setTimeout(() => {
                this.generatePoints();
            }, 1500);
        });
    },
    methods: {
        removeElementsByClass(className) {
            let elements = document.getElementsByClassName(className);
            while (elements.length > 0) {
                elements[0].parentNode.removeChild(elements[0]);
            }
        },
        sleep(milliseconds) {
            return new Promise((resolve) => setTimeout(resolve, milliseconds));
        },
        async generatePoints() {
            console.log('generate heatmap');

            this.$root.$emit('showLoader', true); // show the loader on the page

            await this.sleep(500); // wait 3 secondes like api call

            let res = JSON.parse(localStorage.getItem('clicks')); // get clicks from localstorage

            this.removeElementsByClass("heatmap-canvas"); // remove the old heatmap-canvas to generate a new

            this.show = true; // show the heatmap wrapper

            let pre_selected = []; // keep the selected nodes inside an array to reduce querySelector fn call (for performance)
            let points = [];
            let ln = res.length;
            let max = 0;

            for (let i = 0; i < ln; i++) {
                const bd_click = res[i];

                let slug_key = slugify(bd_click.selector_path, {
                    remove: /[*+~.()'"!:@]/g,
                    replacement: "",
                });

                let wanted = undefined;

                if (!pre_selected[slug_key]) {
                    wanted = document.querySelector(bd_click.selector_path);

                    if (!wanted) continue;

                    pre_selected[slug_key] = wanted;
                } else
                    wanted = pre_selected[slug_key];

                let xNew = (bd_click.left * wanted.offsetWidth) / bd_click.width;  // calc new width
                let yNew = (bd_click.top * wanted.offsetHeight) / bd_click.height; // calc new height

                if (xNew === 0 && yNew === 0)
                    continue;

                let calculatedTop =
                    wanted.getBoundingClientRect().top + window.scrollY + yNew;
                let calculatedLeft =
                    wanted.getBoundingClientRect().left + window.scrollX + xNew;

                let point = {
                    x: Math.round(calculatedLeft),
                    y: Math.round(calculatedTop),
                };

                points.push(point);
            }

            let data = {
                // max: 1, //The maximum value of all data (for the test we deactivate this option this option is util for big number of points)
                data: points,
            };

            // heatmap generation
            this.contentSiteHeight = this.allBodyHeight();  // get body height to draw the grey overlay

            await this.sleep(100);

            // create the heatmap
            let heatmapInstance = heatmapJS.create({
                container: document.querySelector(".heatmap"),
                gradient: {
                    ".5": "blue",
                    ".8": "red",
                    ".95": "white",
                },
            });
            heatmapInstance.setData(data);
            this.$root.$emit('showLoader', false);
        },
        allBodyHeight() {
            let body = document.body,
                html = document.documentElement;

            return Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.offsetHeight
            );
        }
    },
    computed: {
        computedStyle() {
            return {
                position: 'absolute',
                width: "100%",
                height: this.contentSiteHeight + "px",
                background: "grey",
                opacity: 0.6,
            }
        },
    }
}
</script>
