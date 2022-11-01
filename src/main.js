import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Kursevi from './Kursevi.vue';
import Studenti from './Studenti.vue';


Vue.use(VueRouter);

const routes = [
    {path: '/kursevi', component: Kursevi},
    {path: '/', component: Studenti}
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
