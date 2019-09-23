<template>
  <div>
    <ul>
      <li
        v-if="$store.state.pages.opt_cur_view === 'wrapper'"      >
        <div class="flex3">
          <i class="fas fa-cut padleft125"></i>
        </div>
        <div class="flex7">Cut</div>
        <div class="flex4"></div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
    data: () => ({

    }),
    methods: {

    }
};
</script>