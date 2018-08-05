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
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
