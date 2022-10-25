<template>
    <div class="loader-wrapper" v-show="show">
        <div class="loader-content__wrapper">
            <div class="loader-content">
                <div class="spinner-grow" style="width: 3rem !important; height: 3rem !important;" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.$root.$on("showLoader", (args) => {
            this.show = args;
        });
    },
    data() {
        return {
            show: false
        }
    },
    name: "loader"
}
</script>
