import { selectLanguage } from './selectLanguage'
import { isConfirmed } from './handleIsConfirmed'
import { combineReducers } from 'redux'

export const allReducers = combineReducers({
    selectLanguage,
    isConfirmed
})