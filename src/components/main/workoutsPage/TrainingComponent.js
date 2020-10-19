import React, { Component } from 'react';
import '../../../styles/training.css'
import Exercises from './Exercises'
import { exercises } from './exercisesList.json'
import { addExercise, deleteExercise } from '../../requests/requests'
import Spinner from '../../spinners/SpinnerMain'
import SelectSearch from 'react-select-search';
import "../../../styles/searchTraining.css"
import { scroller } from "react-scroll";
class TrainingComponent extends Component {

    state = {
        _id: localStorage.getItem("training_id"),
        createdAt: localStorage.getItem("createdAt"),
        nameWorkout: localStorage.getItem("nameWorkout"),
        addExercises: false,
        isLoading: false,
        exercise: ""
    }

    scrollTo = () => {
        scroller.scrollTo("add_exercises", {
        })
    }
    handleSetSpinner = () => (
        this.setState(prevState => ({
            isLoading: !prevState.isLoading
        }))
    )
    handleSetAndExercise = () => (
        this.setState({ addExercises: false })
    )
    handleExerciseInput = () => {
        this.setState({ addExercises: !this.state.addExercises })
    }
    handleSaveWorkout = () => {
        localStorage.setItem('exercises', "")
        localStorage.setItem('training_id', "")
        localStorage.setItem('nameWorkout', "")
        localStorage.setItem("createdAt", "")
        this.setState({ _id: null, createdAt: null, nameWorkout: null, exercise: null })
        this.props.setCreateWorkout(false)
    }
    addExerciseFetch = async () => {
        this.handleSetSpinner()
        await addExercise(this.state.exercise, this.handleSetAndExercise)
        this.handleSetSpinner()
        this.scrollTo()
    }
    deleteExerciseFetch = async (exerciseId) => {
        this.handleSetSpinner()
        await deleteExercise(exerciseId, this.handleSetAndExercise)
        this.handleSetSpinner()
        this.scrollTo()
    }

    render() {
        return (
            <>
                {this.state.isLoading ?
                    <Spinner />
                    :
                    <div className="trainingComponent_background">
                        <div className="container" id="container">
                            <div className="logoWord"><h1 className="word_first">Workouts</h1><h1 className="word_second">Notebook</h1></div>
                            <h2>{this.state.nameWorkout}</h2>
                            <div className="createdAt"><p> {this.props.words.CreatedAt}  </p> <p>  {new Date(this.state.createdAt).toLocaleString().slice(0, -3)} </p></div>
                            <Exercises handleSetSpinner={this.handleSetSpinner} deleteExerciseFetch={this.deleteExerciseFetch} />
                            {this.state.addExercises &&
                                <div className="exercises_add_container">
                                    <SelectSearch options={exercises} value={this.state.exercise} onChange={target => this.setState({ exercise: target })} search name="language" placeholder={this.props.words.SelectTraining} />
                                    <button onClick={() => this.addExerciseFetch()} className="submit_add"> {this.props.words.add} </button>
                                </div>
                            }
                            <div className="add_exercises_section" >
                                <div name="add_exercises" onClick={() => this.handleExerciseInput()} className={this.state.addExercises ? " add_exercises_active" : "add_exercises"} />
                                <p>{!this.state.addExercises ? this.props.words.AddExercise : this.props.words.Cancel} </p>
                            </div>
                        </div>
                        <div className="buttons_exercises" >
                            <button onClick={() => this.handleSaveWorkout()} className="handle_trainig" >{this.props.words.SaveWorkout} </button>
                            <button onClick={() => this.props.deleteTrainingFetch()} className="handle_trainig" id="handle_trainig">{this.props.words.DeleteWorkout} </button>
                        </div>
                    </div >
                }
            </>
        );
    }
}

export default TrainingComponent;