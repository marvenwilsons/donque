<template>
    <div id="dqhead-wrapper" class="flex">
        <div>
            <div class="dqhead-items" >dq-studio</div>
        </div>
        <div class="flex">
            <div class="dqhead-items">Marven Wilson Donque</div>
            <div class="dqhead-items">sign out</div>
        </div>
    </div>
</template>

<script>
export default {
    
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
}
</style>


