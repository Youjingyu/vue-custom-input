<template>
    <div class="custom-input">
        <span v-for="(text, index) in spanValue" :key="index" @click="spanClick(index)"
              :style="[spanStyle, activeIndex === index ? spanActiveStyle : '']"
              class="custom-input-span" :class="spanTypeStyle">{{text}}</span>
        <input ref="hideInput" @keydown="inputKeydown" @input="inputEvent" @blur="inputBlur" type="text" class="cutom-input-hide" onpaste="return false;">
    </div>
</template>
<script>
    import { assignObj } from '../module/util'
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
                spanValue: new Array(this.inputNumber).fill(''),
                activeIndex: undefined
            }
        },
        computed: {
            spanStyle() {
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
            spanTypeStyle() {
                const styleConfig = {
                    allBorder: '',
                    oneBorder: ['custom-input-no-border']
                }
                return styleConfig[this.inputType];
            },
            spanActiveStyle() {
                const styleConfig = {
                    allBorder: {outline: this.inputActiveOutline + ' auto 5px'},
                    oneBorder: {'box-shadow': '0 1px 0 ' + this.inputActiveOutline}
                }
                return styleConfig[this.inputType];
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
                if(keycode === 8){
                    this.$set(this.spanValue, this.activeIndex, '');
                    this.$emit('custom-input-change', this.getCustomInputVal());
                    if(this.activeIndex > 0 && this.spanValue[this.activeIndex -1] === ''){
                        this.activeIndex --;
                    }
                }
            },
            inputEvent($event){
                const hideInput = $event.target;
                if(hideInput !== ''){
                    this.$set(this.spanValue, this.activeIndex, hideInput.value);
                    $event.target.value = '';
                    this.$emit('custom-input-change', this.getCustomInputVal());
                    if(this.activeIndex < this.inputNumber - 1 && this.spanValue[this.activeIndex + 1] === ''){
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
    .custom-input{
        display: flex;
        position: relative;
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
    .cutom-input-hide{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
        box-sizing: border-box;
        opacity: 0;
    }
    .cutom-input-hide:focus{
        outline: none;
    }
</style>