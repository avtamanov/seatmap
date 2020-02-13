import React, {Component} from 'react'
import './SeatMap.css'
import 'bootstrap/dist/css/bootstrap.css'

import MyJson from "../example_json/seats_connecting-flights.json"

import Basket from './BasketFunctions.js'
import SeatRow from './SeatRow.js'

class SeatMap extends Component {
    state = {
        body: [],
        buttonStates: [],
        chosenSeats: [],
        curSegment: "",
        segmentsList: []
    };

    constructor(props){
        super(props);

        for(let section in MyJson["segments"]){
            this.state.chosenSeats[section] = [];
            this.state.segmentsList.push(section);
        }

        for(let section in MyJson["segments"]){
            this.state.curSegment = section;
            break;
        }

        for(let section in MyJson["seatMap"]) // seatMap
        {
            this.state.buttonStates[section] = [];
            for(let row in MyJson["seatMap"][section]){ // Section
                this.state.buttonStates[section][MyJson["seatMap"][section][row]["rowNumber"]] = [];
                for(let seat in MyJson["seatMap"][section][row]["seats"]){
                    this.state.buttonStates[section][MyJson["seatMap"][section][row]["rowNumber"]][MyJson["seatMap"][section][row]["seats"][seat]["rowColumn"]] = false;
                }
            }
        }
    }

    render() {
        const seatMap = MyJson["seatMap"];
        const segments = MyJson["segments"];

        for (let section in seatMap) // seatMap
        {
            this.state.body[section] = [];
            for(let row in seatMap[section]){ // Section
                this.state.body[section][row] = <
                    SeatRow
                    row={seatMap[section][row]["seats"]}
                    method={this.seatClick}
                    key={seatMap[section][row]["rowNumber"]}
                    buttonState={this.state.buttonStates[section][seatMap[section][row]["rowNumber"]]}
                    section={section}
                />
            }
        }

        return <div className="seatMap__wrapper">
            <div className="segments__wrapper">{Segments(segments, this.segmentClick)}</div>
            <div className="basket__wrapper">{Basket(this.state.chosenSeats,MyJson)}</div>
            <div className="seatMap_container">
                <div id="bg"/>
                <ui className="seatMap__list">{ShowSeatMap(this.state.body[this.state.curSegment], seatMap, this.state.curSegment)}</ui>
            </div>
        </div>
    }

    seatClick = (pairObj, button) => {
        this.setState((state) =>{
            const chosenSeats = state.chosenSeats;
            if(button.state.isChosen){
                for(let i = 0; i < state.chosenSeats[this.state.curSegment].length; i++)
                {
                    if(pairObj["rowColumn"] === state.chosenSeats[this.state.curSegment][i]["rowColumn"])
                        chosenSeats[this.state.curSegment].splice(i, 1);
                }
                this.state.buttonStates[button.props["section"]][pairObj["rowColumn"].substring(0,pairObj["rowColumn"].length-1)][pairObj["rowColumn"]] = false;
                document.getElementById(button.state.thisProps["seatSeat"]["rowColumn"]).style.backgroundColor = "#007bff";
            }else{
                if(state.chosenSeats[this.state.curSegment].length === MyJson["passengers"].length)
                {
                    alert("Ошибка! Вы выбрали мест больше, чем запланированно пассажиров.");
                    return;
                }
                chosenSeats[this.state.curSegment].push(pairObj);
                this.state.buttonStates[button.props["section"]][pairObj["rowColumn"].substring(0,pairObj["rowColumn"].length-1)][pairObj["rowColumn"]] = true;
                document.getElementById(button.state.thisProps["seatSeat"]["rowColumn"]).style.backgroundColor = "green";
            }
            button.setState(state=>{
                return {
                    isChosen: !state.isChosen,
                    thisProps: state.thisProps
                }
            });
            return state;
        });
    };

    segmentClick = (name) => {
        this.setState(state=>{
            state.curSegment = name;
            return state;
        });
    }
}

function ShowSeatMap(body, seatMap, segment){
    let rowArr = [];
    let rowCounter = 0;
    for(let smth in seatMap[segment])
    {
        rowArr.push(seatMap[segment][smth]["rowNumber"]);
    }
    return <div className="seatMap__list">
        <ui>{body.map(eachRow =>{
            return <li key={rowArr[rowCounter++]}>{eachRow}</li>
        })}</ui>)
    </div>
}

function Segments(segments, method){
    let list = [];
    for(let key in segments)
    {
        list.push(key);
    }
    return <div className="segments__container">
        {list.map(seg =>
            <button
                className="segments__button"
                onClick={method.bind(this, seg)}
            >
                {seg}
            </button>)}
    </div>
}

export default SeatMap