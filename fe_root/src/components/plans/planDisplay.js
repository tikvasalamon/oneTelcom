import React, { Component } from 'react'
//import {Container, Row, Col, Button} from 'react-bootstrap'
import ClientDAL from '../../models/client/DAL'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

class PlanDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            internetGg: this.props.internetGg,
            minInCountry: this.props.minInCountry,
            minOutCountry: this.props.minOutCountry,
            price: this.props.price
        }
    }

    selectPlan = () => {
        let obj = {
            plName: this.state.name
        }
        
        ClientDAL.selectPlan(obj).then((req) => {
            if (req.data.succeeded) {
                console.log(req.data.succeeded)
                toast.success(req.data.succeeded,{
                    position: toast.POSITION.BOTTOM_LEFT
                })
            }
            if (req.data.planSelectError) {
                console.log(req.data.planSelectError)
                toast.error(req.data.planSelectError,{
                    position: toast.POSITION.BOTTOM_LEFT
                })
            }
        })
    }

    render() {
        return (
            <div>
                <ToastContainer/>
                {this.state.name}:
                <li>Giga: {this.state.internetGg}</li>
                <li>Minutes inside country: {this.state.minInCountry}</li>
                <li>Minutes outside country: {this.state.minOutCountry}</li>
                <li>Price: {this.state.price}</li>
                <input type='button' value='Select' onClick={this.selectPlan}/>
            </div>
        )
    }
}

export default PlanDisplay