<template>
    <div class="custom-input" :style="containerStyle">
        <span class="custom-input-span" :style="inputStyle"></span>
    </div>
</template>
<script>
    export default {
        name: 'CustomInput',
        props: {
            'containerStyle': {
                type: Object,
                default: {}
            },
            'inputStyle': {
                type: Object,
                default: {}
            }
        },
        data() {
            return {}
        }
    }
</script>
<style lang="css" scoped>
    .custom-input{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
    .custom-input-span {
        flex: 1;
        height: 100%;
        border: 1px solid;
        box-sizing: border-box;
    }
</style>