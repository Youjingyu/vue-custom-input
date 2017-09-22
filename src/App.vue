<template>
    <div class="custom-input-test">
        <CustomInput inputType="oneBorder" @custom-input-change="complete"/>
    </div>
</template>
<script>
    import CustomInput from './components/Input.vue'
    export default {
        components: { CustomInput },
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