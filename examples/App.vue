<template>
    <div class="custom-input-test">
        <customInput input-type="password" @custom-input-change="complete"/>
    </div>
</template>
<script>
    import customInput from '../src'
    export default {
        components: { customInput },
        methods: {
            complete(val) {
                console.log(val);
            }
        }
    }
</script>
<style lang="css" scoped>
    .custom-input-test{
        height: 50px;
        width: 300px;
    }
</style>