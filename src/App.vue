<template>
    <div class="custom-input-test">
        <CustomInput :container-style="width"/>
    </div>
</template>
<script>
    import CustomInput from './components/Input.vue'
    export default {
//        name: 'CustomInput',
        components: { CustomInput },
        data() {
            return {
                width: {width: '300px'}
            }
        }
    }
</script>
<style lang="css" scoped>
    .custom-input-test{
        height: 50px;
    }
</style>