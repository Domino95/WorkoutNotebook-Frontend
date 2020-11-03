import React, { useState } from 'react';
import { NavLink } from "react-router-dom"
import { useSelector } from 'react-redux'


const Navbar = () => {
    const words = useSelector(state => state.selectLanguage)
    const [classNaviBar, setclassNaviBar] = useState("navbar")
    window.onresize = () => {
        returnClassNameNavbar()
    }
    const returnClassNameNavbar = () => {
        if (window.innerHeight < 500) {
            setclassNaviBar("navbar-disabled")
        }
        else {
            setclassNaviBar("navbar")
        }
    }
    return (
        < div className={classNaviBar} >
            <ul className="navbar_nav">
                <li className="logo"><svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 0 24 24" fill="#ffd901" width="40"><path d="M0 0h24v24H0z" fill="none" /><path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z" /></svg>
                </li>

                <li className="nav_item">
                    <NavLink to="/account">
                        <div className="nav_item circle">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="#969292"
                                width="40px" height="40px">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                        </div>
                        <span className="link_text">{words.Account}</span>
                    </NavLink>
                </li>


                <li className="nav_item">
                    <NavLink to="/calendar">
                        <div className="nav_item circle">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                height="35" viewBox="0 0 24 24" width="35" fill="#969292">
                                <path d="M0 0h24v24H0z" fill="none" /><path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z" /></svg>
                        </div>
                        <span className="link_text">{words.Calendar}</span>
                    </NavLink>
                </li>
                <li className="nav_item">
                    <NavLink to="/workouts">
                        <div className="nav_item circle">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                height="35" viewBox="0 0 24 24" width="35" fill="#969292" >
                                <path d="M0 0h24v24H0z" fill="none" /><path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" /></svg>
                        </div>
                        <span className="link_text">{words.Workout}</span>
                    </NavLink>
                </li>
                <li className="nav_item">
                    <NavLink to="/previous">
                        <div className="nav_item circle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#969292" width="48px" height="48px"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" /></svg>
                        </div>
                        <span className="link_text">{words.Previous} </span>
                    </NavLink>
                </li>
                <li className="nav_item" >
                    <NavLink to="/settings">
                        <div className="nav_item circle">
                            <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 0 24 24" width="30" fill="#969292"><g><path d="M0,0h24v24H0V0z" fill="none" /><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" /></g></svg>
                        </div>
                        <span className="link_text">{words.Settings}</span>
                    </NavLink>
                </li>
            </ul>
        </div >
    );
}

export default Navbar;