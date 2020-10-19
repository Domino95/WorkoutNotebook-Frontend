export const requestRefreshToken = async () => {
    try {
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'refreshToken': localStorage.getItem("refreshToken")
            }
        })
        const data = await response.json()
        if (data.tokens) {
            localStorage.setItem('accesToken', data.tokens.accesToken)
            localStorage.setItem('refreshToken', data.tokens.refreshToken)
            console.log("tokens refreshed")
            return true
        }
        if (data.error.name === "TokenExpiredError") {
            localStorage.setItem('userId', "")
            localStorage.setItem('accesToken', "")
            localStorage.setItem('refreshToken', "")
            localStorage.setItem('training_id', "")
            localStorage.setItem('nameWorkout', "")
            localStorage.setItem('exercises', "")
            localStorage.setItem('createdAt', "")
            window.location.reload(false);
        }
    } catch (error) {
        console.log(error)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////


export const addSeries = async (name, weight, reps) => {
    const requestObject = {
        query: `
                mutation{
                    addSeries(trainingId:"${localStorage.getItem("training_id")}", name:"${name}", weight:${weight}, reps:${reps})
                    {
                        exercises{
                            _id
                            name
                            series{
                                _id
                              weight
                              reps
                            }
                          }
                    }
                    }`
    }
    try {
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestObject),
            headers: {
                'Content-Type': 'application/json',
                'accesToken': localStorage.getItem("accesToken")
            }
        })
        if (!response.ok) {
            if (response.status === 500) {
                if (await requestRefreshToken()) {
                    return await addSeries(name, weight, reps)
                }
            }
            else {
                throw Error(response.statusText);
            }
        }
        const data = await response.json()
        if (data.data.addSeries.exercises) {
            localStorage.setItem('exercises', JSON.stringify({
                exercises: data.data.addSeries.exercises
            }));
        }
        else {
            console.log(data)
        }
    } catch (error) {
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////


export const deleteSeries = async (name, seriesId) => {
    const requestObject = {
        query: `
                mutation{
                    deleteSeries(trainingId:"${localStorage.getItem("training_id")}", seriesId: "${seriesId}", name:"${name}")
                    {
                        exercises{
                            _id
                            name
                            series{
                                _id
                              weight
                              reps
                            }
                          }
                    }
                    }`
    }
    try {
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestObject),
            headers: {
                'Content-Type': 'application/json',
                'accesToken': localStorage.getItem("accesToken")
            }
        })
        if (!response.ok) {
            if (response.status === 500) {
                if (await requestRefreshToken()) {
                    return await deleteSeries(name, seriesId)
                }
            }
            else {
                throw Error(response.statusText);
            }
        }
        const data = await response.json()
        if (data.data.deleteSeries.exercises) {
            localStorage.setItem('exercises', JSON.stringify({
                exercises: data.data.deleteSeries.exercises
            }));
        }
        else {
            console.log(data)
        }
    } catch (error) {
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////


export const addExercise = async (exercise, handleSetAndExercise) => {
    const requestObject = {
        query: `
            mutation{
                addExercises(trainingId:"${localStorage.getItem("training_id")}", name:"${exercise}"){
                     exercises{
                         _id
                        name
                        series{
                            _id
                          weight
                          reps
                        }
                      }
                }
                }`
    }
    try {
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestObject),
            headers: {
                'Content-Type': 'application/json',
                'accesToken': localStorage.getItem("accesToken")
            }
        })
        if (!response.ok) {
            if (response.status === 500) {
                if (await requestRefreshToken()) {
                    return await addExercise(exercise, handleSetAndExercise)
                }
            }
            else {
                throw Error(response.statusText);
            }
        }
        const data = await response.json()
        if (data.data.addExercises.exercises) {
            localStorage.setItem('exercises', JSON.stringify({
                exercises: data.data.addExercises.exercises
            }));
            handleSetAndExercise()
        }
    } catch (error) {
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////


export const deleteExercise = async (exerciseId, handleSetAndExercise) => {
    const requestObject = {
        query: `
            mutation{
                deleteExercise(trainingId:"${localStorage.getItem("training_id")}", exerciseId:"${exerciseId}"){
                     exercises{
                         _id
                        name
                        series{
                            _id
                          weight
                          reps
                        }
                      }
                }
                }`
    }
    try {
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestObject),
            headers: {
                'Content-Type': 'application/json',
                'accesToken': localStorage.getItem("accesToken")
            }
        })
        if (!response.ok) {
            if (response.status === 500) {
                if (await requestRefreshToken()) {
                    return await deleteExercise(exerciseId, handleSetAndExercise)
                }
            }
            else {
                throw Error(response.statusText);
            }
        }
        const data = await response.json()
        if (data) {
            localStorage.setItem('exercises', JSON.stringify({
                exercises: data.data.deleteExercise.exercises
            }));
            handleSetAndExercise()
        }
    } catch (error) {
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////


export const deleteTraining = async (setisLoading, trainingId, setCreateWorkout) => {
    setisLoading(true)
    const requestObject = {
        query: `
                mutation{
                    deleteTraining(trainingId:"${trainingId}"){
                      _id
                    }
                    }`}
    try {
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestObject),
            headers: {
                'Content-Type': 'application/json',
                'accesToken': localStorage.getItem("accesToken")
            }
        })
        if (!response.ok) {
            if (response.status === 500) {
                if (await requestRefreshToken()) {
                    return await deleteTraining(setisLoading, trainingId, setCreateWorkout)
                }
            }
            else {
                throw Error(response.statusText);
            }
        }
        const data = await response.json()
        if (data.data.deleteTraining) {
            localStorage.setItem("createdAt", "")
            localStorage.setItem("nameWorkout", "")
            localStorage.setItem("training_id", "")
            localStorage.setItem("exercises", "")
            setCreateWorkout()
            setisLoading(false)
        }
    } catch (error) {
        setisLoading(false)
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////



export const createTraining = async (setisLoading, nameWorkout) => {
    setisLoading(true)
    const requestObject = {
        query: `
            mutation{
                createTraining(userId:"${localStorage.getItem("userId")}", name:"${nameWorkout}"){
                    createdAt
                    _id
                    creator
                     name
                }
                }`}
    try {
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestObject),
            headers: {
                'Content-Type': 'application/json',
                'accesToken': localStorage.getItem("accesToken")
            }
        })
        if (!response.ok) {
            if (response.status === 500) {
                if (await requestRefreshToken()) {
                    return await createTraining(setisLoading, nameWorkout)
                }
            }
            else {
                throw Error(response.statusText);
            }
        }
        const data = await response.json()
        if (data.data.createTraining) {
            localStorage.setItem("createdAt", data.data.createTraining.createdAt)
            localStorage.setItem("nameWorkout", data.data.createTraining.name)
            localStorage.setItem("training_id", data.data.createTraining._id)
            setisLoading(false)
        }
    } catch (error) {
        setisLoading(false)
    }
}

