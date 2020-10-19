import React, { useState, useEffect } from 'react';
import '../../styles/accountPageStyle.css'
import { getUser, updateUser } from '../../components/requests/requests'
import Spinner from '../../components/spinners/SpinnerMain'
import AnimatedNumber from 'react-animated-number'
import { useSelector, useDispatch } from 'react-redux'
import { setIsConfirmedTrue, setIsConfirmedFalse } from "../../Redux/actions/index"

const AccountPage = () => {
    const [isLoading, setisLoading] = useState(false)
    const [userData, setuserData] = useState()
    const [goal, setgoal] = useState("")
    const [name, setname] = useState("")
    const [photoUrl, setphotoUrl] = useState()
    const [selectedPhotoUrl, setSelectedPhotoUrl] = useState(null)
    const words = useSelector(state => state.selectLanguage)
    document.title = "WorkoutNotebook - Account"
    const dispatch = useDispatch()

    const handleSetSpinnerFalse = () => {
        setisLoading(false)
    }
    const handleSetSpinnerTrue = () => {
        setisLoading(true)
    }

    useEffect(() => {
        async function fetchDataUser() {
            const response = await getUser(handleSetSpinnerTrue, handleSetSpinnerFalse)
            if (response) {
                setisConfirmed(response.confirmed)
                setuserData(response)
                setgoal(response.goal)
                setname(response.name)
                response.photoUrl && setphotoUrl(response.photoUrl)
            }
        }
        const setisConfirmed = (confirmed) => {
            if (confirmed) {
                dispatch(setIsConfirmedTrue())
            }
            else dispatch(setIsConfirmedFalse())
        }

        fetchDataUser()
    }, [dispatch])



    const countNumberOfReps = () => {
        let counterReps = 0
        userData && userData.workouts.map(item => {
            item.exercises.map(item => {
                item.series.map(item => {
                    counterReps += item.reps
                    return null
                })
                return null
            })
            return null
        })
        return counterReps
    }

    const countNumberOfExercises = () => {
        let counterReps = 0
        userData && userData.workouts.map(item => {
            item.exercises.map(() => {
                counterReps++
                return null
            })
            return null
        })
        return counterReps
    }


    const setPhoto = (file) => {
        if (file.type.slice(0, 5) === 'image') {
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setSelectedPhotoUrl(reader.result)
            }
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault()
        setisLoading(true)
        await updateUser(name, goal, selectedPhotoUrl)
        setisLoading(false)
    }
    return (
        isLoading ? <Spinner /> :
            <>
                <div className="account_page_container">
                    <div className="account_page_background">
                        {photoUrl || selectedPhotoUrl ?
                            <div className="circle_container">
                                <div className="add_photo"  >
                                    <input type="file" onChange={(e) => setPhoto(e.target.files[0])} className="file" />
                                </div>
                                <div className="photo_container">
                                    <img src={selectedPhotoUrl ? selectedPhotoUrl : photoUrl && photoUrl} alt="userPhoto" />
                                </div>
                            </div>
                            :
                            <div className="circle_container">
                                <div className="add_photo"  >
                                    <input type="file" onChange={(e) => setPhoto(e.target.files[0])} className="file" />
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="100px" height="100px"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                            </div>
                        }
                        <div className="stats_container">
                            <div className="stats">
                                <AnimatedNumber
                                    value={userData && userData.workouts.length}
                                    formatValue={v => v.toFixed(0)}
                                    duration={1200}
                                />
                                <div> {words.workouts}</div>
                            </div>
                            <div className="stats">
                                <AnimatedNumber
                                    value={countNumberOfExercises()}
                                    formatValue={v => v.toFixed(0)}
                                    duration={1200}
                                />
                                <div> {words.exercies}</div>
                            </div>
                            <div className="stats">
                                <AnimatedNumber
                                    value={countNumberOfReps()}
                                    formatValue={v => v.toFixed(0)}
                                    duration={1200}
                                />
                                <div> {words.allReps}</div>
                            </div>
                        </div>
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className="user_data" >
                                <p>{words.FullName} </p>
                                <input type="text" value={name} onChange={(e) => setname(e.target.value)}></input>
                            </div>
                            <div className="user_data" >
                                <p>{words.email}</p>
                                <input disabled value={userData ? userData.email : ""}></input>
                            </div>
                            <div className="user_data" >
                                <p>{words.Goal}</p>
                                <input type="text" value={goal === "unset" ? "" : goal} onChange={(e) => setgoal(e.target.value)}></input>
                            </div>
                            <button>{words.Update}</button>
                        </form>
                    </div >
                </div>
            </>
    );
}

export default AccountPage;