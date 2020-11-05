import React from 'react';
const Details = (props) => {
    document.title = "WorkoutNotebook - Details"
    const { name, createdAt, exercises } = props.location.state
    const setWorkoutName = () => {
        if (localStorage.getItem('language') === "POLISH" && name === "Unnamed") {
            return "Bez nazwy"
        }
        else if (localStorage.getItem('language') === "ENGLISH" && name === "Bez nazwy") {
            return "Unnamed"
        }
        else return name
    }

    return (
        <div className="previous_workouts_background">
            <div className="container" id="container">
                <div className="logoWord"><h1 className="word_first">Workouts</h1><h1 className="word_second">Notebook</h1></div>
                <h2>{setWorkoutName()}</h2>
                <div className="createdAt"><p> Created at  </p> <p>  {createdAt} </p></div>
                {exercises.map((item, index) => {
                    return (
                        <div key={index} name={props.name} className="one_exercise">
                            <h2>{item.name}</h2>
                            <div className="property">
                                <div className="column" >
                                    series
                                    {item.series.map((item, index) => {
                                    return (
                                        <h3 key={index} >{index + 1}</h3>
                                    )
                                })}
                                </div>
                                <div className="column">
                                    weight
                                    {item.series.map((item, index) => {
                                    return (
                                        <h3 key={index}>{item.weight} kg</h3>
                                    )
                                })}
                                </div>
                                <div className="column">
                                    reps
                                    {item.series.map((item, index) => {
                                    return (
                                        <h3 key={index}>{item.reps}</h3>
                                    )
                                })}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div >
        </div >
    );
}
export default Details;