import "../../styles/previousWorkoutList.css"
import React, { Component } from "react";
import { getWorkouts } from '../../components/requests/requests'
import Spinner from '../../components/spinners/SpinnerMain'
import SingleWorkout from '../../components/main/Details/SingleWorkout'

class PreviousWorkout extends Component {
    state = {
        previousWorkout: null,
        isLoading: false
    }

    handleSetSpinner = () => (
        this.setState(prevState => ({
            isLoading: !prevState.isLoading
        })))

    async componentDidMount() {
        this.handleSetSpinner()
        const previousWorkout = await getWorkouts()
        this.setState({ previousWorkout })
        this.handleSetSpinner()
    }
    render() {
        document.title = "WorkoutNotebook - Previous"

        return (
            this.state.isLoading ? <Spinner /> :
                <div className="previous_workouts_background">
                    {this.state.previousWorkout && this.state.previousWorkout.length !== 0 ?
                        this.state.previousWorkout.map((item, index) => {
                            return (
                                <SingleWorkout
                                    key={index}
                                    name={item.name}
                                    createdAt={new Date(item.createdAt).toLocaleString().slice(0, -3)}
                                    exercises={item.exercises}
                                />
                            )
                        }).reverse() :
                        <>
                            <p className="previous_workouts_background_text"> You have not any training sessions yet </p>
                        </>
                    }
                </div>
        );
    }
}

export default PreviousWorkout;