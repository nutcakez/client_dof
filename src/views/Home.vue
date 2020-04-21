<template>
  <div id="home">

    <router-link to="/test">Go to game</router-link><br>
    <button type="button" style="width:100%" v-on:click="rules" class="btn  btn-info" >Rules</button>
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
    },
    rules:function(){
      alert("Your goal is to reduce the oppent's life to 0.\nEvery turn you get 3 gold. You can spend those by sending troops to fight or to buy units.\n The outcome is calculated from the cards you and your oppenent send to fight.\nThe damage you inflict is equal to: [Your oppents summarized defense]-[Your summarized attack power]\n The damage you take from your oppent is equal to [Your summarized defense]-[Your summarized attack]\n Tips:\n-Try to trcik your oppent!\n-Save gold to buy possible good units from the shopping round\n-Just because your oppent has a lot of gold it doesn't mean he is going to put units to fight")
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
