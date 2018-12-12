<template>
  <main role="admin-layout" class="flex flexcol">
      <nuxt/>
  </main>
</template>

<style>
@import url('@/server/sys/admin assets/css/tana 0.2.css');
@import url('@/server/sys/admin assets/css/normalize.css');

:root{
  --size-1-half : calc(var(--fontSize)*0.25);
  --size-1-full : calc(var(--fontSize)*1.25);
  
  --size-2-half : calc(var(--fontSize)*1.25);

  /* dark */
  --dark-1: #393e42;
  --dark-2: #5c696f;
  --dark-3: #33383c;

  /* light */
  --light-1: #e0e0e0;

  /* blue */
  --blue-1: #0086c0;
  --blue-2: #86a6bd;
  --blue-3: #e9eff3;
  --blue-4: #f4f7f9;
  --blue-text: #2d4455;

  /* hovers */
  --hover-blue: var(--blue-2)

}
.dq-pane-container-padding{
  padding-top: var(--size-1-half);
  padding-bottom: var(--size-1-half);
  padding-left: var(--size-1-half);
  padding-right: var(--size-1-half);
}
html,body{

}
#__layout{
  min-height: 100vh;
  min-width: 100vw;
  position: fixed;
  
  height:100%;
}
#__layout > main{
  min-height: inherit;
  max-height: inherit;
  position: relative;
  min-width: inherit;
  overflow: hidden;
  /* border: 5px solid blue; */
  flex-flow: row wrap;
  justify-content:center;
}
</style>
