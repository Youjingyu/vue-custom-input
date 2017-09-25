import customInput from './components/Input.vue'
export default customInput

if (typeof module != 'undefined' && module.exports) {
  module.exports = customInput;
} else if (typeof define == 'function' && define.amd) {
    define( function () { return customInput; } );
} else {
  window.customInput = customInput;
}
