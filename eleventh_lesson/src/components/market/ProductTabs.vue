<template>
    <div class="review-tabs">
        <span class="tab" v-for="(tab, index) in tabs" 
            :key="index"
            @click="selectedTab = tab"
            :class="{ 'active-tab': selectedTab == tab }">
            {{ tab }}
        </span>

        <div class="product-reviews" v-show="selectedTab === 'Reviews'">
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

        <product-review @review-submitted="addReview" v-show="selectedTab === 'Make a Review'"></product-review>
    </div>
</template>
<script>
    export default {
        props: {
            reviews: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                tabs: ['Reviews', 'Make a Review'],
                selectedTab: 'Reviews'
            }
        },
        methods: {
            addReview(productReview) {
                this.$emit('review-submitted', productReview);
            }
        },
    }
</script>