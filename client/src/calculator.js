import React from 'react';
import CurrencyInput from './currency_input';
import Chart from './chart';

import {Main_Function} from './js/main.js';
import { Button } from 'reactstrap';

//const URL = 'http://localhost:3000/'; 
const URL = 'https://hauph-cc-app.herokuapp.com/';
var currency1 = 'AED';
var currency2 = 'AED';
var _currencyArray = [];
var dateObj = Main_Function.getconvertURL();
var startDate = dateObj.startDate;
var endDate = dateObj.endDate;

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handle_1st_SelectChange = this.handle_1st_SelectChange.bind(this);
        this.handle_2nd_SelectChange = this.handle_2nd_SelectChange.bind(this)
        this.handle_1st_InputChange = this.handle_1st_InputChange.bind(this);
        this.handle_2nd_InputChange = this.handle_2nd_InputChange.bind(this)
        this.handle_on_click        = this.handle_on_click.bind(this)

        this.state = {
            currentCurrency: 0,
            value: 0,
            convertValue1 : 0,
            convertValue2 : 0,
            currencyName1: 'UAE Dirham',
            currencyName2: 'UAE Dirham',
            currencyArray: [],
            chartArray: []
        };
    }

    componentDidMount() {
        //FIRST FETCH
        fetch(URL).then( response => {
            if(!response.ok) {
                throw Error("Network Request Failed");
            }
            return response.json();
        }).then(data => {
            _currencyArray = data;
            this.setState({
                currencyArray: data, 
                currencyName1: data[0].name, 
                currencyName2: data[0].name
            })
        })  
        .catch(err => {
            console.log(err);
        })
    }

    handle_1st_SelectChange(currencyName){
        this.setState({currencyName1: currencyName})
        for (var i= 0; i < _currencyArray.length; i++) {
            if(_currencyArray[i].name.indexOf(currencyName) > -1) {
                currency1 = _currencyArray[i].id;
            }
        }

        this.secondFetchHandle(currency1, currency2)
    }

    handle_2nd_SelectChange(currencyName){
        this.setState({currencyName2: currencyName})
        for (var i= 0; i < _currencyArray.length; i++) {
            if(_currencyArray[i].name.indexOf(currencyName) > -1) {
                currency2 = _currencyArray[i].id;
            }
        }

        this.secondFetchHandle(currency1, currency2)
    }

    handle_1st_InputChange(_value){
        this.setState({value: _value, currentCurrency: 1});
    }

    handle_2nd_InputChange(_value){
        this.setState({value: _value, currentCurrency: 2});
    }

    handle_on_click(){
        this.setState({
            currencyName1: this.state.currencyName2,
            currencyName2: this.state.currencyName1 
        });
        const _currencyName1 = this.state.currencyName1;
        const _currencyName2 = this.state.currencyName2;

        for (var i = 0; i < _currencyArray.length; i++) {
            if(_currencyArray[i].name.indexOf(_currencyName2) > -1) {
                currency1 = _currencyArray[i].id;
            }
        }

        for (var j = 0; j < _currencyArray.length; j++) {
            if(_currencyArray[j].name.indexOf(_currencyName1) > -1) {
                currency2 = _currencyArray[j].id;
            }
        }
        
        this.secondFetchHandle(currency1, currency2)
    }

    secondFetchHandle(currency1, currency2) {
        if(currency1 !== currency2 ) {
            let convertURL = `https://free.currencyconverterapi.com/api/v6/convert?q=${currency1}_${currency2},${currency2}_${currency1}&compact=ultra&date=${startDate}&endDate=${endDate}`;
            //SECOND FETCH
            Main_Function.secondFetch(convertURL).then(response=>{
                this.setState({
                    convertValue1: response[0].val, 
                    convertValue2: response[1].val,
                    chartArray: response[2]
                })
            })
        }
    }

    render(){
        const value = this.state.value;
        const _currentCurrency = this.state.currentCurrency;

        const convertValue1 = this.state.convertValue1;
        const convertValue2 = this.state.convertValue2;  
        const _fromTo = `${currency1} to ${currency2}`

        const currencyValue1 = _currentCurrency === 2 ? Main_Function.convertCurrency(value, convertValue2) : value;
        const currencyValue2 = _currentCurrency === 1 ? Main_Function.convertCurrency(value, convertValue1) : value;

        return (
            <div className="text-center">
                <h1>Choose currencies to convert:</h1>

                <CurrencyInput 
                    currencyName={this.state.currencyName1} 
                    currencyArray={this.state.currencyArray} 
                    onValueChange={this.handle_1st_SelectChange}
                    value={currencyValue1}
                    onValueInputChange={this.handle_1st_InputChange} />

                <Button outline color="secondary" onClick={this.handle_on_click}>Swap Currency</Button>

                <CurrencyInput 
                    currencyName={this.state.currencyName2} 
                    currencyArray={this.state.currencyArray} 
                    onValueChange={this.handle_2nd_SelectChange} 
                    value={currencyValue2}
                    onValueInputChange={this.handle_2nd_InputChange}/>

                <Chart dataChart={this.state.chartArray} fromTo={_fromTo} />
            </div>
        )
    }
}

export default Calculator;