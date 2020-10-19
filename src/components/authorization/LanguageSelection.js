import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectPolish, selectEnglish } from "../../Redux/actions/index"

const LanguageSelection = () => {
    const [language, setlanguage] = useState(useSelector(state => state.selectLanguage.LANGUAGE))
    const dispatch = useDispatch()

    const handleSelectLanguage = (e) => {
        if (e.target.id === "POLISH") {
            setlanguage("POLISH")
            dispatch(selectPolish())
            localStorage.setItem('language', "POLISH")
        }
        else {
            setlanguage("ENGLISH")
            dispatch(selectEnglish())
            localStorage.setItem('language', "ENGLISH")
        }
    }
    return (
        <>
            <div className="select_language_container">
                <button onClick={(e) => handleSelectLanguage(e)} className={language === "ENGLISH" ? "selected_language_button" : undefined}>ENG</button>
                <button id="POLISH" onClick={(e) => handleSelectLanguage(e)} className={language === "POLISH" ? "selected_language_button" : undefined}>PL</button>
            </div>
        </>
    );
}
export default LanguageSelection;