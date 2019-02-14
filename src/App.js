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
      dateRange: window.localStorage.getItem('dateRange') || '',
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

  savedRadioChecked = (type) => {
    console.log(type);
    return this.state.dateRange === type;
  }

  render() {
    return (
      <div className="App">
        <input type="radio" name="dateRange" value="daily" id="daily" 
        defaultChecked={this.savedRadioChecked('daily')} 
        onChange={this.dateRangeChange}/>  <label htmlFor="daily">Daily</label>
        <input type="radio" name="dateRange" value="weekly" id="weekly" 
        defaultChecked={this.savedRadioChecked('weekly')} 
        onChange={this.dateRangeChange}/><label htmlFor="weekly">Weekly</label>
        <input type="radio" name="dateRange" value="monthly" id="monthly" 
        defaultChecked={this.savedRadioChecked('monthly')} 
        onChange={this.dateRangeChange}/><label htmlFor="monthly">Monthly</label><br/>
        <select onChange={this.languageChange} value={this.state.selectedLanguage}>
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
        {this.state.data.length === 0
          && !this.state.isDataLoading
          && <h2>Sorry, no data available for this language</h2>}
        <table>
          <thead>
            <tr>
              <th>
                No.
              </th>
              <th>
                Language
              </th>
              <th>
                Repo Name
              </th>
              <th>
                Author
              </th>
            </tr>
          </thead>
          <tbody>
          {!this.state.isDataLoading 
            && this.state.data
            && this.state.data.map((el, index) => {
              const bcgColor = {backgroundColor: el.languageColor};
             return <tr key={`${el.name} ${el.description}`}>
                <td>{index + 1}</td>
                <td style={bcgColor}>{el.language ? el.language : '----'}</td>
                <td>{el.name}</td>
                <td>{el.author}</td>
              </tr>
              }
            )}
            {this.state.isDataLoading && <tr><th colSpan="4">LOADNIG</th></tr>}
          </tbody>
        </table>
         
        
      </div>
    );
  }
}

export default App;
