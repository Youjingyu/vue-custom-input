<template>
    <div class="custom-input-container">
        <div class="custom-input">
            <span v-for="(text, index) in spanValue" :key="index" @click="spanClick(index)"
                  :style="[spanStyle, activeIndex === index ? spanActiveStyle : '']"
                  class="custom-input-span" :class="spanTypeStyle">{{inputType === 'password' ? (text === '' ? '' : passwordChar) : text}}</span>
        </div>
        <input ref="hideInput" @keydown="inputKeydown" @input="inputEvent" @blur="inputBlur"
               :type="inputType" class="cutom-input-hide" onpaste="return false;">
    </div>
</template>
<script>
    import { assignObj, arrayFill } from '../module/util'
    export default {
        name: 'custom-input',
        props: {
            'inputNumber': {
                type: Number,
                default: 4,
                required: false
            },
            'inputStyleType': {
                type: String,
                default: 'allBorder',
                required: false
            },
            'inputType': {
                type: String,
                default: 'text',
                required: false
            },
            'passwordChar': {
                type: String,
                default: '*',
                required: false
            },
            'inputWidth': {
                type: String,
                default: '',
                required: false
            },
            'inputHeight': {
                type: String,
                default: '50px',
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
            'inputActiveOutlineColor': {
                type: String,
                default: '#58B7FF',
                required: false
            },
            'inputStyle': {
                type: Object,
                default: function () {
                    return {};
                },
                required: false
            },
            'inputActiveStyle': {
                type: Object,
                default: function () {
                    return {};
                },
                required: false
            }
        },
        data() {
            return {
                spanValue: arrayFill(new Array(this.inputNumber), ''),
                activeIndex: undefined
            }
        },
        computed: {
            spanStyle() {
                let width = this.inputWidth;
                if(width === ''){
                    width = 100 / this.inputNumber - 1 + '%'
                }
                const style = {
                    width: width,
                    height: this.inputHeight,
                    lineHeight: this.inputHeight,
                    borderWidth: this.inputBorderWidth,
                    borderColor: this.inputBorderColor
                }
                return assignObj({}, style, this.inputStyle);
            },
            spanTypeStyle() {
                const styleConfig = {
                    allBorder: '',
                    oneBorder: ['custom-input-no-border']
                }
                return styleConfig[this.inputStyleType];
            },
            spanActiveStyle() {
                const styleConfig = {
                    allBorder: {outline: this.inputActiveOutlineColor + ' solid 1px'},
                    oneBorder: {'box-shadow': '0 1px 0 ' + this.inputActiveOutlineColor}
                }
                return assignObj({}, styleConfig[this.inputStyleType], this.inputActiveStyle);
            }
        },
        methods: {
            spanClick(index) {
                this.activeIndex = index;
                this.$refs.hideInput.focus();
            },
            inputBlur(){
                this.activeIndex = undefined;
            },
            inputKeydown($event) {
                const keycode = $event.keyCode || $event.which;
                if(keycode === 8) {
                    let backFlag = this.spanValue[this.activeIndex] === '' ? true : false;
                    this.$set(this.spanValue, this.activeIndex, '');
                    if (this.activeIndex > 0 && backFlag) {
                        this.activeIndex--;
                        this.$set(this.spanValue, this.activeIndex, '');
                    }
                    this.$emit('custom-input-change', this.getCustomInputVal());
                }
            },
            inputEvent($event){
                const hideInput = $event.target;
                if(hideInput.value !== ''){
                    this.$set(this.spanValue, this.activeIndex, hideInput.value);
                    hideInput.value = '';
                    this.$emit('custom-input-change', this.getCustomInputVal());
                    if(this.activeIndex < this.inputNumber - 1){
                        this.activeIndex ++;
                    }
                    const val = this.getCustomInputCompleteVal();
                    if(val.length === this.inputNumber) {
                        this.$emit('custom-input-complete', val);
                    }
                }
            },
            getCustomInputCompleteVal(){
                return this.spanValue.join('');
            },
            getCustomInputVal(){
                return this.spanValue.map((val) => {
                    return val || ' ';
                }).join('');
            }
        }
    }
</script>
<style lang="css" scoped>
    .custom-input-container{
        position: relative;
    }
    .custom-input{
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
    }
    .custom-input-span {
        height: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-style: solid;
        text-align: center;
    }
    .custom-input-no-border {
        border-top: none;
        border-right: none;
        border-left: none;
    }
    .cutom-input-hide{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        opacity: 0;
        color: transparent;
        text-indent: -999em;
    }
    .cutom-input-hide:focus{
        outline: none;
    }
</style>