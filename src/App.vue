<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>


#nav a {
  font-weight: bold;
  color: #2c3e50;
}
html {
    height: 100%;
}
body{
  height: 100%;
  margin: 0 0 0 0;
  background-color: pink;
}
#app{
  height: 100%;
  margin:0px;
}
#nav a.router-link-exact-active {
  color: #42b983;
}


</style>
