var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        image: './public/storage/img/vmSocks-green-onWhite.jpg',
        inventory: 100,
        details: ["90% cotton", "10% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green"
            },
            {
                variantId: 2235,
                variantColor: "blue"
            }
        ],
        sizes: ['S', 'M', 'L', 'XL']
    }
});