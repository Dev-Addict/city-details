import React, {Component} from 'react';

import Clock from './Clock';
import Weather from './Weather';

class App extends Component {

    getCurrentTimeZone() {
        let date = new Date();
        let offset = date.getTimezoneOffset();
        return 0 - offset / 60;
    }

    render() {
        return (
            <div>
                <Clock timeZone={`${this.getCurrentTimeZone()}`} />
                <Weather />
            </div>
        );
    }
}

export default App;