import React, { Component } from 'react';
import './App.css';
import LanguageOptions from './Components/LanguageOptions';
import DateOption from './Components/DateOption';
import DataTabel from './Components/DataTable'


class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      data: [],
      languagesList: {},
      selectedLanguage: '',
      dateRange: '',
      isDataLoading: false,
    };
  }

  componentDidMount() {
    this.getSavedOptions();
    this.getLanguages();
  }

  getLanguages = () => {
    fetch('https://github-trending-api.now.sh/languages')
    .then(response => response.json())
    .then(response => {
      this.setState({
        languagesList: response,
      });
    });
  }

  getData = () => {
    const language = this.state.selectedLanguage ? `&language=${this.state.selectedLanguage}` : '';
    const dateRange = this.state.dateRange ? `&since=${this.state.dateRange}` : '';

    this.setState({
      isDataLoading: true,
    });
  
    fetch(`https://github-trending-api.now.sh/repositories?${language}${dateRange}`)
      .then(response => response.json())
      .then(response => {
        this.setState({
          data: response,
          isDataLoading: false,
        });
      });
  }

  getSavedOptions = () => {
    this.setState({
      dateRange: window.localStorage.getItem('dateRange') || 'daily',
      selectedLanguage: window.localStorage.getItem('selectedLanguage') || '',
    }, () => this.getData())
  }

  dateRangeChange = evt => {
    console.log(evt.target.value);
    this.setState({dateRange: evt.target.value}, () => this.getData());
    window.localStorage.setItem('dateRange', evt.target.value);
  }

  languageChange = evt => {
    this.setState({selectedLanguage: evt.target.value}, () => this.getData());
    window.localStorage.setItem('selectedLanguage', evt.target.value);
  }

  savedRadioChecked = (type) => {
    return this.state.dateRange === type ? 'checked' : '';
  }

  render() {
    return (
      <div className="App">

        <DateOption
          value="monthly"
          onChange={this.dateRangeChange}
          dateRange={this.state.dateRange}
        />

<input type="radio" name="dateRange" value="daily" id="daily" 
        checked={this.savedRadioChecked('daily')}
        onChange={this.dateRangeChange}/><label htmlFor="daily">Daily</label>
       
        <input type="radio" name="dateRange" value="weekly" id="weekly" 
        checked={this.savedRadioChecked('weekly')}
        onChange={this.dateRangeChange}/><label htmlFor="weekly">Weekly</label>
        {/* <input type="radio" name="dateRange" value="monthly" id="monthly" 
        checked={this.savedRadioChecked('monthly')}
        onChange={this.dateRangeChange}/><label htmlFor="monthly">Monthly</label><br/>*/}
        <LanguageOptions  
          onChange={this.languageChange} 
          selectedLanguage={this.state.selectedLanguage}
          languagesList={this.state.languagesList}
        />
        <DataTabel isDataLoading={this.state.isDataLoading} data={this.state.data}/>        
      </div>
    );
  }
}

export default App;
