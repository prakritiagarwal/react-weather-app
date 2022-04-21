import React from 'react';
import './Style.css'

class CitySearch extends React.Component{

  constructor(props){
      super(props)
      this.state = {searchInputValue: ""}
  }

  onFormSubmit = (event) =>{
      event.preventDefault();
      this.props.onSearchSubmit(this.state.searchInputValue)
      
  }

  render() {
      return(
        <>
          <h1 class="align:center">Weather App</h1> 
          <div class="card">        
            <div class="search">
              <form className="search-loaction" onSubmit={this.onFormSubmit}>
                <input type="text" id="zipcode_input" placeholder="Enter ZipCode"
                  onChange={(event) => this.setState({searchInputValue: event.target.value})}>
                </input>
              </form> 
            </div>
          </div>   
        </>
      )
  }
}

class WeatherCard extends React.Component{
  render() {
    const date = new Date().toLocaleDateString('en-us', { weekday:"short", month:"short", day:"numeric", hour:"numeric", minute:"numeric"});      
      return(
        <div>
            <h3>City {this.props.cityResult.name}</h3>
            <h3>Temperature {this.props.weatherResult.current.temp}</h3>
            <h3>Date {date}</h3>
            <h3>Conditions {this.props.weatherResult.current.weather[0].description}</h3>
            <h3>Humidity {this.props.weatherResult.humidity}</h3>
            <h3>High {this.props.weatherResult.daily[0].temp.max}°F</h3>
            <h3>Low {this.props.weatherResult.daily[0].temp.min}°F</h3>
        </div>
      )
  }
}

class App extends React.Component{
    state = {weatherResult: null, cityResult: null}    


     onSearchSubmit = async (searchInputValue) => {
      console.log(`you searched ${searchInputValue}`);
      let apiKey = '025551c2ec00d510aa3cb30f1a56a741';
      let apiUrl=`https://api.openweathermap.org/geo/1.0/zip?zip=${searchInputValue},US&appid=${apiKey}`;

      fetch(apiUrl)
      .then((response) => response.json())
      .then((cityJson) => {        
          let city=cityJson.name;
          let lat=cityJson.lat;
          let lon=cityJson.lon;
          console.log('Api response');
          console.log(city);
          console.log(lat);
          console.log(lon);
  
          let apiUrl2=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  
          fetch(apiUrl2)
          .then((response) => response.json())
          .then((weatherdataJson) => {
            console.log('Api response2');
            console.log(weatherdataJson);
            this.setState({weatherResult: weatherdataJson, cityResult: cityJson});  
          });
      });    
     }


    render() {
        return(
            <div>                
                 <CitySearch onSearchSubmit = {this.onSearchSubmit} />
                 {this.state.weatherResult ?  
                 <WeatherCard weatherResult = {this.state.weatherResult} cityResult = {this.state.cityResult} /> : <div></div>}
            </div>
        )
    }

}

export default App;