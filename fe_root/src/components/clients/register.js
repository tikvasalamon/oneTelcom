import React, { Component } from 'react'
//import {Container, Row, Col, Button} from 'react-bootstrap'
import DAL from '../../models/client/DAL'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

class ClientRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            address: '',
            city: '',
            id: '',
            password: '',
            password2: ''
        }
    }

    updateInputs = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submit = (e) => {
        e.preventDefault();

        let obj = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dateOfBirth: this.state.dateOfBirth,
            address: this.state.address,
            city: this.state.city,
            id: this.state.id,
            password: this.state.password,
            password2: this.state.password2
        };

        DAL.register(obj).then((req)=>{
            if (req.data.succeeded) {
                console.log(req.data.succeeded)
                toast.success(req.data.succeeded,{
                    position: toast.POSITION.BOTTOM_LEFT
                })
            }
            if (req.data.registerError) {
                console.log(req.data.registerError)
                toast.error(req.data.registerError,{
                    position: toast.POSITION.BOTTOM_LEFT
                })
            }
            if (req.data.valErrors) {
                console.log(req.data.valErrors)
                toast.error(req.data.valErrors,{
                    position: toast.POSITION.BOTTOM_LEFT
                })
            }
        })

        this.setState({
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            address: '',
            city: '',
            id: '',
            password: '',
            password2: ''
        })
    }

    render() {
        return (
            <div>
                <ToastContainer/>
                <h1>Register</h1>
                <form onSubmit={this.submit}>
                    <div>
                        <label>First name:</label>
                        <input type="text" onChange={this.updateInputs} value={this.state.firstName} name="firstName" />
                    </div>

                    <div>
                        <label>Last name:</label>
                        <input type="text" onChange={this.updateInputs} value={this.state.lastName} name="lastName" />
                    </div>

                    <div>
                        <label>Date of birth:</label>
                        <input type="date" onChange={this.updateInputs} value={this.state.dateOfBirth} name="dateOfBirth" />
                    </div>

                    <div>
                        <label>Address:</label>
                        <input type="text" onChange={this.updateInputs} value={this.state.address} name="address" />
                    </div>

                    <div>
                        <label>city:</label>
                        <input type="text" onChange={this.updateInputs} value={this.state.city} name="city" />
                    </div>

                    <div>
                        <label>Id:</label>
                        <input type="text" onChange={this.updateInputs} value={this.state.id} name="id" />
                    </div>

                    <div>
                        <label>Password:</label>
                        <input type="text" onChange={this.updateInputs} value={this.state.password} name="password" />
                    </div>

                    <div>
                        <label>Password confirm:</label>
                        <input type="text" onChange={this.updateInputs} value={this.state.password2} name="password2" />
                    </div>
                    <input type="submit" value="Register"/>
                </form>
            </div>
        )
    }
}

export default ClientRegister