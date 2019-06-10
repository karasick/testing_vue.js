var app = new Vue({
    el: '#app',
    data: {
        brand: 'Vue Mastery',
        product: 'Socks',
        selectedVariant: 0,
        details: ["90% cotton", "10% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: "./public/storage/img/vmSocks-green-onWhite.jpg",
                variantQuantity: 12,
                variantOnSale: false
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: "./public/storage/img/vmSocks-blue-onWhite.jpg",
                variantQuantity: 0,
                variantOnSale: true
            }
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        cart: 0
    },
    methods: {
        addToCart() {
            ++this.cart;
            --this.variants[this.selectedVariant].variantQuantity;
        },
        updateProduct(index) {
            this.selectedVariant = index
        },
        removeFromCart() {
            if(this.cart != 0) {
                --this.cart;
                ++this.variants[this.selectedVariant].variantQuantity;
            }
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        sale() {
          if (this.variants[this.selectedVariant].variantOnSale) {
            return this.brand + ' ' + this.product + ' are on sale!';
          } 
            return;
        }
    }
});