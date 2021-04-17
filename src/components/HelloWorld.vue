<template>
    <div class="screen">
        <div id="cardholder">
            <div class="card"  v-on:click="select(0)" v-bind:style="{ transform: shift, background:cardcolor[0] }">
                <div class="cardpic" >
                    <img id="kep" :src='cards[hand[0]].url'/>
                </div>
                <span>{{cards[hand[0]].name}}</span><br>
                <span>{{showtext('attack')}}: {{cards[hand[0]].attack}}</span><br>
                <span>{{showtext('life')}}: {{cards[hand[0]].life}}</span><br>
                <span>{{showtext('cost')}}: {{cards[hand[0]].cost}}</span>
            </div>
            <div class="card" v-on:click="select(1)" v-bind:style="{ transform: shift, background:cardcolor[1] }">
                <div class="cardpic">
                    <img id="kep" :src='cards[hand[1]].url'/>
                </div>
                <span>{{cards[hand[1]].name}}</span><br>
                <span>{{showtext('attack')}}: {{cards[hand[1]].attack}}</span><br>
                <span>{{showtext('life')}}: {{cards[hand[1]].life}}</span><br>
                <span>{{showtext('cost')}}: {{cards[hand[1]].cost}}</span>
            </div>
            <div class="card" v-on:click="select(2)"  v-bind:style="{ transform: shift, background:cardcolor[2] }">
                 <div class="cardpic">
                     <img id="kep" :src='cards[hand[2]].url'/>
                 </div>
                 <span>{{cards[hand[2]].name}}</span><br>
                 <span>{{showtext('attack')}}: {{cards[hand[2]].attack}}</span><br>
                 <span>{{showtext('life')}}: {{cards[hand[2]].life}}</span><br>
                 <span>{{showtext('cost')}}: {{cards[hand[2]].cost}}</span>
            </div>
            <progress id="timebar" max="100" :value="loadbar" > 70% </progress>
            <h3>{{showtext(this.round)}}{{showtext('round')}}</h3>
            <b-button class="btn-sm" v-on:click="sendResponse" variant="success">{{showtext('send')}}</b-button>
            <b-button class="btn-sm" v-on:click="sendResponse" variant="success">{{showtext('surrender')}}</b-button>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-6">
                    {{showtext('own')}}
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <img style="padding-top:auto;float:left;height:20px;width:20px;" :src='icons["Life"].url'>HP: {{life}}
                        </li>
                        <li style="display:inline-block" class="list-group-item">
                            <img style="padding-top:auto;float:left;height:20px;width:20px;" :src='icons["Coin"].url'/>Gold: {{gold}}
                        </li>
                        <li class="list-group-item">
                            <img style="padding-top:auto;float:left;height:20px;width:20px;" :src='icons["Deck"].url'/>Deck: {{deck}}
                        </li>
                        <li class="list-group-item">
                            <img style="padding-top:auto;float:left;height:20px;width:20px;" :src='icons["Graveyard"].url'>Graveyard: {{graveyard}}
                        </li>
                    </ul>
                </div>
                <div class="col-6">
                    {{showtext('opponent')}}
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <img style="padding-top:auto;float:left;height:20px;width:20px;" :src='icons["Life"].url'>HP: {{player2.life}}
                        </li>
                        <li style="display:inline-block" class="list-group-item">
                            <img style="padding-top:auto;float:left;height:20px;width:20px;" :src='icons["Coin"].url'>Gold: {{player2.gold}}
                        </li>
                        <li class="list-group-item">
                            <img style="padding-top:auto;float:left;height:20px;width:20px;" :src='icons["Deck"].url'>Deck: {{player2.deck}}
                        </li>
                        <li class="list-group-item">
                            <img style="padding-top:auto;float:left;height:20px;width:20px;" :src='icons["Graveyard"].url'>Graveyard: {{player2.graveyard}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div id="history">
            <div class="historyheader">
                    {{showtext('history')}}
            </div>
            <div class="historycolumns">
                <span>{{showtext('attack')}}:{{ownhistorystat.attack}}</span>
                <span>{{showtext('defense')}}:{{ownhistorystat.defense}}</span>
                <div style="height:40px;width:100%;" >
                    <img v-for="cardid in ownhistory" v-bind:key="cardid" id="kep" :src='cards[cardid].url' style="width:40px !important;float:left;">
                </div>
                <div><span>{{showtext('damage')}}:{{ownhistorystat.damage}}</span></div>
            </div>
            <div class="historycolumns">
                <span>{{showtext('attack')}}:{{opponenthistorystat.attack}}</span>
                <span>{{showtext('defense')}}:{{opponenthistorystat.defense}}</span>
                <div style="height:40px;width:100%;" >
                    <img v-for="cardid in opponenthistory" v-bind:key="cardid" id="kep" :src='cards[cardid].url' style="width:40px !important;float:left;">
                </div>
                <div><span>Damage:{{opponenthistorystat.damage}}</span></div>
            </div>
            
        </div>
    </div>

</template>
<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
let socket=require('../socketmanager.js')
let cardbase=require('../clientcards.js').Cards
let icons=require('../icons.js').Icons
let language=require('../language').language
export default {
    data: function(){
        return{
            ownhistory:[1],
            opponenthistory:[2,3,4],
            ownhistorystat:{"attack":0,
                            "defense":0,
                            "damage":0
                            },
            opponenthistorystat:{"attack":0,
                                 "defense":0,
                                 "damage":0
            },
            icons:icons,
            shift:'translateX(0px)',
            round:'Fight',
            cardcolor:{
                    0:'gray',
                    1:'gray',
                    2:'gray'},
            selected:[],
            cards:cardbase,
            language:language,
            hand:[0,0,0],
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
                graveyard:0
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
        },
        history:function(){
            socket.socket.on('history',data=>{
                if(data.p1.id==socket.socket.id){
                    this.ownhistory=data.p1.deck
                    this.ownhistorystat.attack=data.p1.attack
                    this.ownhistorystat.defense=data.p1.defense
                    this.ownhistorystat.damage=data.p1.damage

                    this.opponenthistory=data.p2.deck
                    this.opponenthistorystat.attack=data.p2.attack
                    this.opponenthistorystat.defense=data.p2.defense
                    this.opponenthistorystat.damage=data.p2.damage
                }
                else
                {
                    this.ownhistory=data.p2.deck
                    this.ownhistorystat.attack=data.p2.attack
                    this.ownhistorystat.defense=data.p2.defense
                    this.ownhistorystat.damage=data.p2.damage

                    this.opponenthistory=data.p1.deck
                    this.opponenthistorystat.attack=data.p1.attack
                    this.opponenthistorystat.defense=data.p1.defense
                    this.opponenthistorystat.damage=data.p1.damage
                }
            })
        },
        showtext(whattype){
            return this.language[this.langz][whattype]
        }

    },
    created(){
        this.cardhandle()
        this.buyhandle()
        this.setOwnID()
        this.playerstats()
        this.victory()
        this.lostgame()
        this.history()
    },
    computed: {
        langz () {
            return this.$store.state.language
        }
  }
}
</script>
<style scoped>
.columns{
    width: 33.33%;
    float:left;
    height:100%;
}
.historycolumns{
    width:50%;
    float:left;
    height:90%;
}
.historycolumns span{
    display:block;
    text-align: center;
    font-size:20px;;
}
.historycolumns img{
    height:40px;
    float:left;
    margin-left:5%;
}
.historyheader{
    height:10%;
    background-color: yellowgreen;
    text-align: center;

}
.staticons{
    float:left;
    width:10px;
    height:50px;
}

h3{
    margin:0px;
    padding-bottom: 5px;
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
    border-radius: 8px;
}
.cardpic{
    width:100%;
    height:40%;
}

#stats{
    height:30%;
    background: olive;
    font-size: 20px;
}

.ownstat{
    float:left;
    font-weight: bold;
}
.row{
    height:30%;
    width:100%;
    background-color: rgb(173, 179, 165);
    margin:0 0 0 0;
}
.container{
    padding:0 0 0 0;
    display:inline;
    background-color: greenyellow;
}
.col-6{
    background-color:lightblue;
}

.list-group-item{
    background-color:lightblue;
}
@media screen and (max-height: 640px) {
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