import Vue from 'vue';
import VueRouter from 'vue-router';
import FeedFrst from '../views/FeedFrst.vue';
import FeedScnd from '../views/FeedScnd.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'feedv1',
    component: FeedFrst,
  },
  { path: '/feedv1_v2', redirect: '/feedv1_v2/V1' },
  {
    path: '/feedv1_v2/:v',
    name: 'feedv1_v2',
    component: FeedScnd,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
