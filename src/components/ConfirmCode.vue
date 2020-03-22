<template>
  <div class="confirm-code-wrapper">
      <div class="confirm-code-modal">
          <div class="confirm-code-header">
              <span>Confirm Code</span>
              <button class="cancel-confirm-btn" type="button" @click="closeConfirmModal">X</button>
          </div>
          <div class="confirm-code-body">
                <input type="text" class="confirm-code-input" placeholder="Enter Code" v-model="code">
                <small>Locate code sent to email provided</small>
                <button class="request-new-code-btn" type="button" @click="requestNewCode">
                    <span v-if="requesting_code">Requesting...</span>
                    <span v-else>Request New Code</span>
                </button>
          </div>
          <div class="confirm-code-footer">
                <button class="confirm-code-btn" type="button" @click="sendCode" :disabled="confirming_code">
                   <span v-if="confirming_code">Confirming...</span>
                   <span v-else>Confirm Code</span>
                </button>
          </div>
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'ConfirmCode',
    props: ['client'],
    data() {
        return {
            code: null
        }
    },
    computed: {
        ...mapGetters(['confirming_code', 'requesting_code'])
    },
    methods: {
        sendCode() {
            this.$store.dispatch('confirmCode', this.code)
            .then(response => {
                this.$emit('code-confirmed')
            }).catch(error => {
                console.log(error.response.data)
            })
        },
        closeConfirmModal() {
            this.$store.commit('CODE_MODAL')
        },
        requestNewCode() {
            this.$store.dispatch('createNewCode', this.client)
        }
    }
}
</script>

<style lang="scss">
    .confirm-code-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0,0,0,.5);
        z-index: 1000;

        .confirm-code-modal {
            height: 300px;
            width: 500px;
            background: white;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border-radius: 8px;
            box-shadow: 0 0 10px 0 rgba(0,0,0,.25);

            .confirm-code-header {
                width: 100%;
                background: rgb(241, 241, 241);
                border-radius: 8px 8px 0 0;
                padding: 15px;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;

                .cancel-confirm-btn {
                    color: red;
                    font-weight: bold;
                    border: none;
                    outline: none;
                    background: transparent;
                    font-size: 1.2rem;
                    cursor: pointer;
                }
            }

            .confirm-code-body {
                display: flex;
                flex-direction: column;
                align-items: center;

                .confirm-code-input {
                    box-sizing: border-box;
                    width: 80%;
                    border: 1px solid lightgray;
                    padding: 10px;
                    font-size: 1.25rem;
                    border-radius: 5px;
                    margin-bottom: 5px;
                }

                small {
                    color: rgb(153, 153, 153);
                    font-weight: bold;
                }

                .request-new-code-btn {
                    background: transparent;
                    color: #0077ff;
                    border: none;
                    font-weight: bold;
                    margin-top: 10px;
                }
            }


            .confirm-code-btn {
                width: 100%;
                background: #0077ff;
                border: none;
                border-radius: 0 0 8px 8px;
                padding: 15px;
                color: white;
                font-weight: bold;
                font-size: 1.25rem;
                cursor: pointer;
                outline: none;
            }
        }
    }
</style>