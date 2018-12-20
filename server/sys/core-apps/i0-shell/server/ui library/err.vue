<template>
    <div class="">
        <span class="terminal-output-err" >
            <span id="terminal-output-err-indicator">[ error ]</span>  <span>{{val}}</span>
        </span>
    </div>
</template>

<script>
export default {
    props: ['val']
}
</script>

<style>
#terminal-output-err-indicator{
    color: orangered;
    /* padding: 0px calc(var(--fontSize)*1.25); */
    letter-spacing: 1px;
    /* font-weight: bold; */
    margin-right: calc(var(--fontSize)*0.25);
}
.terminal-output-err-indicator-wrapper{
    padding: calc(var(--fontSize)*1.25);
}
.terminal-output-err > *{
    font-family: monospace;
}
</style>


