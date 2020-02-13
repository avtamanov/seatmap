import React, {Component} from 'react'
import {render} from 'react-dom'

import MyJson from "../../src/example_json/seats_2ADT-1CHD.json"
import SeatSeat from "./SeatSeat.js"

class SeatRow extends Component {
    state = {
        row: []
    };

    constructor(props){
        super(props);
        let {row, method, buttonState, section} = props;
        this.state.row = row.map(seat => {
            return <
                SeatSeat
                seatSeat={seat}
                method={method}
                nowChosen={buttonState[seat["rowColumn"]]}
                section={section}
            />
        });
    }

    render(){
        return <div>
            {this.state.row}
        </div>
    }
}

export default SeatRow