<template>
    <div class="custom-input">
        <span v-for="(input, index) in inputs" :key="index" @click="inputClick(index)"
              :style="[inputStyle, input.active ? inputActiveStyle : '']"
              class="custom-input-span" :class="inputTypeStyle"></span>
    </div>
</template>
<script>
    export default {
        name: 'CustomInput',
        props: {
            'inputNumber': {
                type: Number,
                default: 4,
                required: false
            },
            'inputType': {
                type: String,
                default: 'allBorder',
                required: false
            },
            'inputWidth': {
                type: String,
                default: '',
                required: false
            },
            'inputBorderWidth': {
                type: String,
                default: '1px',
                required: false
            },
            'inputBorderColor': {
                type: String,
                default: '#20A0FF',
                required: false
            },
            'inputActiveOutline': {
                type: String,
                default: '#58B7FF',
                required: false
            }
        },
        data() {
            return {
                inputs: new Array(this.inputNumber).fill({active: false})
            }
        },
        computed: {
            inputStyle() {
                let width = this.inputWidth;
                if(width === ''){
                    width = 100 / this.inputNumber - 5 + '%'
                }
                return {
                    width: width,
                    borderWidth: this.inputBorderWidth,
                    borderColor: this.inputBorderColor
                }
            },
            inputTypeStyle() {
                const styleConfig = {
                    allBorder: '',
                    oneBorder: ['custom-input-no-border']
                }
                return styleConfig[this.inputType];
            },
            inputActiveStyle() {
                const styleConfig = {
                    allBorder: {outline: this.inputActiveOutline + ' auto 5px'},
                    oneBorder: {'box-shadow': '0 1px 0 ' + this.inputActiveOutline}
                }
                return styleConfig[this.inputType];
            }
        },
        methods: {
            setInputAcitve(index) {
                const inputs = this.inputs;
                for(let i = 0; i < inputs.length; i++){
                    if(inputs[i].active === true){
                        this.$set(inputs, i, {active: false});
                        break;
                    }
                }
                this.$set(inputs, index, {active: true});
            },
            inputClick: function(index) {
                this.setInputAcitve(index);
            }
        }
    }
</script>
<style lang="css" scoped>
    .custom-input{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
    }
    .custom-input-span {
        position: relative;
        height: 100%;
        box-sizing: border-box;
        border-style: solid;
    }
    .custom-input-no-border {
        border-top: none;
        border-right: none;
        border-left: none;
    }

</style>