import React, { Component } from 'react';
import './App.scss';
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
    const linkTofetch = `https://github-trending-api.now.sh/repositories?${language}${dateRange}`;

    this.setState({
      isDataLoading: true,
    });
  
    fetch(linkTofetch)
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
    this.setState({dateRange: evt.target.value}, () => this.getData());
    window.localStorage.setItem('dateRange', evt.target.value);
  }

  languageChange = evt => {
    this.setState({selectedLanguage: evt.target.value}, () => this.getData());
    window.localStorage.setItem('selectedLanguage', evt.target.value);
  }

  render() {
    return (
      <div className="App">
        <h1>Github trending repositories</h1>
        <h2>Checkout which repository is trending now</h2>
        <h3>
          This website uses API from github repository <a href="https://github.com/huchenme/github-trending-api" target="_blank" rel="noopener noreferrer">
          github-trending-api
          </a>
        </h3>
        <div className="list-options">
          <span className="list-options-label">Trending period:</span> 
          <DateOption
            value="daily"
            onChange={this.dateRangeChange}
            dateRange={this.state.dateRange}
          />
          <DateOption
            value="weekly"
            onChange={this.dateRangeChange}
            dateRange={this.state.dateRange}
          />
          <DateOption
            value="monthly"
            onChange={this.dateRangeChange}
            dateRange={this.state.dateRange}
          />
        <span className="list-options-label list-options-label__second">Language:</span>
          <LanguageOptions  
            onChange={this.languageChange} 
            selectedLanguage={this.state.selectedLanguage}
            languagesList={this.state.languagesList}
          />
        </div>
        <DataTabel 
          isDataLoading={this.state.isDataLoading} 
          data={this.state.data}
        />        
      </div>
    );
  }
}

export default App;
