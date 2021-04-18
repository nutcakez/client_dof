<template>
  <div id="home">
    
    <button type="button" style="width:100%" v-on:click="rules" class="btn  btn-info" >{{showtext('rules')}}</button>
    <button :class="buttonclass" v-on:click="CreateNewRoom">{{showtext('createnewroom')}}</button>
    <ul class="list-group">
        <li class="list-group-item" v-on:click="joinroom(room.roomid)"  v-for="room in rooms" v-bind:key="room">{{ room.roomid }}</li>
    </ul>
    
  </div>
</template>

<script>
let socket=require('../socketmanager.js').socket
let language=require('../language').language
export default {
  data:function(){
    return{
      rooms:[],
      text:"alma",
      btnText:"Create Game",
      buttonclass:"btn btn-primary btn-block",
      currentLanguage:"",
      language:language
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
        this.$router.push({name:'gamepage'})
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
    },
    showlang:function(){
      alert(this.$store.state.language)
    },
    showtext(whattype){
      return this.language[this.langz][whattype]
    }

  },
  created(){
    this.socketlisten()
    this.gamestart()
    //this.askStartingHand()
    this.receiveStartingHand()
  },
  computed: {
    langz () {
      return this.$store.state.language
    }
  }
}
</script>

<style scoped>
  #home{
    height:100%;
  }
</style>
