import Vue from 'vue'

Vue.component('cart', require('./Cart').default);
Vue.component('product', require('./Product').default);
Vue.component('product-details', require('./ProductDetails').default);
Vue.component('product-review', require('./ProductReview').default);
Vue.component('product-tabs', require('./ProductTabs').default);