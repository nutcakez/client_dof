<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <router-link to="/test">TEST</router-link>
  </div>
  
</template>

<script>
// @ is an alias to /src
let mytest='almaa'
var timerstuff=require('../stuff')
export default {
  name: 'home',
  components: {
  },
  data: function(){
    return{
      
    }
  },
  computed:{
    alma:function(){
      return timerstuff.number
    }
  }
}
</script>
