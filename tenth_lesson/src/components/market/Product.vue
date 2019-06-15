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
            <p v-else :class="{ 'out-of-stock': !inStock }">Out of Stock</p>
            <p>Shipping: {{ shipping }}</p>

            <product-details :details="details"></product-details>

            <div class="color-box" 
                v-for="(variant, index) in variants" 
                :key="variant.variantId" 
                :style="{ backgroundColor: variant.variantData['color'] }" 
                @click="updateProduct(index)">
            </div>

            <ul>
                <li v-for="(size, index) in sizes" :key="index">{{ size }}</li>
            </ul>

            <button :class="{ 'disabled-button': !inStock }"
                v-on:click="addToCart()"
                :disabled="!inStock">Add to Cart</button>
        </div>
        
        <div class="product-reviews">
            <h2>Reviews</h2>
            <p v-show="!reviews.length">There are no reviews yet.</p>
            <ul>
                <li v-for="(review, index) in reviews" :key="index">
                <p>{{ review.name }}</p>
                <p>Rating: {{ review.rating }}</p>
                <p>{{ review.review }}</p>
                </li>
            </ul>
       </div>

    </div>
</template>
<script>
    import greenSocks from "../../assets/vmSocks-green-onWhite.jpg";
    import blueSocks from "../../assets/vmSocks-blue-onWhite.jpg";
    export default {
        props: {
            premium: {
                type: Boolean,
                default: false,
                required: true
            },
            cart: {
                type: Array,
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
                        variantData: {
                            'color': "green",
                            'image': greenSocks,
                            'quantity': 12,
                            'onSale': false
                        }
                    },
                    {
                        variantId: 2235,
                        variantData: {
                            'color': "blue",
                            'image': blueSocks,
                            'quantity': 3,
                            'onSale': true
                        }
                    }
                ],
                sizes: ['S', 'M', 'L', 'XL'],
                reviews: []
            }
        },
        methods: {
            addToCart() {
                this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
                --this.variants[this.selectedVariant].variantData['quantity'];
            },
            updateProduct(index) {
                this.selectedVariant = index;
            },
            removeFromCart() {
                for(let i = 0; i < this.variants.length; i++) {
                    if(this.cart[this.cart.length-1] == this.variants[i].variantId) {
                        this.cart.splice(-1,1);
                        ++this.variants[i].variantData['quantity'];
                        return;
                    }
                }
            },
            addReview(productReview) {
                this.reviews.push(productReview);
            }
        },
        computed: {
            title() {
                return this.brand + ' ' + this.product;
            },
            image() {
                return this.variants[this.selectedVariant].variantData['image'];
            },
            inStock() {
                return this.variants[this.selectedVariant].variantData['quantity'];
            },
            sale() {
            if (this.variants[this.selectedVariant].variantData['onSale']) {
                return this.brand + ' ' + this.product + ' are on sale!';
            } 
                return 0;
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