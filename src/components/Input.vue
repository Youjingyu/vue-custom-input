<template>
    <div class="custom-input">
        <span v-for="(input, index) in spanStatus" :key="index" @click="spanClick(index)"
              :style="[spanStyle, input.active ? spanActiveStyle : '']"
              class="custom-input-span" :class="spanTypeStyle"></span>
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
                spanStatus: new Array(this.inputNumber).fill({active: false, value: ''}),
                blurTimer: null
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
            setSpanAcitve(index) {
                const spans = this.spanStatus;
                let obj;
                for(let i = 0; i < spans.length; i++){
                    if(spans[i].active === true){
                        obj = assignObj(spans[i]);
                        obj.active = false;
                        this.$set(spans, i, obj);
                        if(i === index){ return 'cancelActive'}
                        break;
                    }
                }
                obj = assignObj(spans[index]);
                obj.active = true;
                this.$set(spans, index, obj);
            },
            removeSpanActive() {
                const spans = this.spanStatus;
                let obj;
                for(let i = 0; i < spans.length; i++){
                    if(spans[i].active === true){
                        obj = assignObj(spans[i]);
                        obj.active = false;
                        this.$set(spans, i, obj);
                        break;
                    }
                }
            },
            spanClick(index) {
                clearTimeout(this.blurTimer);
                const activeResult = this.setSpanAcitve(index);
                const hideInput = this.$refs.hideInput;
                activeResult === 'cancelActive' ? hideInput.blur() : hideInput.focus();
            },
            inputBlur(){
                this.blurTimer = setTimeout(() => {
                    this.removeSpanActive();
                }, 0);
            },
            inputKeydown($event) {
                const keycode = $event.keyCode || $event.which;
                if(keycode !== 8 && $event.target.value.length >= this.inputNumber){
                    $event.preventDefault();
                }
            },
            inputEvent($event){

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
    .cutom-input-hide:focus{}

</style>