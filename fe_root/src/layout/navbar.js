import React, { Component } from 'react'
import axios from 'axios'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from '../components/clients/login'
import Register from '../components/clients/register'
import PlansDisplay from '../components/plans/plansList'
import CreatePlan from '../components/plans/createPlan'
import HomePage from '../components/home'
import OneTelcomLogo from '../images/oneTelcomLogo.png'


class Navigator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/clients/me')
            .then((result) => {
                console.log(result)
                if (result.data.user) {
                    this.setState({ user: result.data.user.userName })
                }
            })
    }

    render() {
        let login = <Nav.Link href="/login">Login</Nav.Link>
        let plans = ''
        let name = '';

        if (this.state.user) {
            login = ""
            name = 'Hello ' + this.state.user
            plans = <Nav.Link href="/plansDisplay">Plans</Nav.Link>
        }
        return (
            <div>
                <Router>
                    <Navbar bg="light" sticky="top" >
                        <Navbar.Brand href="/home"><img src={OneTelcomLogo} width='50' height='50' /></Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link href="/home">Home</Nav.Link>
                            {plans}
                            <Nav.Link href="/createPlan">Create plan</Nav.Link>
                        </Nav>
                        {name} {login}
                    </Navbar>
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/plansDisplay' component={PlansDisplay} />
                    <Route path='/createPlan' component={CreatePlan} />
                    <Route path='/home' component={HomePage} />
                </Router>
            </div>
        )
    }
}

export default Navigator