import Vue from 'vue'

export function toastError(message) {
    Vue.toasted.show(message, 
    {
        type: 'error', 
        className: 'toast-message',
        action: [
        {
            text: 'X',
            onClick: (e, toastObject) => {
            toastObject.goAway(0)
            },
            className: 'close-btn'
        }
        ]
    })
}

export function toastSuccess(message) {
    Vue.toasted.show(message, 
    {
        type: 'success', 
        className: 'toast-message',
        action: [
        {
            text: 'X',
            onClick: (e, toastObject) => {
            toastObject.goAway(0)
            },
            className: 'close-btn'
        }
        ]
    })
}