import React from 'react';
import ReactDOM from 'react-dom';

import './style/index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Calculator from './calculator'

import registerServiceWorker from './registerServiceWorker';


class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Calculator />
                <div className="row">
                    <div className="col-md-6 col-12 col-sm-12">
                        View Source
                    </div>
                    <div className="col-md-6 col-12 col-sm-12 text-right">
                        <a href="https://www.currencyconverterapi.com/">Currency API</a>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
