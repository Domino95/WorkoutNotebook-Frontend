import React, { useState } from 'react';
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

const AuthComponent = ({ loginView, setuserId, handleSetForm }) => {
    const [email, setemail] = useState("")
    const [name, setName] = useState("")
    const [password, setpassword] = useState("")
    const [repeatPassword, setrepeatPassword] = useState("")
    return (
        <>
            {loginView ?
                <SignInForm
                    setuserId={setuserId}
                    email={email}
                    setemail={setemail}
                    password={password}
                    setpassword={setpassword} />
                :
                <SignUpForm
                    email={email}
                    setemail={setemail}
                    name={name}
                    setName={setName}
                    password={password}
                    setpassword={setpassword}
                    repeatPassword={repeatPassword}
                    setrepeatPassword={setrepeatPassword}
                    loginView={loginView}
                    handleSetForm={handleSetForm}
                />}
        </>
    );
}
export default AuthComponent;