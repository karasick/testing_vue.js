<template>
      <form class="review-form" @submit.prevent="onSubmit">
      
        <p class="error" v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
        </p>

        <p>
          <label for="name">Name:</label>
          <input id="name" v-model="name">
        </p>
        
        <p>
          <label for="review">Review:</label>      
          <textarea id="review" v-model="review"></textarea>
        </p>
        
        <p>
          <label for="rating">Rating:</label>
          <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </p>

        <p>Would you recommend this product?</p>
        <div class="buttons-radio">
            <label class="button-radio">Yes<input type="radio" value="Yes" v-model="recommend"/>
            </label>
            <label class="button-radio">No<input class="button-radio" type="radio" value="No" v-model="recommend"/>
            </label>
        </div>

        <p>
          <input type="submit" value="Submit">  
        </p>    
      
    </form>
</template>
<script>
    export default {
        data() {
            return {
                name: null,
                review: null,
                rating: null,
                recommend: null,
                errors: []
            }
        },
        methods: {
            onSubmit() {
                this.errors = [];
                if(this.name && this.review && this.rating && this.recommend) {
                    let productReview = {
                        name: this.name,
                        review: this.review,
                        rating: this.rating,
                        recommend: this.recommend
                    };
                    this.$emit('review-submitted', productReview);
                    this.name = null;
                    this.review = null;
                    this.rating = null;
                    this.recommend = null;
                } else {
                    if(!this.name) { this.errors.push("Name required."); }
                    if(!this.review) { this.errors.push("Review required."); }
                    if(!this.rating) { this.errors.push("Rating required."); }
                    if(!this.recommend) { this.errors.push("Recommendation required."); }
                }
            }
        }
    }
</script>