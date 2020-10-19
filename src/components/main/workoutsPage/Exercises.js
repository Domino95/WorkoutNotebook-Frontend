import React, { useState } from 'react';
import OneExercise from './oneExercise'
import { addSeries, deleteSeries } from '../../requests/requests'
import { scroller } from "react-scroll";

const Exercies = (props) => {
    const [exercises] = useState(localStorage.getItem('exercises'))

    const scrollToExercises = (name) => {
        scroller.scrollTo(`${name}`, {
        })
    }
    const addSeriesFetch = async (name, countSeries, weight, reps) => {
        props.handleSetSpinner()
        await addSeries(name, countSeries, weight, reps)
        props.handleSetSpinner()
        scrollToExercises(name)
    }

    const deleteSeriesFetch = async (name, seriesId) => {
        props.handleSetSpinner()
        await deleteSeries(name, seriesId)
        props.handleSetSpinner()
        scrollToExercises(name)
    }
    return (
        <>
            {exercises && JSON.parse(exercises).exercises.map((item, index) =>
                <OneExercise key={index}
                    deleteSeriesFetch={deleteSeriesFetch}
                    addSeriesFetch={addSeriesFetch}
                    deleteExerciseFetch={props.deleteExerciseFetch}
                    name={item.name}
                    series={item.series}
                    exerciseId={item._id}
                />
            )}

        </>
    );
}
export default Exercies;