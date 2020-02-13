import React, {Component} from 'react'
import {render} from 'react-dom'

import SeatMap from '../src/components/SeatMap.js'

class MainFrame extends Component {
    state = {};
    render() {
        return <div>
                <SeatMap />
            </div>
    }
}

render(<MainFrame/>, document.getElementById('root'));