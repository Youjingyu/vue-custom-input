import CustomInput from './components/Input.vue'
import Vue from 'vue'

new Vue({
    el: '#app',
    template: '<CustomInput />',
    components: {
        CustomInput
    }
    // render: h => h(CustomInput)
})
