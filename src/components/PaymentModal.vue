<template>
    <div class="payment-modal-container">
        <div class="payment-modal">
            <div class="form-header">
                <p>
                    Payment is required before viewing this document
                </p>
            </div>
            <button type="button" class="submit-btn payment-btn">Make Payment</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PaymentModal'
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

        .payment-btn {
            margin-top: 20px;
            align-self: flex-end;
        }
    }
}


</style>
