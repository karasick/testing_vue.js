<template>
    <div class="cart">
        <button v-on:click="removeFromCart()" v-show="cart != 0">Remove from Cart</button>

        <p>Cart({{ cartLength }})</p>
    </div>
</template>
<script>
    export default {
        props: {
            cart: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                removeButton: false
            }
        },
        methods: {
            removeFromCart() {
                this.$emit('remove-from-cart');
            },
            showRemoveButton() {
                
            }
        },
        computed: {
            cartLength() {
                return this.cart.length;
            }
        }
    }
</script>