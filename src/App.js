import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      data: '',
      languagesList: null,
      selectedLanguage: '',
      dateRange: '',
      isDataLoading: false,
    };
  }

  componentDidMount() {
    this.getData();
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

  dateRangeChange = evt => {
    this.setState({dateRange: evt.target.value}, () => this.getData());
  }

  languageChange = evt => {
    this.setState({selectedLanguage: evt.target.value}, () => this.getData());
  }

  render() {
    return (
      <div className="App">
        <input type="radio" name="dateRange" value="daily" onChange={this.dateRangeChange}/>Daily<br/>
        <input type="radio" name="dateRange" value="weekly" onChange={this.dateRangeChange}/>Weekly<br/>
        <input type="radio" name="dateRange" value="monthly" onChange={this.dateRangeChange}/>Monthly<br/> 
        <select onChange={this.languageChange} value={this.state.value}>
          <optgroup>
            <option value='' key="All">All</option>
          </optgroup>
          <optgroup label="Popular">
          {this.state.languagesList 
              && this.state.languagesList.popular.map(lang => 
              <option value={lang.urlParam} key={lang.name}>{lang.name}</option>)}
          </optgroup>
          <optgroup label="Other">
          {this.state.languagesList 
              && this.state.languagesList.all.map(lang => 
              <option value={lang.urlParam} key={lang.name}>{lang.name}</option>)}
          </optgroup>
        </select>
        {this.state.isDataLoading && <h1>LOADING</h1>}
        {this.state.data.length == 0
          && !this.state.isDataLoading
          && <h2>Sorry no data for this language</h2>}
        <ul>
          {!this.state.isDataLoading 
            && this.state.data
            && this.state.data.map(el => <li key={el.name}>{el.name}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
