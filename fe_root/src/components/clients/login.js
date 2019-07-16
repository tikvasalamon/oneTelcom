import React, { Component } from 'react'
//import {Container, Row, Col, Button} from 'react-bootstrap'
import DAL from '../../models/client/DAL'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../../style/loginPageStyle.css'

class ClientLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: ''
        }
    }

    updateInputs = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submit = (e) => {
        e.preventDefault();

        let obj = {
            id: this.state.id,
            password: this.state.password
        };

        DAL.login(obj).then((req) => {
            if (req.data.succeeded) {
                console.log(req.data.succeeded)
                toast.success(req.data.succeeded, {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            }
            if (req.data.loginError) {
                console.log(req.data.loginError)
                toast.error(req.data.loginError, {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            }
        })

        this.setState({
            id: '',
            password: ''
        })
    }

    render() {
        return (
            <body>
                <div class='container'>
                    <h1>Login</h1>
                    <form onSubmit={this.submit}>
                        <div class='tbox'>
                            <input type="text" onChange={this.updateInputs} placeholder='id' value={this.state.id} name="id" />
                        </div>

                        <div class='tbox'>
                            <input type="text" onChange={this.updateInputs} placeholder='password' value={this.state.password} name="password" />
                        </div>

                        <input class='btn' type="submit" value="LOGIN" />
                    </form>
                    <a class='b1' href='/register'>FORGAT PASSWORD ?</a>
                    <a class='b2' href='/register'>CREATE AN ACCOUNT</a>
                </div>
                <div class='container2'></div>
            </body>
            // <div>
            //     <ToastContainer/>
            //     <h1>Login</h1>
            //     <form onSubmit={this.submit}>
            //         <div>
            //             <label>Id:</label>
            //             <input type="text" onChange={this.updateInputs} value={this.state.id} name="id" />
            //         </div>

            //         <div>
            //             <label>Password:</label>
            //             <input type="text" onChange={this.updateInputs} value={this.state.password} name="password" />
            //         </div>

            //         <input type="submit" value="Login"/>
            //     </form>
            //     You dont have account ? click here to <a href='/register'>sign up!</a>
            // </div>
        )
    }
}

export default ClientLogin