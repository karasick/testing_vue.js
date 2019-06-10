Vue.component('product-details', {
    props: {
        details: {
        type: Array,
        required: true
        }
    },
    template: `
        <ul>
        <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `
})

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <a v-bind:href="image"><img :src="image" alt=""></a>
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>

            <p v-if="sale">{{ sale }}</p>
            <p v-else><br /></p>
            
            <p v-if="inStock > 10">In Stock</p>
            <p v-else-if="inStock <= 10 && inStock > 0">Almost Sold Out!</p>
            <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
            <p>Shipping: {{ shipping }}</p>

            <product-details :details="details"></product-details>

            <div class="color-box" 
                v-for="(variant, index) in variants" 
                :key="variant.variantId" 
                :style="{ backgroundColor: variant.variantColor }" 
                @mouseover="updateProduct(index)">
            </div>

            <ul>
                <li v-for="size in sizes">{{ size }}</li>
            </ul>

            <button :class="{ disabledButton: !inStock }"
                v-on:click="addToCart()"
                :disabled="!inStock">Add to Cart</button>
            
            <div class="cart">
                <button v-on:click="removeFromCart()" v-show="cart">Remove from Cart</button>

                <p>Cart({{ cart }})</p>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
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
        }
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
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            } else {
                return 2.99
            }
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
});