import React from 'react';
import Navibar from '../../components/main/Navibar/Navbar'
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import CalendarPage from './CalendarPage'
import WorkoutsPage from './WorkoutsPage'
import AccountPage from './AccountPage'
import Details from './Details'
import PreviousWorkout from './PreviousWorkout';
import Settings from './Settings';
import Verifyemail from '../../components/main/VerifyEmail/Verifyemail'
import { useSelector } from 'react-redux'

const Main = (props) => {
    const confirmed = useSelector(state => state.isConfirmed)


    return (
        <BrowserRouter  >
            <Redirect from="/" exact to="/account" />
            <Navibar />
            <Switch>
                <Route path="/account" component={confirmed ? AccountPage : Verifyemail} />
                <Route exact path="/previous" component={confirmed ? PreviousWorkout : Verifyemail} />
                <Route path='/previous/details' component={confirmed ? Details : Verifyemail} />
                <Route path='/calendar' component={confirmed ? CalendarPage : Verifyemail} />
                <Route path="/workouts" component={confirmed ? WorkoutsPage : Verifyemail} />
                <Route path="/settings" component={() => <Settings logout={() => props.logout()} />} />
            </Switch>
        </BrowserRouter>
    );
}
export default Main;
