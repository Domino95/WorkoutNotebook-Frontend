import React, { useState } from 'react';
import Spinner from '../spinners/Spinner'
import { useSelector } from 'react-redux'

const SignUpForm = ({ repeatPassword, name, email, password, setrepeatPassword, setName, setpassword, setemail, handleSetForm }) => {
    const [errorEmail, setErrorEmail] = useState("")
    const [errorName, setErrorName] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorRepeatPassword, setErrorRepeatPassword] = useState("")
    const [errorFromServer, setErrorFromServer] = useState("")
    const [loading, setloading] = useState(false)
    const words = useSelector(state => state.selectLanguage)

    const resetForm = () => {
        setErrorName("")
        setErrorEmail("")
        setErrorPassword("")
        setErrorRepeatPassword("")
        setErrorFromServer("")
    }
    const onSubmit = (event) => {
        event.preventDefault()
        resetForm()
        const isValid = validation()
        if (isValid) {
            setloading(true)
            const requestObject = {
                query: `
                mutation{
                    createUser(email:"${email.toLowerCase()}", password:"${password}", name:"${name}"){
                      email
                      password
                      _id
                      name
                    }
                    }`}
            fetch('http://localhost:4000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestObject),
                headers: {
                    'Content-Type': 'application/json'
                }

            })
                .then(response => {
                    if (response.status === 200 && response.status === 201) {
                        throw new Error("Failed")
                    }
                    return response.json()
                })
                .then(resData => {
                    console.log(resData)
                    if (resData.errors) {
                        setErrorFromServer(resData.errors[0].message)
                        setloading(false)
                    }
                    else {
                        setloading(false)
                        handleSetForm()
                    }
                })
                .catch(error => {
                    console.log(error)
                    setloading(false)
                })
        }
    }
    const validation = () => {
        if (email.trim().length < 4 || email.trim().indexOf("@") < 0) {
            setErrorEmail(words.ErrorEmail)
            return false
        }
        else if (name.length <= 6) {
            setErrorName(words.ErrorName)
            return false
        }
        else if (password.trim().length < 8) {
            setErrorPassword(words.ErrorPassword)
            return false
        }
        else if (repeatPassword.length !== password.length) {
            setErrorRepeatPassword(words.ErrorRepeatPassword)
            return false
        }
        else return true
    }
    return (
        <>
            <form className="input_container" onSubmit={(event) => onSubmit(event)} >
                {loading && <Spinner />}

                <div className="group">
                    <label className="icons" >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#969292" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none" /><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                    </label>
                    <input type="text" id="email" value={email} placeholder={words.YourEmail} onChange={(e) => setemail(e.target.value)}></input>
                    <p className="errorForm"> {errorEmail} </p>
                </div>

                <div className="group"> <label className="icons" >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#969292" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                </label>
                    <input type="text" id="name" value={name} placeholder={words.Name} onChange={(e) => setName(e.target.value)}></input>
                    <p className="errorForm">{errorName}  </p>
                </div>

                <div className="group"> <label className="icons" >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#969292" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none" /><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" /></svg>
                </label>
                    <input type="password" value={password} id="password" placeholder={words.Password} onChange={(e) => setpassword(e.target.value)}></input>
                    <p className="errorForm"> {errorPassword}</p>
                </div>

                <div className="group"> <label className="icons" >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#969292" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none" /><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" /></svg>
                </label>
                    <input type="password" value={repeatPassword} id="repeatpassword" placeholder={words.RepeatPassword} onChange={(e) => setrepeatPassword(e.target.value)}></input>
                    <p className="errorForm">{errorRepeatPassword} </p>
                </div>

                <p className="errorFormFromServer"> {errorFromServer}</p>
                <button >{words.Submit}</button>
            </form >
        </>
    );
}
export default SignUpForm;