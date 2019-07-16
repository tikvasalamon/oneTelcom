import React, { Component } from 'react'
//import {Container, Row, Col, Button} from 'react-bootstrap'
import DAL from '../../models/plan/DAL'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

class CreatePlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planName: '',
            internetGg: 0,
            minInCountry: 0,
            minOutCountry: 0,
            price: 0
        }
    }

    updateInputs = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submit = (e) => {
        e.preventDefault();

        let obj = {
            planName: this.state.planName,
            internetGg: this.state.internetGg,
            minInCountry: this.state.minInCountry,
            minOutCountry: this.state.minOutCountry,
            price: this.state.price
        };

        DAL.createPlan(obj).then((req)=>{
            if (req.data.succeeded) {
                console.log(req.data.succeeded)
                toast.success(req.data.succeeded,{
                    position: toast.POSITION.BOTTOM_LEFT
                })
            }
            if (req.data.creatPlanError) {
                console.log(req.data.creatPlanError)
                toast.error(req.data.creatPlanError,{
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
            planName: '',
            internetGg: 0,
            minInCountry: 0,
            minOutCountry: 0,
            price: 0
        })
    }

    render() {
        return (
            <div>
                <ToastContainer/>
                <h1>Create Plan</h1>
                <form onSubmit={this.submit}>
                    <div>
                        <label>Plan name:</label>
                        <input type="text" onChange={this.updateInputs} value={this.state.planName} name="planName" />
                    </div>

                    <div>
                        <label>Internet Gg:</label>
                        <input type="number" onChange={this.updateInputs} value={this.state.internetGg} name="internetGg" />
                    </div>

                    <div>
                        <label>Minutes inside country:</label>
                        <input type="number" onChange={this.updateInputs} value={this.state.minInCountry} name="minInCountry" />
                    </div>

                    <div>
                        <label>Minutes outside country:</label>
                        <input type="number" onChange={this.updateInputs} value={this.state.minOutCountry} name="minOutCountry" />
                    </div>

                    <div>
                        <label>Price:</label>
                        <input type="number" onChange={this.updateInputs} value={this.state.price} name="price" />
                    </div>

                    <input type="submit" value="Create Plan"/>
                </form>
            </div>
        )
    }
}

export default CreatePlan