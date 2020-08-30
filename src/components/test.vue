<template>
    <div class="container">
        
    </div>
</template>
<script>
export default {
    data:function(){
            return{
                potato:[]
            }
        },
        methods:{
            thisisonload:function(){
                store.import
            }
        },
        created(){
            this.thisisonload()
        }
}
</script>
<style scoped>
    html,body{
        height:100%;
    }
    .container{
        height:100%;
        background-color:yellow;
    }
    .row{
        height:30%;
    }
    .col-4{
        height:30%;
        background-color:red;
    }
    .cards{
        height:40%;
    }
</style>
