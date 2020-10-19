import React from 'react';
import { useSelector } from 'react-redux'
const VerifyEmail = () => {
    const words = useSelector(state => state.selectLanguage)

    return (
        <div className="background_modal_settings">
            <div className="background_modal_settings_contnent">
                <p className="verify_email_text">{words.verify_email_text}</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffd901" width="80px" height="80px"><path d="M0 0h24v24H0z" fill="none" /><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
            </div>
        </div>
    );
}

export default VerifyEmail;