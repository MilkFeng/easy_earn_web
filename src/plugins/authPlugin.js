// // authPlugin.js
// import { ref, provide } from 'vue';

// const token = ref(null); //can be used only in this vue?


// export default {
//     install: (app) => {
//       app.config.globalProperties.$getAuthToken = function () {
//         return token;
//       };
  
//       app.config.globalProperties.$setAuthToken = function (new_token) {
//         token.value=new_token;
//       };
//     },
//   };
  
  