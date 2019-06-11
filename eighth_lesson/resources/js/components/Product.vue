<template>
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
                <li v-for="(size, index) in sizes" :key="index">{{ size }}</li>
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
</template>
<script>
    import Vue from 'vue';
    import ProductDetails from './ProductDetails.vue';
    export default {
        components: {
            'product-details': ProductDetails,
        },
        props: {
            premium: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                brand: 'Vue Mastery',
                product: 'Socks',
                message: 'heh',
                selectedVariant: 0,
                details: ["90% cotton", "10% polyester", "Gender-neutral"],
                variants: [
                    {
                        variantId: 2234,
                        variantColor: "green",
                        variantImage: "./public/storage/vmSocks-green-onWhite.jpg",
                        variantQuantity: 12,
                        variantOnSale: false
                    },
                    {
                        variantId: 2235,
                        variantColor: "blue",
                        variantImage: "./public/storage/vmSocks-blue-onWhite.jpg",
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
                this.selectedVariant = index;
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
                    return 'Free';
                } else {
                    return '$2.99';
                }
            }
        }
    }
</script>

<style>
    body {
        font-family: tahoma;
        color:#282828;
        margin: 0px;
    }
    
    .nav-bar {
        background: linear-gradient(-90deg, #84CF6A, #16C0B0);
        height: 60px;
        margin-bottom: 15px;
    }

    .product {
        display: flex;
        flex-flow: wrap;
        padding: 1rem;
    }

    img {
        border: 1px solid #d8d8d8;
        width: 70%;
        margin: 40px;
        box-shadow: 0px .5px 1px #d8d8d8;
    }
    
    .product-image {
        width: 80%;
    }
    
    .product-image,
    .product-info {
        margin-top: 10px;
        width: 50%;
    }
    
    .color-box {
        width: 40px;
        height: 40px;
        margin-top: 5px;
    }
    
    .cart {
        margin-right: 25px;
        float: right;
        border: 1px solid #d8d8d8;
        padding: 5px 20px;
    }
    
    button {
        margin-top: 30px;
        border: none;
        background-color: #1E95EA;
        color: white;
        height: 40px;
        width: 100px;
        font-size: 14px;
    } 
    
    .disabledButton {
        background-color: #d8d8d8;
    }
    
    .review-form {
        width: 400px;
        padding: 20px;
        margin: 40px;
        border: 1px solid #d8d8d8;
    }
    
    input {
        width: 100%;  
        height: 25px;
        margin-bottom: 20px;
    }
    
    textarea {
        width: 100%;
        height: 60px;
    }

    .tab {
        margin-left: 20px;
        cursor: pointer;
    }

    .activeTab {
        color: #16C0B0;
        text-decoration: underline;
    }

    .outOfStock {
        text-decoration: line-through;
    }
</style>