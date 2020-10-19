import React from 'react';
import "../../../styles/workoutsPage.css"

const createWorkout = (props) => {

    return (
        <div className="create_workout_background">
            <div className="create_workout_container" >
                <div><h1 className="word_first">Workouts</h1><h1 className="word_second">Notebook</h1></div>
                <input placeholder={props.words.EnterNameOfTraining} onChange={(e) => props.setnameWorkout(e.target.value)}></input>
                <button onClick={() => props.createTrainingFetch()}>{props.words.Create}</button>
                <button onClick={() => props.setCreateWorkout(false)}>{props.words.Cancel}</button>
            </div>
        </div >
    );
}
export default createWorkout;