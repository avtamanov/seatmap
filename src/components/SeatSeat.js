import React, {Component} from 'react'
import {render} from 'react-dom'
import './SeatSeat.css'
import 'bootstrap/dist/css/bootstrap.css'

class SeatSeat extends Component{
    constructor(props){
        super(props);
        this.state = {
            isChosen: props["nowChosen"],
            thisProps: props
        };
    }

    Style = () =>{
        if( (this.props["seatSeat"]["rowColumn"].indexOf("C") !== -1) && (this.props["nowChosen"]) ){
            return {backgroundColor: "green", marginRight: 10+'px'};
        }
        if( this.props["seatSeat"]["rowColumn"].indexOf("C") !== -1 ){
            return {marginRight: 10+'px'};
        }
        if(this.props["nowChosen"]){
            return {backgroundColor: "green"};
        }
        return {};
    };

    render() {
        const {seatSeat, method} = this.props;
        return <button
            id={seatSeat["rowColumn"]}
            style={this.Style()}
            type="button"
            className="btn btn-primary"
            onClick={
                method.bind(this,
                    {
                        "rowColumn": seatSeat["rowColumn"],
                        "offerKey": seatSeat["offerKey"]
                    },
                    this)
            }
        >
            {seatSeat["rowColumn"]}
        </button>
    }
}

export default SeatSeat