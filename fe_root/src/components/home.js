import React, { Component } from 'react'
//import {Container, Row, Col, Button} from 'react-bootstrap'
import GalaxyImg from '../images/galaxyImg.png'
import '../style/homePageStyle.css'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <img src={GalaxyImg} width='600' height='300' />
                <input type='button' class="button" value='Learn more' />
            </div>
        )
    }
}

export default HomePage