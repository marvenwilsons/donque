<template>
  <main role="admin-layout" class="flex flexcol">
      <nuxt/>
  </main>
</template>

<style>
@import url('@/server/sys/admin assets/css/tana 0.2.css');

:root{
  --size-1-half : calc(var(--fontSize)*0.25);
  --size-1-full : calc(var(--fontSize)*1.25);
  
  --size-2-half : calc(var(--fontSize)*1.25);

  /* colors */
  --dark-1: #393e42;
  --dark-2: #5c696f;
  --dark-3: #33383c;;
  --light-1: #e0e0e0;
}
.dq-pane-container-padding{
  padding-top: var(--size-1-half);
  padding-bottom: var(--size-1-half);
  padding-left: var(--size-1-half);
  padding-right: var(--size-1-half);
}

#__layout{
  min-height: 100vh;
  flex-basis: 100vw;
}
#__layout > main{
  min-height: inherit;
  position: relative;
  min-width: inherit;
  overflow: hidden;
  /* border: 5px solid blue; */
  flex-flow: row wrap;
  justify-content:center;
}
</style>
