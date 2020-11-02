import React, { useState, useEffect } from 'react';
import '../../../styles/oneExercise.css'
import { useSelector } from 'react-redux'


const OneExercise = (props) => {
    const [weight, setweight] = useState(0)
    const [reps, setreps] = useState(0)
    const [selected, setselected] = useState(undefined)
    const words = useSelector(state => state.selectLanguage)
    useEffect(() => {
        const handleSelected = e => {
            if (e.target.className !== "selected_series") {
                setselected(undefined)
            }
        }
        window.addEventListener('click', handleSelected)

        return () => {
            window.removeEventListener("click", handleSelected);
        };
    })

    return (
        <>
            <div name={props.name} className="one_exercise" >

                <h2 >{props.name}  <svg onClick={() => props.deleteExerciseFetch(props.exerciseId)} height="24" viewBox="0 0 24 24" width="24" fill="rgb(150 146 146)" ><path d="M0 0h24v24H0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg> </h2>
                <div className="property" >
                    <div className="column">
                        {words.series}
                        {props.series.map((item, index) => {
                            return (
                                <p key={index} className={selected === index ? "selected_series" : undefined} onClick={() => setselected(selected === index ? undefined : index)} >{index + 1}</p>
                            )
                        })}
                        <svg onClick={() => props.addSeriesFetch(props.name, weight, reps)} fill="black" height="25" viewBox="0 0 23 24" width="25"><path d="M0 0h24v24H0z" fill="none" /><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
                    </div>
                    <div className="column">
                        {words.weight}
                        {props.series.map((item, index) => {
                            return (
                                <p key={index} className={selected === index ? "selected_series" : undefined} onClick={() => setselected(selected === index ? undefined : index)}> {item.weight} kg </p>
                            )
                        })}
                        <div className="add_weight">
                            <button onClick={() => setweight(weight <= 0 ? 0 : parseFloat(weight) - parseFloat(2.5))}>-</button>
                            <input onChange={(e) => setweight(e.target.value)} value={weight} type="number" />
                            <button onClick={() => setweight(!weight ? parseFloat(0) + parseFloat(2.5) : parseFloat(weight) + parseFloat(2.5))}>+</button>
                        </div>
                    </div>
                    <div className="column">
                        {words.reps}
                        {props.series.map((item, index) => {
                            return (
                                <p key={index} className={selected === index ? "selected_series" : undefined} onClick={() => setselected(selected === index ? undefined : index)} >{item.reps}
                                    <span key={index} onClick={() => props.deleteSeriesFetch(props.name, item._id)} />
                                </p>
                            )
                        })}
                        <div className="add_reps">
                            <div className="container_add_reps_buttons">
                                <input onChange={(e) => setreps(e.target.value)} value={reps} type="number" />
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </>
    );
}
export default OneExercise;