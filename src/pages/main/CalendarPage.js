import React, { useState, useEffect } from "react";
import format from "date-fns/format";
import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";
import addDays from "date-fns/addDays"
import startOfWeek from "date-fns/startOfWeek"
import startOfMonth from "date-fns/startOfMonth"
import endOfMonth from "date-fns/endOfMonth"
import endOfWeek from "date-fns/endOfWeek"
import isSameDay from "date-fns/isSameDay"
import isSameMonth from "date-fns/isSameMonth"
import "../../styles/calendarPage.css"
import { getWorkouts } from '../../components/requests/requests'
import Spinner from '../../components/spinners/SpinnerMain'
import { NavLink } from 'react-router-dom';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [previousWorkout, setpreviousWorkout] = useState([])
    const [isLoading, setisLoading] = useState(true)
    document.title = "WorkoutNotebook - Calendar"

    useEffect(() => {
        async function fetchData() {
            const response = await getWorkouts(handleSetSpinner)
            if (response) {
                setpreviousWorkout(response)
                setisLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleSetSpinner = () => {
        setisLoading(true)
    }

    const header = () => {
        const dateFormat = "MMMM yyyy";
        return (
            <div className="header row flex-middle">
                <div className="column col-start">
                    <div className="icon" onClick={prevMonth}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 0 24 24" width="30" transform="rotate(-180)"><path d="M0 0h24v24H0z" fill="none" /><path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z" /></svg>
                    </div>
                </div>
                <div className="column col-center">
                    {format(currentDate, dateFormat)}
                </div>
                <div className="column col-end">
                    <div className="icon" onClick={nextMonth}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 0 24 24" width="30"><path d="M0 0h24v24H0z" fill="none" /><path d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z" /></svg>
                    </div>
                </div>
            </div>

        );
    };
    const days = () => {
        const dateFormat = "E";
        const days = [];
        let startDate = startOfWeek(currentDate);
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="column col-center" key={i}>
                    {format(addDays(startDate, i), dateFormat)}
                </div>
            );
        }
        return <div className="days row">{days}</div>;
    };
    const cells = () => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);
        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        className={`column cell ${!isSameMonth(day, monthStart)
                            ? "disabled" : isSameDay(day, new Date())
                                ? "selected" : ""}`}
                        key={day}
                    >
                        <span className="bg" key={day}  >
                            {previousWorkout.map((item, index) => {
                                if (new Date(item.createdAt).toLocaleString().slice(0, 10) === new Date(cloneDay).toLocaleString().slice(0, 10)) {
                                    return (
                                        <span key={index}>
                                            <NavLink to={{
                                                pathname: '/previous/details',
                                                state: {
                                                    name: item.name,
                                                    createdAt: new Date(item.createdAt).toLocaleString().slice(0, -3),
                                                    exercises: item.exercises,
                                                }
                                            }}>
                                            </NavLink>
                                        </span>
                                    );
                                }
                                return null
                            })}
                        </span>
                        <span className="number">{formattedDate}</span>
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}> {days} </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }
    const nextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };
    const prevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };
    return (
        isLoading ? <Spinner /> :
            <div className="calendar_background">
                <div className="calendar">
                    <div>{header()}</div>
                    <div>{days()}</div>
                    <div>{cells()}</div>
                </div>
            </div>
    );
};
export default Calendar;