export const getWorkouts = async () => {
    const requestObject = {
        query: `
            query{
                getWorkouts(userId:"${localStorage.getItem("userId")}"){
                    _id
                    name
                    createdAt
                    exercises{
                    _id
                    name
                    series{
                        _id
                        weight
                        reps
                    }
                    }
                }
                }`}
    try {
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestObject),
            headers: {
                'Content-Type': 'application/json',
                'accesToken': localStorage.getItem("accesToken")
            }
        })
        if (!response.ok) {
            if (response.status === 500) {
                if (await requestRefreshToken()) {
                    return await getWorkouts()
                }
            }
            else {
                throw Error(response.statusText);
            }
        }
        const data = await response.json()
        if (data.data.getWorkouts) {
            return data.data.getWorkouts
        }
    } catch (error) {
    }
}

///////////////////////////////////////////////////////////////////////////////////////////

export const getUser = async (handleSetSpinnerTrue, handleSetSpinnerFalse) => {
    handleSetSpinnerTrue()
    const requestObject = {
        query: `
            query{
                getUser(userId:"${localStorage.getItem("userId")}"){
                name 
                email
                goal
                photoUrl
                confirmed
                workouts{
                    exercises{
                        series{
                            reps
                        }
                    }
                }
            
                }
                }`}
    try {
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestObject),
            headers: {
                'Content-Type': 'application/json',
                'accesToken': localStorage.getItem("accesToken")
            }
        })
        if (!response.ok) {
            if (response.status === 500) {
                if (await requestRefreshToken()) {
                    return await getUser(handleSetSpinnerTrue, handleSetSpinnerFalse)

                }
            }
            else {
                throw Error(response.statusText);
            }
        }
        const data = await response.json()
        if (data.data.getUser) {
            localStorage.setItem('confirmed', data.data.getUser.confirmed)
            handleSetSpinnerFalse()
            return data.data.getUser
        }
    } catch (error) {
        handleSetSpinnerFalse()
    }
}


///////////////////////////////////////////////////////////////////////////////////////////


export const updateUser = async (name, goal, photoSource) => {
    const requestObject = {
        query: `
            mutation{
                updateUser(userId:"${localStorage.getItem("userId")}", name:"${name}", goal:"${goal}", photo:"${photoSource}"){
                name 
                email
                goal
                }
                }`}
    try {
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestObject),
            headers: {
                'Content-Type': 'application/json',
                'accesToken': localStorage.getItem("accesToken")
            }
        })
        const data = await response.json()
        if (data.data.updateUser) {
            return data.data.updateUser
        }
        else if (data.errors[0].message === "Unauthorized") {
            if (await requestRefreshToken()) {
                return await updateUser(name, goal, photoSource)
            }
        }
    } catch (error) {
    }
}
