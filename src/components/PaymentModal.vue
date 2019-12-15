<template>
    <div class="payment-modal-container">
        <div class="payment-modal">
            <div class="form-header" :class="{'payment-header': showInvoice}">
                <p>
                    Payment is required before accessing this document
                </p>
            </div>
            <div class="invoice" v-if="showInvoice">
                <table class="table">
                    <thead>
                        <tr>
                            <td>Item</td>
                            <td>Qty</td>
                            <td>Amount</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tax Return</td>
                            <td>1</td>
                            <td>$500.00</td>
                        </tr>
                    </tbody>
                </table>
                <div class="note">
                    <div class="note-header"><span>Message:</span></div>
                    <p>This is a note regarding the invoice</p>
                </div>
            </div>
            <button type="button" class="submit-btn payment-btn" @click="toggle()" v-if="!showInvoice">View Invoice</button>
            <button type="button" class="submit-btn close-btn" @click="toggle()" v-if="showInvoice">Close Invoice</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PaymentModal',
    data() {
        return {
            showInvoice: false
        }
    },
    methods: {
        toggle() {
            this.showInvoice = !this.showInvoice
        }
    }
}
</script>

<style lang="scss">
.payment-modal-container{
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, .2);
    position: absolute;
    top: 0;
    overflow: hidden;
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .payment-modal {
        background: white;
        border-radius: 5px;
        box-shadow: 0 0 10px 0 rgba(0,0,0,.5);
        max-width: 500px;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .payment-header {
            margin-bottom: 20px;
        }

        .close-btn {
            margin-top: 20px;
            align-self: flex-end;
            background: rgb(233, 233, 233)!important;
            border: 1px solid black!important;
            color: black;
        }

        .payment-btn {
            margin-top: 20px;
            align-self: flex-end;
        }

        .invoice {
            width: 100%;

            .table {
                width: 100%;
                border-bottom: 2px solid #0077ff;
                border-collapse: collapse;

                thead {
                    
                    tr {

                        td {
                            border: 2px solid gray;
                            margin: 0;
                        }
                    }
                }

                tbody {
                    tr {
                        td {
                            padding: 10px;
                            border-left: 2px solid gray;
                            border-right: 2px solid gray;
                            margin: 0;
                        }
                    }
                }
            }

            .note {
                border-left: 2px solid gray;
                border-right: 2px solid gray;
                border-bottom: 2px solid gray;

                .note-header {
                    background: rgb(233, 233, 233);
                    padding: 10px;
                    text-align: left;
                    margin-bottom: 0;
                }

                p {
                    margin: 0;
                    padding: 10px;
                }
            }
        }
    }
}


</style>
