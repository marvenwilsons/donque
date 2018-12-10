<template>
  <main class="flex flexcol">
    <!-- <heading /> -->
    <main id="admin-p" class="flex"> 
      <nuxt/>
    </main>
    <!-- <footing /> -->
  </main>
</template>

<style>
@import url('@/server/sys/admin assets/css/normalize.css');
@import url('@/server/sys/admin assets/css/tana 0.2.css');
#__layout{
  min-width: 100vw;
  max-width: 100vw;
}
#__layout > main{
  min-height: 100vh;
  position: relative;
  /* border: 5px solid blue; */
  min-width: inherit;
  overflow: hidden;

  /* flex: 1; */
}
#admin-p{
  flex: 1;
}
#__layout > main > main{
  height: 100%;
  position: relative;
  /* border: 5px solid red; */
}
</style>
