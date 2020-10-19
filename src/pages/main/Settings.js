import React, { useState } from 'react';
import LanguageSelection from '../../components/authorization/LanguageSelection'
import '../../styles/settings.css'
import { useSelector } from 'react-redux'
import Modal from '../../components/main/settings/modalSettings'
const Settings = (props) => {
    const [theme, setTheme] = useState("light")
    const [modalActive, setmodalActive] = useState(false)
    document.title = "WorkoutNotebook - Settings"
    const words = useSelector(state => state.selectLanguage)

    const handleSelectTheme = () => {
        if (localStorage.getItem("theme") === "light") {
            setTheme("dark")
            localStorage.setItem("theme", "dark")
            document.documentElement.setAttribute("data-theme", undefined);
        }
        else {
            setTheme("light")
            localStorage.setItem("theme", "light")
            document.documentElement.setAttribute("data-theme", "light");
        }
    }

    const handleLogout = () => {
        if (localStorage.getItem("training_id")) {
            setmodalActive(true)
        }
        else {
            props.logout()
        }
    }

    return (
        <>
            { modalActive && <Modal logout={props.logout} setmodalActive={setmodalActive} />}
            <div className="settings_background">
                <ul>
                    <div className="option_settings">{words.Languge} <LanguageSelection /></div>
                    <div className="option_settings" onClick={() => handleSelectTheme()} >{words.Theme}
                        {theme === "light" ? <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                            width="35px" height="35px" fill="#969292" viewBox="0 0 1049.000000 1280.000000">
                            <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                                fill="#969292" stroke="none">
                                <path d="M6015 12789 c-740 -46 -1469 -219 -2145 -509 -284 -121 -817 -407
                                                -985 -528 -22 -15 -108 -77 -191 -136 -179 -126 -366 -275 -521 -412 -163
                                                -144 -375 -344 -398 -375 -11 -15 -63 -74 -115 -131 -1223 -1342 -1815 -3153
                                                -1624 -4968 153 -1459 796 -2809 1835 -3849 665 -665 1429 -1156 2315 -1486
                                                406 -151 865 -268 1304 -330 341 -48 510 -59 900 -59 374 -1 519 8 810 45 85
                                                11 182 23 215 25 33 3 121 19 195 35 707 160 1097 293 1625 554 386 191 672
                                                366 1000 612 261 196 285 223 237 271 -17 17 -43 20 -233 25 -1742 51 -3386
                                                839 -4545 2177 -1184 1368 -1717 3206 -1453 5010 218 1494 969 2854 2124 3849
                                                116 100 115 98 115 132 0 52 -22 59 -186 58 -82 -1 -207 -6 -279 -10z"/>
                            </g>
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" height="30" fill="#969292" viewBox="0 0 24 24" width="30"><path d="M0 0h24v24H0z" fill="none" /><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z" /></svg>}
                    </div>
                    <div className="option_settings" onClick={() => handleLogout()}>{words.logout}
                        <svg version="1.1" id="Layer_1" x="0px" y="0px" width="89.149px" height="122.88px" viewBox="0 0 89.149 122.88"  ><g><path d="M79.128,64.598H40.069c-1.726,0-3.125-1.414-3.125-3.157c0-1.744,1.399-3.158,3.125-3.158h39.057L66.422,43.733 c-1.14-1.301-1.019-3.289,0.269-4.439c1.288-1.151,3.257-1.03,4.396,0.271l17.281,19.792c1.061,1.211,1.029,3.019-0.02,4.19 l-17.262,19.77c-1.14,1.302-3.108,1.423-4.396,0.271c-1.287-1.151-1.408-3.139-0.269-4.44L79.128,64.598L79.128,64.598z M42.396,116.674c1.689,0.409,2.727,2.11,2.318,3.799c-0.409,1.689-2.109,2.728-3.799,2.318c-3.801-0.922-7.582-1.671-11.052-2.358 C10.426,116.583,0,114.519,0,86.871V34.188C0,7.96,11.08,5.889,29.431,2.46c3.572-0.667,7.448-1.391,11.484-2.371 c1.689-0.409,3.39,0.629,3.799,2.319c0.408,1.689-0.629,3.39-2.318,3.799c-4.291,1.041-8.201,1.771-11.805,2.445 C15.454,11.48,6.315,13.188,6.315,34.188v52.683c0,22.467,8.643,24.179,24.756,27.37C34.453,114.911,38.138,115.642,42.396,116.674 L42.396,116.674z" /></g></svg>
                    </div>
                </ul>
            </div>
        </>
    );
}

export default Settings;