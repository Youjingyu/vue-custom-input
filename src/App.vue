<template>
    <div class="custom-input-test">
        <CustomInput inputType="oneBorder"/>
    </div>
</template>
<script>
    import CustomInput from './components/Input.vue'
    export default {
        components: { CustomInput }
    }
</script>
<style lang="css" scoped>
    .custom-input-test{
        height: 50px;
        width: 300px;
    }
</style>