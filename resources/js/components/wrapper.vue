<template>
    <div>
        <heatmap/>
        <loader/>
    </div>
</template>

<script>
import heatmap from './heatmap';
import loader from './loader';

export default {
    name: "wrapper",
    components: {heatmap, loader}
}
</script>
