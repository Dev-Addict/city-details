import React, {Component} from 'react';

import '../style/clock.css'

class Clock extends Component {
    constructor(props) {
        super(props);

        let timeZone = undefined;
        if(props.hasOwnProperty('timeZone')) {
            timeZone = parseFloat(props.timeZone);
        }

        this.state = {hour: 0, minute: 0, second: 0, miliSecond: 0, timeZone};

        this.updateClock = this.updateClock.bind(this);
        this.standardClock = this.standardClock.bind(this);
        this.onChange = this.onChange.bind(this);

        this.updateClock();
    }

    updateClock() {
        let date = new Date();
        if(typeof this.state.timeZone != 'undefined') {
            let offset = this.state.timeZone * 60 + date.getTimezoneOffset();
            date = new Date(new Date().getTime() + offset * 60000);
        }
        this.setState({
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds(),
            miliSecond: date.getMilliseconds()
        });
        setTimeout(this.updateClock, 1);
    }

    standardClock() {
        let standardHour = this.state.hour > 12 ? this.state.hour - 12 < 10 ? '0' + (this.state.hour - 12) : '' + (this.state.hour - 12) : this.state < 10 ? '0' + this.state.hour : '' + this.state.hour;
        let standardMinute = this.state.minute < 10 ? '0' + this.state.minute : '' + this.state.minute;
        let standardSecond = this.state.second < 10 ? '0' + this.state.second : '' + this.state.second;
        let standardMiliSecond = this.state.miliSecond < 10 ? '00' + this.state.miliSecond : this.state.miliSecond < 100 ? '0' + this.state.miliSecond : '' + this.state.miliSecond;
        let standardDayTime = this.state.hour > 12 ? 'PM' : 'AM';
        return `${standardHour}:${standardMinute}:${standardSecond}.${standardMiliSecond} ${standardDayTime}`;
    }

    onChange(event) {
        let timeZone = event.target.value;
        if(timeZone > 13) {
            timeZone = 13;
        } else if(timeZone < -13) {
            timeZone = -13
        }
        this.setState({timeZone});
    }

    onSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div className="ui segment clock">
                <div className="clock-title">Clock</div>
                <div className="time">{this.standardClock()}</div>
                <form className="ui form" onSubmit={this.onSubmit}>
                    <div className="field">
                        <label className="time-zone-input-label">Time Zone</label>
                        <input type="text" value={this.state.timeZone} onChange={this.onChange} className="time-zone-input" />
                    </div>
                </form>
            </div>
        );
    }
}

export default Clock;