import Vue from "vue";

import Pages from '@/apps/Pages/index.vue'
import Files from '@/apps/Files/index.vue'

import listify from '@/apps/util-views/components/listify/1.2.vue'
import loading from '@/apps/util-views/components/loading/index.vue'
import formBuilder from '@/apps/util-views/components/dqFormBuilder/index.vue'
import raw from '@/apps/util-views/components/raw/index.vue'

Vue.component("pageContent", Pages);
Vue.component("Files", Files)
Vue.component("listify", listify)
Vue.component("loading", loading)
Vue.component("formBuilder",formBuilder)
Vue.component("raw",raw)