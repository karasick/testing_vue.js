import Vue from 'vue';
import Product from './components/Product.vue';
    
var app = new Vue({
    el: '#app',
    render: h => h(Product, {
        props: {
            premium: true
        },
    })
});