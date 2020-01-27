import React, {Component} from 'react';

import Clock from './Clock';

class App extends Component {
    render() {
        return (
            <div>
                <Clock timeZone='0'/>
            </div>
        );
    }
}

export default App;