import React from 'react';
import '../../../styles/modalSettings.css'
import { useSelector } from 'react-redux'
const ModalSettings = (props) => {
    const words = useSelector(state => state.selectLanguage)

    return (
        <div className="background_modal_settings">
            <div className="background_modal_settings_contnent">
                <p>{words.logoutInfo}</p>
                <p>{words.logoutQuestion}</p>
                <div className="modal_settings_buttons">
                    <button onClick={() => props.logout()}>{words.logout}</button>
                    <button onClick={() => props.setmodalActive(false)}>{words.Cancel}</button>
                </div>
            </div>

        </div>


    );
}

export default ModalSettings;