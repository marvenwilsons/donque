<template>
    <div id="dqhead-wrapper" class="flex">
        <div>
            <div class="dqhead-items" > <strong>dq-studio / {{siteTitle}}</strong> </div>
        </div>
        <div class="flex">
            <div class="dqhead-items">{{username}}</div>
            <div @click="logout" class="dqhead-items pointer">sign out</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            siteTitle: undefined,
            title:undefined,
            username: undefined
        }
    },
    methods:{
        logout(){
            location.href = "dqlogin"
        }
    },
    mounted(){
        this.siteTitle = this.$store.state.admin.siteTitle
        this.title = this.$store.state.admin.title
        this.username = this.$store.state.admin.username
    }
}
</script>

<style>
#dqhead-wrapper{
    justify-content: space-between;
    padding-left: calc(var(--fontSize)*1.25);
    padding-right: calc(var(--fontSize)*1.25);
}
.dqhead-items{
    padding-top: calc(var(--fontSize)*0.50);
    padding-bottom: calc(var(--fontSize)*0.50);
    padding-left: calc(var(--fontSize)*0.25);
    color: white;
}
</style>


