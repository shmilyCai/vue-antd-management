<template>
    <ul class="tab">
        <li 
            v-for = "(item,index) in tabList"
            @click="onChange(item,index)"
            :key = "index" 
            :class = "{'active-nav':currentIndex == index}">
            <a>{{item.name}}</a>
        </li>
    </ul>
</template>

<script>
    export default {
        props:{
            tabList:{
                type:Array,
                default:[],
            }
        },
        data(){
            return{
                currentIndex:0,
            }
        },
        methods:{
            onChange(item,index){
                this.currentIndex = index;
                this.$emit("onChange",item);
            }
        }
    }
</script>

<style lang="scss" scoped>
.tab{
    display: flex;
    a {
        color: rgba(0,0,0,.75);
        text-decoration: none;
    }
    li {
        line-height: 45px;
        cursor: pointer;
        padding:0 15px;
        &:after {
            content: "";
            display: block;
            width: 0%;
            margin: 0 auto;
            border-bottom: 2px solid #906b41;
            transition: all .3s ease-in-out;
        }
        &.active-nav {
            a {
                color: #906b41;
            }
            &:after {
                width: 100%;
            }
        }
    }
}
</style>