<template>
  <div id="home">

    <router-link to="/test">Go to game</router-link><br>
    <button :class="buttonclass" v-on:click="CreateNewRoom">{{btnText}}</button>
    <ul class="list-group">
        <li class="list-group-item" v-on:click="joinroom(room.roomid)"  v-for="room in rooms">{{ room.roomid }}</li>
    </ul>
    
  </div>
</template>

<script>

// @ is an alias to /src
let socket=require('../socketmanager.js').socket
export default {
  data:function(){
    return{
      rooms:[],
      text:"alma",
      btnText:"Create Game",
      buttonclass:"btn btn-primary btn-block"
    }
  },
  methods:{
    CreateNewRoom:function(){
      this.btnText="Waiting for a player to join";
      this.buttonclass="btn btn-info btn-block"
      socket.emit('CreateNewRoom');
      
    },
    updatearray:function(data){
      this.rooms=data;
    },
    socketlisten:function(){
      socket.on('availablerooms',data=>{
        this.rooms=data.rooms
        console.log(this.rooms)
      })
    },
    gamestart:function(){
      socket.on('gamestart',()=>{
        this.$router.push({name:'HelloWorld'})
      })
    },
    joinroom:function(roomID){
      let roomid={room:roomID}
      socket.emit('joinroom',roomid)
    },
    askStartingHand:function(){
      socket.emit('hand')
    },
    receiveStartingHand:function(){
      socket.on('hand',function(){
        
      })
    }
  },
  created(){
    this.socketlisten()
    this.gamestart()
    //this.askStartingHand()
    this.receiveStartingHand()
  }
}
</script>

<style scoped>
  #home{
    height:100%;
  }
</style>
