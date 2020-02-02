<template>
    <div class="screen">
        <div id="cardholder">
            <div class="card"  v-on:click="select(0)" v-bind:style="{ transform: shift, background:cardcolor[0] }">
                <div class="cardpic" >
                    <img id="kep" :src='cards[hand[0]].url'></img>
                </div>
                <span>{{cards[hand[0]].name}}</span><br>
                <span>Támadás: {{cards[hand[0]].attack}}</span><br>
                <span>Élet: {{cards[hand[0]].life}}</span><br>
                <span>Ár: {{cards[hand[0]].cost}}</span>
            </div>
            <div class="card" v-on:click="select(1)" v-bind:style="{ transform: shift, background:cardcolor[1] }">
                <div class="cardpic">
                    <img id="kep" :src='cards[hand[1]].url'></img>
                </div>
                <span>{{cards[hand[1]].name}}</span><br>
                <span>Támadás: {{cards[hand[1]].attack}}</span><br>
                <span>Élet: {{cards[hand[1]].life}}</span><br>
                <span>Ár: {{cards[hand[1]].cost}}</span>
            </div>
            <div class="card" v-on:click="select(2)"  v-bind:style="{ transform: shift, background:cardcolor[2] }">
                 <div class="cardpic">
                     <img id="kep" :src='cards[hand[2]].url'></img>
                 </div>
                 <span>{{cards[hand[2]].name}}</span><br>
                 <span>Támadás: {{cards[hand[2]].attack}}</span><br>
                 <span>Élet: {{cards[hand[2]].life}}</span><br>
                 <span>Ár: {{cards[hand[2]].cost}}</span>
            </div>
            <progress id="timebar" max="100" :value="loadbar" > 70% </progress>
            <h3>{{round}}round</h3>
            <button id="responsebutton" v-on:click="sendResponse">Send response</button>
            <span class="ownstat">Life: {{life}}</span><br>
            <span class="ownstat">Gold: {{gold}}</span><br>
            
        </div>
        <div id="stats">
            <div class="columns">
            Player2 <br>
            Gold:{{player2.gold}} <br>
            Life:{{player2.life}} <br>
            Deck:{{player2.deck}} <br>
            Graveyard:{{player2.graveyard}}
            </div>
            <div class="columns">

            </div>
            <div class="columns">

            </div>
        </div>
        <div id="history">
            <div class="columns">

            </div>
            <div class="columns">

            </div>
            <div class="columns">
                
            </div>
            <button v-on:click="surrender">Surrender</button>
        </div>
    </div>

