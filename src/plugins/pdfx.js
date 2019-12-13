export function setPage(e) {
    let myEvent = e.target.parent || e.currentTarget ;
    e.stopPropagation()
    var currentPage = myEvent.getAttribute('id');
    return currentPage
}

export function scrollTo(event, pages) {
    var value = event.target.value
    if(value > 0 && value <= pages) {
        return event.target.value
    } return false
}