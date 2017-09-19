import CustomInput from './components/Input.vue'
export default Input

if (typeof module != 'undefined' && module.exports) {
  module.exports = CustomInput;
} else if (typeof define == 'function' && define.amd) {
  define( function () { return CustomInput; } );
} else {
  window.CustomInput = CustomInput;
}
