<template>
  <div class="doc-tab" :class="{'current_tab': active}" @click="applyTabFilter">
      <span :class="{'current_tab_text': active}">{{filter_tab}}</span>
  </div>
</template>

<script>
export default {
    name: 'DocTab',
    props: ['filter_tab', 'active'],
    methods: {
        applyTabFilter() {
            this.$emit('filter')
        }
    }
}
</script>

<style lang="scss">
    .doc-tab {
        width: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 0;
        background: rgb(218, 218, 218);
        border-radius: 0;
        cursor: pointer;
        

        span {
            font-size: .8rem;
            font-weight: bold;
            color: rgb(92, 92, 92);
        }

        &:first-of-type {
            margin-left: 10px;
        }

    }

    .current_tab {
        border-bottom: transparent;
        background: white;
        border-radius: 5px 5px 0 0;
        border: 1px solid lightgray;
        border-bottom: none;

        .current_tab_text {
            font-weight: bold;
            color: #0077ff;
            font-size: 1rem;
        }
    }
</style>