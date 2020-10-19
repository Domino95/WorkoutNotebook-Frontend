export const isConfirmed = (state = true, action) => {
    switch (action.type) {
        case true:
            return state = true
        case false:
            return state = false
        default:
            return state
    }
}