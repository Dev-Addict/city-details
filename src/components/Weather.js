import React, {Component} from 'react';

import showState from '../model/ShowState';

import '../style/weather.css';

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lon: 0, 
            lat: 0, 
            main: '', 
            description: '', 
            temp: 0, 
            tempFillsLike: 0, 
            minTemp: 0, 
            maxTemp: 0, 
            humidity: 0, 
            windSpeed: 0, 
            windDeg: 0,
            timezone: 0, 
            country: '', 
            city: '', 
            errorMessage: '', 
            showState: showState.NOTHING_TO_SHOW
        };
        this.requestData = this.requestData.bind(this);
        this.showState = this.showState.bind(this);
        this.onCityInputChanged = this.onCityInputChanged.bind(this);
        this.onLonInputChanged = this.onLonInputChanged.bind(this);
        this.onLatInputChanged = this.onLatInputChanged.bind(this);
        this.onCityFormSubmited = this.onCityFormSubmited.bind(this);
        this.onGeoFormSubmited = this.onGeoFormSubmited.bind(this);
    }

    async requestData(cityName = '', lon = 0.0, lat = 0.0) {
        this.setState({showState: showState.LOADING});
        if (cityName !== '') {
            var request = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=9dfbdb4bc5678740177cb404fe2009c9`, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin'
            });
        } else {
            var request = await fetch(`http://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}&APPID=9dfbdb4bc5678740177cb404fe2009c9`, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin'
            });
        }
        const response = await request.json();
        if(response.cod === 200){
            this.setState({
                lon: response.coord.lon, 
                lat: response.coord.lat, 
                main: response.weather[0].main, 
                description: response.weather[0].description, 
                temp: Math.round((response.main.temp - 273) * 100) / 100, 
                tempFillsLike: Math.round((response.main.feels_like - 273) * 100) / 100, 
                minTemp: Math.round((response.main.temp_min - 273) * 100) / 100, 
                maxTemp: Math.round((response.main.temp_max - 273) * 100) / 100, 
                humidity: response.main.humidity, 
                windSpeed: response.wind.speed, 
                windDeg: response.wind.deg,
                timezone: response.timezone / 3600, 
                country: response.sys.country, 
                city: response.name, 
                showState: showState.READY
            });
        } else {
            this.setState({
                showState: showState.ERROR, 
                errorMessage: response.message
            });
        }
    }

    onCityInputChanged(event) {
        this.setState({city: event.target.value});
    }

    onLonInputChanged(event) {
        this.setState({lon: event.target.value})
    }

    onLatInputChanged(event) {
        this.setState({lat: event.target.value})
    }

    onCityFormSubmited(event) {
        event.preventDefault();
        this.requestData(this.state.city);
    }

    onGeoFormSubmited(event) {
        event.preventDefault();
        this.requestData('', this.state.lon, this.state.lat);
    }

    showState() {
        switch(this.state.showState) {
            case showState.NOTHING_TO_SHOW:
                return (
                    <div>
                        <form className="ui form search-form" onSubmit={this.onCityFormSubmited}>
                            <div className="field">
                                <label className="input-lable">City</label>
                                <input type="text" value={this.state.city} className="form-input"  onChange={this.onCityInputChanged} />
                            </div>
                            <button type="submit" className="ui vertical animated button primary search-button" tabIndex="0">
                                <div className="hidden content" id="color-black">search</div>
                                <div className="visible content">
                                    <i className="search icon" id="color-black"></i>
                                </div>
                            </button>
                        </form>
                        <form className="ui form search-form" onSubmit={this.onGeoFormSubmited}>
                            <div className="field">
                                <label className="input-lable">Lon</label>
                                <input type="text" value={this.state.lon} className="form-input" onChange={this.onLonInputChanged}/>
                            </div>
                            <div className="field">
                                <label className="input-lable">Lat</label>
                                <input type="text" value={this.state.lat} className="form-input" onChange={this.onLatInputChanged}/>
                            </div>
                            <button type="submit" className="ui vertical animated button primary search-button" tabIndex="0">
                                <div className="hidden content" id="color-black">search</div>
                                <div className="visible content">
                                    <i className="search icon" id="color-black"></i>
                                </div>
                            </button>
                        </form>
                    </div>
                );
            case showState.LOADING:
                return (
                    <div className="loading">
                        <i className="icon download"></i>
                    </div>
                );
            case showState.READY:
                return (
                    <div>
                        <form className="ui form search-form" onSubmit={this.onCityFormSubmited}>
                            <div className="field">
                                <label className="input-lable">City</label>
                                <input type="text" value={this.state.city} className="form-input"  onChange={this.onCityInputChanged} />
                            </div>
                            <button type="submit" className="ui vertical animated button primary search-button" tabIndex="0">
                                <div className="hidden content" id="color-black">search</div>
                                <div className="visible content">
                                    <i className="search icon" id="color-black"></i>
                                </div>
                            </button>
                        </form>
                        <form className="ui form search-form" onSubmit={this.onGeoFormSubmited}>
                            <div className="field">
                                <label className="input-lable">Lon</label>
                                <input type="text" value={this.state.lon} className="form-input" onChange={this.onLonInputChanged}/>
                            </div>
                            <div className="field">
                                <label className="input-lable">Lat</label>
                                <input type="text" value={this.state.lat} className="form-input" onChange={this.onLatInputChanged}/>
                            </div>
                            <button type="submit" className="ui vertical animated button primary search-button" tabIndex="0">
                                <div className="hidden content" id="color-black">search</div>
                                <div className="visible content">
                                    <i className="search icon" id="color-black"></i>
                                </div>
                            </button>
                        </form>
                        <table className="weather-details">
                            <tr className="weather-details-rows">
                                <td>Status</td>
                                <td>{`${this.state.main} (${this.state.description})`}</td>
                            </tr>
                            <tr className="weather-details-rows">
                                <td>Current Temperature</td>
                                <td>{this.state.temp}<sup>o</sup></td>
                            </tr>
                            <tr className="weather-details-rows">
                                <td>Temperature Feels Like</td>
                                <td>{this.state.tempFillsLike}<sup>o</sup></td>
                            </tr>
                            <tr className="weather-details-rows">
                                <td>Min Temperature</td>
                                <td>{this.state.minTemp}<sup>o</sup></td>
                            </tr>
                            <tr className="weather-details-rows">
                                <td>Max Temperature</td>
                                <td>{this.state.maxTemp}<sup>o</sup></td>
                            </tr>
                            <tr className="weather-details-rows">
                                <td>Humidity</td>
                                <td>{`${this.state.humidity}%`}</td>
                            </tr>
                            <tr className="weather-details-rows">
                                <td>Wind Speed</td>
                                <td>{`${this.state.windSpeed} (miles per hour)`}</td>
                            </tr>
                            <tr className="weather-details-rows">
                                <td>Wind Direction</td>
                                <td>{`${this.state.windDeg} Deg`}</td>
                            </tr>
                            <tr className="weather-details-rows">
                                <td>Time Zone</td>
                                <td>{`${this.state.timezone} GMT`}</td>
                            </tr>
                            <tr className="weather-details-rows">
                                <td>Country</td>
                                <td>{this.state.country}</td>
                            </tr>
                        </table>
                    </div>
                );
            case showState.ERROR:
                return (
                    <div>
                        <form className="ui form search-form" onSubmit={this.onCityFormSubmited}>
                            <div className="field">
                                <label className="input-lable">City</label>
                                <input type="text" value={this.state.city} className="form-input"  onChange={this.onCityInputChanged} />
                            </div>
                            <button type="submit" className="ui vertical animated button primary search-button" tabIndex="0">
                                <div className="hidden content" id="color-black">search</div>
                                <div className="visible content">
                                    <i className="search icon" id="color-black"></i>
                                </div>
                            </button>
                        </form>
                        <form className="ui form search-form" onSubmit={this.onGeoFormSubmited}>
                            <div className="field">
                                <label className="input-lable">Lon</label>
                                <input type="text" value={this.state.lon} className="form-input" onChange={this.onLonInputChanged}/>
                            </div>
                            <div className="field">
                                <label className="input-lable">Lat</label>
                                <input type="text" value={this.state.lat} className="form-input" onChange={this.onLatInputChanged}/>
                            </div>
                            <button type="submit" className="ui vertical animated button primary search-button" tabIndex="0">
                                <div className="hidden content" id="color-black">search</div>
                                <div className="visible content">
                                    <i className="search icon" id="color-black"></i>
                                </div>
                            </button>
                        </form>
                        <div className="error">error</div>
                    </div>
                );
            default:
                return <div></div>;
        }
    }

    render() {
        return (
            <div className="ui segment weather">
                <div className="weather-title">Weather</div>
                {this.showState()}
            </div>
        );
    }
}

export default Weather;