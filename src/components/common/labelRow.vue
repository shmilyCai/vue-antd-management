<template>
    <div>
        <div v-for = "(value,key,index) in config" :key = "index" class="item-center row">
            <div :style = "{width:labelWidth}">{{value}}:</div>
            <span>{{rowData[key] || "-"}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            config:{
                type:Object,
                default:{}
            },
            rowData:{
                type:Object,
                default:()=>{
                    return {}
                }
            },
            labelWidth:{
                type:String,
                default:"70px",
            }
        }
    }
</script>

<style lang="scss" scoped>
    .row{
        line-height: 34px;
    }
</style>