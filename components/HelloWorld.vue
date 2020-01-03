<template>
    <div class="screen">
        <div id="cardholder">
            <div class="card"  v-on:click="select(0)" v-bind:style="{ transform: shift, background:cardcolor[0] }">
                <div class="cardpic" >
                    <img id="kep" :src="cardTexts[0].img"></img>
                </div>
                <span>{{cardTexts[0].name}}</span><br>
                <span>Támadás: {{cardTexts[0].attack}}</span><br>
                <span>Élet: {{cardTexts[0].life}}</span><br>
                <span>Ár: {{cardTexts[0].cost}}</span>
            </div>
            <div class="card" v-on:click="select(1)" v-bind:style="{ transform: shift, background:cardcolor[1] }">
                <div class="cardpic">
                    <img id="kep" :src="require(cardTexts[1].img)"></img>
                </div>
                asd
                asd
            </div>
            <div class="card" v-on:click="select(2)"  v-bind:style="{ transform: shift, background:cardcolor[2] }">
                 <div class="cardpic">
                     <img id="kep" src='../images/pic1.jpg'></img>
                 </div>
            </div>
            <h3>Fight round</h3>
        </div>
        <button v-on:click="shiftCards">SHIFT</button>
        <button v-on:click="roundChange">change</button>
    </div>

</template>
<script>

export default {
    data: function(){
        return{
            shift:'translateX(0px)',
            round:'fight',
            cardcolor:{0:'gray',
                    1:'gray',
                    2:'gray'},
            selected:[],
            cardTexts:{
                0:{
                    name:'barakk',
                    attack:2,
                    life:3,
                    cost:5,
                    img:'http://localhost:2000/pic1.jpg'
                },
                1:{
                    name:'barakk',
                    attack:2,
                    life:3,
                    cost:5,
                    img:'./images/pic1.jpg'
                },
                2:{
                    name:'barakk',
                    attack:2,
                    life:3,
                    cost:5,
                    img:'../images/pic1.jpg'
                }

            }
        }
    },
    methods: {
        shiftCards:function(){
            if(this.shift=='translateX(0px)'){
                this.shift='translateX(-600px)'
            }
            else
            {
                this.shift='translateX(0px)'
            }
        },
        roundChange:function(){
            this.shiftCards()
            if(this.round=='buy'){
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
            console.log(this.selected)
            if(this.cardcolor[index]!='green'){
                this.cardcolor[index]='green'
                this.selected.push(index)
            }
            else
            {
                if(this.round=='fight'){
                    this.cardcolor[index]='gray'
                    this.selected=this.removeElement(this.selected,index)
                }
                else
                {
                    this.cardcolor[index]='coral'
                    this.selected=this.removeElement(this.selected,index)
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

        },
        returnImgSrc:function(index){
            return this.cardTexts[index].img
        }


    },
}
</script>
<style scoped>
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