</template>
<script>
let socket=require('../socketmanager.js')
let cardbase=require('../clientcards.js').Cards
export default {
    data: function(){
        return{
            shift:'translateX(0px)',
            round:'Fight',
            cardcolor:{0:'gray',
                    1:'gray',
                    2:'gray'},
            selected:[],
            cards:cardbase,
            hand:[0,1,2],
            life:20,
            gold:5,
            deck:3,
            graveyard:0,
            loadbar:100,
            timer:'',
            ownid:'',
            player2:{
                gold:5,
                life:20,
                deck:3,
                graveyard:3
            }

        }
    },
    methods: {
        shiftCards:function(){
            if(this.shift=='translateX(0px)'){
                this.shift='translateX(-1200px)'
            }
            else
            {
                this.shift='translateX(0px)'
            }
        },
        roundChange:function(){
            this.shiftCards()
            if(this.round=='Buy'){
                this.cardcolor[0]='coral'
                this.cardcolor[1]='coral'
                this.cardcolor[2]='coral'
            }
            else
            {
                this.cardcolor[0]='gray'
                this.cardcolor[1]='gray'
                this.cardcolor[2]='gray'
            }
            
            setTimeout(()=>this.shiftCards(),1100)
        },
        select:function(index){
            if(this.cardcolor[index]=='green'){
                //unselecting card
                this.gold+=this.cards[this.hand[index]].cost
                this.selected=this.removeElement(this.selected,index)
                if(this.round=="Fight"){
                    this.cardcolor[index]='gray'
                }
                else
                {
                    this.cardcolor[index]='coral'
                }
            }
            else
            {
                //Selecting new card
                if(this.round=="Fight"){
                    if(this.cards[this.hand[index]].cost<=this.gold){
                       this.gold=this.gold-this.cards[this.hand[index]].cost
                       this.cardcolor[index]='green'
                       this.selected.push(index)
                    }
                }
                else
                {
                    //first selection for buy round
                    if(this.selected.length==0){
                        if(this.cards[this.hand[index]].cost<=this.gold){
                            this.gold=this.gold-this.cards[this.hand[index]].cost
                            this.cardcolor[index]='green'
                            this.selected.push(index)
                        }
                    }
                    else
                    {
                        //second selection for buy round
                        let totalgold=this.cards[this.hand[this.selected[0]]].cost+this.gold
                        if(this.cards[this.hand[index]].cost<=totalgold){
                            let cardcolorkeys=Object.keys(this.cardcolor)
                            cardcolorkeys.forEach(element => {
                                this.cardcolor[element]='coral'
                            });
                            this.gold+=this.cards[this.hand[this.selected[0]]].cost
                            this.gold=this.gold-this.cards[this.hand[index]].cost
                            this.cardcolor[index]='green'
                            this.selected=[index]
                        }
                    }
                }
            }
        },
        removeElement:function(array,element){
            for( var i = 0; i < array.length; i++){ 
                if ( array[i] == element) {
                    array.splice(i, 1); 
                }
            }
            return array;
        },
        sendResponse:function(){
            socket.socket.emit('response',this.selected)
        },
        returnImgSrc:function(index){
            return this.cardTexts[index].img
        },
        cardhandle:function(){
            socket.socket.on('hand',data=>{
                if(this.round=='Fight')
                {
                    this.hand=data
                    this.loadbar=100
                        clearInterval(this.timer)
                        this.timer=setInterval(()=>{
                            this.loadbar--
                        },120)
                    setTimeout(()=>{
                        this.selected.forEach(element => {
                            this.gold=this.gold+this.cards[hand[element]].cost
                        });
                    },12000)
                }
                else
                {
                    //this.gold=this.gold+5
                    this.selected=[]
                    this.round='Fight'
                    this.roundChange()
                    setTimeout(()=>{
                      this.hand=data;
                      this.loadbar=100
                        clearInterval(this.timer)
                        this.timer=setInterval(()=>{
                            this.loadbar--
                        },120)
                    },1000)
                    setTimeout(()=>{
                        this.selected.forEach(element => {
                            this.gold=this.gold+this.cards[this.hand[element]].cost
                        });
                    },12000)
                }
            })
        },
        buyhandle:function(){
            socket.socket.on('buyround',data=>{
                this.selected=[]
                this.round='Buy'
                this.roundChange()
                setTimeout(()=>{
                    this.hand=data;
                    this.loadbar=100
                    clearInterval(this.timer)
                    this.timer=setInterval(()=>{
                        this.loadbar--
                    },120)
                },1000)
                setTimeout(()=>{
                        this.selected.forEach(element => {
                            this.gold=this.gold+this.cards[this.hand[element]].cost
                        });
                    },12000)
                
            })
        },
        playerstats:function(){
            socket.socket.on('status',data=>{
                console.log(data)
                Object.keys(data).forEach(key=>{
                    if(key!=socket.socket.id){
                        this.player2.gold=data[key].Gold
                        this.player2.life=data[key].Life
                        this.player2.graveyard=data[key].Graveyard
                        this.player2.deck=data[key].Deck
                    }
                    else
                    {
                        this.life=data[key].Life
                        this.gold=data[key].Gold
                        this.graveyard=data[key].Graveyard
                        this.deck=data[key].Deck
                    }
                })
            })
        },
        setOwnID:function(){
            this.ownid=socket.socket.id
        },
        victory:function(){
            socket.socket.on('victory',data=>{
                console.log("vicotryyy")
                alert("You win!")
                this.$router.push('/')
            })
        },
        lostgame:function(){
            socket.socket.on('lost',data=>{
                alert("You lost")
                this.$router.push('/')
            })
        },
        surrender:function(){
            console.log('sent surrender')
            //socket.socket.emit('surrender')
            this.$router.push('/')
        }

    },
    created(){
        this.cardhandle()
        this.buyhandle()
        this.setOwnID()
        this.playerstats()
        this.victory()
        this.lostgame()
    }
}
</script>
<style scoped>
.columns{
    width: 33.33%;
    float:left;
    height:100%;
}

h3{
    margin:0px;
}

#responsebutton{
    float:right;
    height: 20%;
    width:30%;
}

.card{
    width: 30%;
    height: 55%;
    background-color: gray;
    display: inline-block;
    margin:1%;
    vertical-align: top;
    border-radius: 8px;
    transition: 1s ease;
}
#vala{
    background-color: brown
}
#cardholder{
    background-color: lightblue;
    height:40%;
    text-align:center;
}

.screen{
    height: 100%;
}

#kep{
    width: 100%;
    max-height: 100%;
}
.cardpic{
    width:100%;
    height:40%;
}

#stats{
    height:30%;
    background: olive;
}

.ownstat{
    float:left;
    font-weight: bold;
}
@media screen and (max-height: 560px) {
    .card {
      background-color: lightgreen;
      font-size: small;
    }
    #responsesend{
        width:30%;
        height:20px;
        font-size: small;
    }
  }
</style>