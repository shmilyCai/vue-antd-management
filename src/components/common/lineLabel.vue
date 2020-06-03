<template>
    <div class="label">
        {{label}}
    </div>
</template>

<script>
    export default {
        props:{
            label:"",
        }
    }
</script>

<style lang="scss" scoped>
.label{
    color:rgba(0,0,0,.8);
    padding-left: 12px;
    position: relative;
    margin-bottom: 10px;
    &::before{
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top:2px;
        background: #735531;
        height:16px;
        width: 4px;
        border-radius: 2px;
    }
}
</style>