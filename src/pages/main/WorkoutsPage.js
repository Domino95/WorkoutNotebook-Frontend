import React, { useState } from 'react';
import "../../styles/workoutsPage.css"
import CreateWorokut from '../../components/main/workoutsPage/createWorkout'
import Spinner from '../../components/spinners/SpinnerMain'
import TrainingComponent from '../../components/main/workoutsPage/TrainingComponent'
import { createTraining, deleteTraining } from '../../components/requests/requests'
import { useSelector } from 'react-redux'
const WorkoutsPage = () => {
    const words = useSelector(state => state.selectLanguage)
    const [createWorkout, setCreateWorkout] = useState(undefined)
    const [isLoading, setisLoading] = useState(false)
    const [nameWorkout, setnameWorkout] = useState(words.training_name)
    const trainingId = localStorage.getItem("training_id")
    document.title = "WorkoutNotebook - Workouts"


    const createTrainingFetch = () => {
        createTraining(setisLoading, nameWorkout)
    }

    const deleteTrainingFetch = () => {
        deleteTraining(setisLoading, trainingId, setCreateWorkout)
    }

    return (
        <>
            {  isLoading ? <Spinner /> :
                trainingId ? <TrainingComponent words={words} setCreateWorkout={setCreateWorkout} deleteTrainingFetch={deleteTrainingFetch} /> :
                    createWorkout ? <CreateWorokut words={words} setCreateWorkout={setCreateWorkout} createTrainingFetch={createTrainingFetch} setnameWorkout={setnameWorkout} /> :
                        <div className="workouts_background">
                            <div >
                                <svg onClick={() => setCreateWorkout(true)} height="60" viewBox="0 0 24 24" width="60"><path d="M0 0h24v24H0z" fill="none" /><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
                                <p>{words.CreateWorkout}</p>
                            </div>

                        </div>}
        </>
    );
}
export default WorkoutsPage;
