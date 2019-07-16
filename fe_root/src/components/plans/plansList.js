import React, { Component } from 'react'
//import {Container, Row, Col, Button} from 'react-bootstrap'
import DAL from '../../models/plan/DAL'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import PlanDisplay from './planDisplay'

class PlansDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plans: []
        }
    }

    componentDidMount(){
        DAL.getAllPlans().then((result) => {
            this.setState({plans: result.data})
        })
    }

    render() {
        let planList = this.state.plans.map((p) => {
            return <PlanDisplay name={p.name} internetGg={p.internetGg} minInCountry={p.minInCountry} minOutCountry={p.minOutCountry} price={p.price}/>
        })
        return (
            <div>
                {planList}
            </div>
        )
    }
}

export default PlansDisplay