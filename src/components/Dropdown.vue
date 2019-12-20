<template>
    <div class="dropdown-wrapper">
        <label :for="label">{{label}}: </label>
        <select :name="label" :id="label" v-model="option">
            <option value="All" selected>{{selected}}</option>
            <option v-for="(value, index) in options" :key="index" :value="value">{{value}}</option>
        </select>
    </div>
</template>

<script>
export default {
    name: 'Dropdown',
    props: ['label', 'options'],
    data() {
        return {
            selected: 'All'
        }
    },
    computed: {
        option: {
            get() {
                return this.selected
            },
            set(newValue) {
                this.$emit('input', newValue)
            }
        }
    }
}
</script>

<style lang="scss">
    .dropdown-wrapper {
        margin-right: 10px;

        select {
            border: 2px solid lightgray;
            border-radius: 3px;
            padding: 5px;
        }
    }

</style>
