import Vue from 'vue';
import Router from 'vue-router';
import CustomerList from '@/components/Customer/List';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CustomerList',
      component: CustomerList,
    },
  ],
});
