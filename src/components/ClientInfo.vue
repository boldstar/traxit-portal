<template>
    <div class="client-info-wrapper">
        <div class="client-info-input-wrapper">
            <input type="email" class="input" placeholder="Email" @input="handleInput($event, 'email')" :class="{'input-error': alarm.length > 0 && alarm.includes('email')}" @change="handleChange('email')">
            <i class="fas fa-check" v-if="model['email'] && !alarm.includes('email')" :key="upload_success"></i>
        </div>
        <div class="client-info-input-wrapper">
            <input type="text" class="input" placeholder="First Name" @input="handleInput($event, 'first_name')" :class="{'input-error': alarm.length > 0 && alarm.includes('first_name')}" @change="handleChange('first_name')">
            <i class="fas fa-check" v-if="model['first_name'] && !alarm.includes('first_name')" :key="upload_success"></i>
        </div>
        <div class="client-info-input-wrapper">
            <input type="text" class="input" placeholder="Last Name" @input="handleInput($event, 'last_name')" :class="{'input-error': alarm.length > 0 && alarm.includes('last_name')}" @change="handleChange('last_name')">
            <i class="fas fa-check" v-if="model['last_name'] && !alarm.includes('last_name')" :key="upload_success"></i>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'ClientInfo',
    props: ['data', 'alarm'],
    data() {
        return {
            model: {}
        }
    },
    computed: {
        ...mapGetters(['upload_success'])
    },
    methods: {
        handleInput(event, prop) {
            this.$set(this.model, prop, event.target.value)
            return this.$emit('input', this.model)
        },
        setCurrentValue(model) {
            this.model = model
        } ,
        handleChange(key) {
            this.$emit('input-change', key)
        }
    },
    watch: {
        value (val) {
            if (!val) return
            this.setCurrentValue(val)
        },
    },
    created() {
        var self = this
        setTimeout(() => {
            self.model = self.data
        }, 200)
    }
}
</script>

<style>

.client-info-wrapper {
    box-sizing: border-box;
}

.input-error {
    border: 1px solid red;
}

.client-info-input-wrapper {
    position: relative;
    box-sizing: border-box;
}

.client-info-input-wrapper input {
    width: 100%;
    position: relative;
}

.fa-check {
    position: absolute;
    top: 22px;
    color: green;
    right: 15px;
}
</style>
