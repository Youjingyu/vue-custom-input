# Vue custom input ![version](https://img.shields.io/badge/version-%20v1.0.0%20-green.svg) ![vue](https://img.shields.io/badge/vue-%20v2.1%20-green.svg) 

Vue custom input is a vue component for custom split input box, mobile web input box, simulating native app input box and etc. It's designed to input password and verification code. But you can also use it in other situation as you wish.

![](https://github.com/Youjingyu/vue-custom-input/raw/master/dist/example/example.gif)

## Demo

[https://wangdahoo.github.io/vue-scroller/](https://wangdahoo.github.io/vue-scroller/)

## Installation

```bash
npm i vue-custom-input -S
```

## Usage

### use in vue single file components

```html
<template>
    <custom-input
        input-height="50px"
        :input-number="4"
        input-type="number"
        input-style-type="oneBorder"
        @custom-input-change="change"
        @custom-input-complete="complete">
    </custom-input>
</template>
<script>
    import customInput from 'vue-custom-input';
    export default {
        components: { 'custom-input': customInput },
        methods: {
            change(val) {
                
            },
            complete(val) {
                
            }
        }
    }
</script>
```
### use in browser globals
```html
<div id="app">
    <custom-input></custom-input>
</div>
<script src="vue.js"></script>
<script src="vue-custom.js"></script>
<script>
     new Vue({
        el: '#app',
        components: {
            'custom-input': window.customInput
        }
     });
</script>
```

## API

#### Vue custom input component attributes:

| Attr. Name | Description | Required | Type |  Default Value |
|-----|-----|-----|-----|-----|
| custom-input-change | called when input value is changed | N | Function | - |
| custom-input-complete | called when all input boxes are filled | N | Function | - |
| input-number | input box number | N | Number | 4 |
| input-style-type | two preset styles. You can also design your style by the following attributes | N | 'allBorder', 'oneBorder' | 'allBorder' |
| input-type | just like html5 input type attribute, can be tel, number, text and etc. | N | String | 'text' |
| password-char | the character showed in input box when the input-type is password | N | String | '*' |
| input-width | input box width | N | String | - |
| input-height | input box height | N | String | '50px' |
| input-border-width | input box border width | N | String | '1px' |
| input-border-color | input box border color | N | String | '#20A0FF' |
| input-active-outline-color | input box outline color when focus on it | N | String | '#58B7FF' |
| input-style | customize input box style as you want. All styles will be injected into box's style attribute | N | Object | {} |
| input-active-style | input box style when focus on it. All styles will be injected into box's style attribute | N | Object | {} |
