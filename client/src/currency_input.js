import React from 'react';
import './style/currency_input.css'

class CurrencyInput extends React.Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }
 
    handleChange(e){
        const re = /^\$?[\d,]+(\.\d*)?$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.props.onValueInputChange(e.target.value);
        }
    } 

    handleSelectChange(e){
        this.props.onValueChange(e.target.value);
    }

    render(){
        const _currencyArray = this.props.currencyArray;
        const ListName = _currencyArray.map((name)=>
            <option key={name.id} value={name.name}>{name.id} - {name.name}</option>
        )
        const value = this.props.value;
        const name = this.props.currencyName;

        return(
            <fieldset>
                <legend>Enter currency in {name}:</legend>
                <input value={value}
                    onChange={this.handleChange}  />
                <select value={name} onChange={this.handleSelectChange}>
                    {ListName}
                </select>        
            </fieldset>
        )
    }
}

export default CurrencyInput;