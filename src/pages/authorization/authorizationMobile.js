import React, { useState } from 'react';
import AuthComponent from '../../components/authorization/AuthComponent'
import { useSelector } from 'react-redux'

const AuthorizationMobile = (props) => {
    const [loginView, setloginView] = useState(false)
    const words = useSelector(state => state.selectLanguage)

    const handleSetForm = () => {
        if (loginView) setloginView(!loginView)
        else setloginView(!loginView)
    }
    return (
        <>
            <div className="authorization_header">
            </div>
            < div className="login_container" >
                <div className={loginView ? "login_title_login" : "login_title"}>
                    <h2 >{loginView ? words.SignIn : words.SignUp}</h2>
                </div>
                <AuthComponent setuserId={props.setuserId} handleSetForm={handleSetForm} loginView={loginView} />
                <div className="switchText">
                    <p>{loginView ? words.DontHaveAccount : words.HaveAccount}</p>
                    <h3 onClick={handleSetForm}>{loginView ? words.SignUp : words.SignIn}</h3></div>
            </div >
        </>
    );
}
export default AuthorizationMobile;
