<template>
    <!-- Edit form -->
    <form class="userpost_form-editpost">
        <div class="form-group">
            <slot name="cancelBtn"></slot>
            <textarea :value="textareaValue" @input="textToEdit($event)" :aria-label="textareaAriaAttribute"></textarea>
            <button type="submit" @click.prevent="onEditText" :aria-label="buttonAriaAttribute">
                <font-awesome-icon icon='paper-plane' color='#2b7b85' size="lg"/>
            </button>
        </div>
    </form>
</template>


<script>

export default {
    name: 'EditForm',
    props: {
        textareaValue: {
            type: String,
            required: true,
        },
        textareaAriaAttribute: {
            type: String,
        },
        buttonAriaAttribute: {
            type: String,
        } 
    },
    methods: {
        textToEdit(event) {
            this.$emit('trigger-text-to-edit', event.target.value)
        },
        onEditText() {
            this.$emit('trigger-on-edit-text')
        }
    },  
}
</script>


<style lang="scss" scoped>
     @import '@/assets/sass/variables.scss';
    @import '@/assets/sass/mixins.scss';

    .form-group {
        @include flexbox(space-between);
        width: 90%;
        margin: 0 40px;
        overflow:visible;
        position: relative;
        textarea {
            width: 85%;
            height: 70px;
            padding: 7px;
            margin-right: 7px;
            -ms-overflow-style: none;
            scrollbar-width: none;
            border-color: $border-color;
            outline: none;
            font-family: Avenir, Arial, Helvetica, sans-serif;
            resize: vertical;
            border-radius: 15px;
            font-size: 1rem;
            &:focus {
                outline: 1px solid $primary_color;
            }
            &::-webkit-scrollbar {
            display: none;
            }
        }
        button {
            @include btn(none);
            padding: 10px 12px 10px 10px;
            border: 1px solid $border-color;
            border-radius: 50%;
            &:focus {
                outline: 1px solid $primary_color;
            }
        }
    }
    @media screen and (max-width: 768px) {
        .form-group { margin: 0 0 !important; width: 100%; }
     }
    @media screen and (max-width: 550px) {
        .form-group { 
            flex-direction: column; 
            textarea { width: 100%; margin-bottom: 10px; }
        }
    }
</style>