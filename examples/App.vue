<template>
    <div class="container" v-cloak>
        <custom-input
                input-height="50px"
                :input-number="4"
                input-type="number"
                input-style-type="oneBorder"
                @custom-input-change="change"
                @custom-input-complete="complete">
        </custom-input>
        <h4>输入框值：{{customInput}}</h4>
        <custom-input
                input-height="50px"
                :input-number="6"
                input-style-type="allBorder"
                input-type="password"
                password-char="*"
                :input-style="inputStyle"
                :input-active-style="inputActiveStyle"
                @custom-input-change="change2"
                @custom-input-complete="complete2">
        </custom-input>
        <h4>输入框值：{{customInput2}}</h4>
    </div>
</template>
<script>
    import customInput from '../src'
    export default {
        data() {
            return {
                inputStyle: {'border-color': '#20A0FF'},
                inputActiveStyle: {'outline': '#58B7FF ridge 1px'},
                customInput: '',
                customInput2: ''
            }
        },
        components: { 'custom-input': customInput },
        methods: {
            change(val) {
                this.customInput = val;
            },
            complete(val) {
                this.customInput = val;
            },
            change2(val) {
                this.customInput2 = val;
            },
            complete2(val) {
                this.customInput2 = val;
            }
        }
    }
</script>
<style lang="css" scoped>
    .container{
        margin: 0 auto;
        width: 100%;
        max-width: 500px;
    }
    [v-cloak] {
        display: none;
    }
</style>