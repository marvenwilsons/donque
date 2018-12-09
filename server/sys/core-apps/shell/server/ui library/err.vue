<template>
    <div class="">
        <span>
            <span id="terminal-output-err-indicator">[ error ]</span>  {{val}}
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
    color: rgb(255, 0, 0);
    /* padding: 0px calc(var(--fontSize)*1.25); */
    letter-spacing: 1px;
    font-weight: bold;
    margin-right: calc(var(--fontSize)*0.25);
}
.terminal-output-err-indicator-wrapper{
    padding: calc(var(--fontSize)*1.25);
}
</style>


