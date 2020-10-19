import words from '../words.json'

export const selectLanguage = (state = words.ENGLISH, action) => {
    switch (action.type) {
        case 'POLISH':
            return state = words.POLISH
        case 'ENGLISH':
            return state = words.ENGLISH
        default:
            return state
    }
}