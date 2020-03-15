<template>
  <div class="hello">
    <chart ref="chart1" :options="orgOptions" :auto-resize="true"></chart>
  </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
           orgOptions: {},
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.orgOptions = {
        series: [{
            type: 'map',
            map:'china',
        }]
    }
    },
    watch: {

    },
    methods: {

    },
    components: {

    },
};
</script>

<style scoped lang="scss">

</style>

