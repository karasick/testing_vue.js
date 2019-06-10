var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        image: './public/storage/img/vmSocks-green-onWhite.jpg',
        inStock: 15,
        details: ["90% cotton", "10% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: "./public/storage/img/vmSocks-green-onWhite.jpg"
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: "./public/storage/img/vmSocks-blue-onWhite.jpg"
            }
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        cart: 0
    },
    methods: {
        addToCart() {
            ++this.cart;
            --this.inStock;
        },
        updateProduct(variantImage) {
            this.image = variantImage
        },
        removeFromCart() {
            if(this.cart != 0) {
                --this.cart;
                ++this.inStock;
            }
        }
    }
});