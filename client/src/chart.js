import React from 'react'
import './style/chart.css'

import {Main_Function} from './js/main.js';

class Chart extends React.Component {
    
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.dataChart !== this.props.dataChart;
    }

    render(){
        let _dataChart = this.props.dataChart,
            _fromTo = this.props.fromTo;
            
        if (_dataChart.length !== 0){
            Main_Function.highChartJs(_dataChart, _fromTo)
        } else {
            console.log('fail')
        }

        return (
            <div className="highlight-chart-wrapper">
                <div id="highlight-chart"></div>
            </div>
        )
    }
}

export default Chart;