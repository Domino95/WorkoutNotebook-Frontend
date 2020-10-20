import React, { useState } from 'react';
import { toSignUpAnimation, toLogInAnimation } from '../../animations/login'
import AuthComponent from '../../components/authorization/AuthComponent'
import { useSelector } from 'react-redux'

const Authorization = (props) => {
    const [loginView, setloginView] = useState(true)
    const words = useSelector(state => state.selectLanguage)
    const handleSetForm = () => {
        if (loginView) {
            toSignUpAnimation()
            setloginView(!loginView)
        }
        else toLogInAnimation()
        setloginView(!loginView)
    }
    return (
        <>

            <div className="login_container_under" >
                <div className="login_option_select">
                    <p>{words.HaveAccount}</p>
                    <button onClick={() => handleSetForm()} >{words.SignIn}</button>
                </div>
                <div className="login_option_select">
                    <p>{words.DontHaveAccount}</p>
                    <button onClick={() => handleSetForm()} >{words.SignUp}</button>
                </div>
                <div className="authorization_background">
                    <div className="login_container" >
                        <div className={loginView ? "login_title_login" : "login_title"}>
                            <h2 >{loginView ? words.SignIn : words.SignUp}</h2>
                        </div>
                        <AuthComponent setuserId={props.setuserId} handleSetForm={handleSetForm} loginView={loginView} />
                    </div>
                </div>
            </div>
        </>
    );
}
export default Authorization;