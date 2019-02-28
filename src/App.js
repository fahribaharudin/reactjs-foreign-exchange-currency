import React, { Component } from "react"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.css"
import "./App.css"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeCurrency: "USD",
      activeCurrencyValue: 10000,
      selectedCurrencies: ["USD", "CAD", "IDR", "GBP", "CHF", "SGD", "INR", "MYR", "JPY", "KRW"],
      rates: {},
      addMoreCurrency: false,
      addMoreCurrencySelectedValue: 0,
    }
  }
  componentDidMount() {
    axios.get("https://api.exchangeratesapi.io/latest?base=USD")
      .then(response => {
        this.setState({
          rates: response.data.rates
        })
      }).catch(error => {
        console.log(error)
      })
  }
  removeCurrency(base) {
    let selectedCurrencies = this.state.selectedCurrencies
    selectedCurrencies.splice(selectedCurrencies.indexOf(base), 1)
    this.setState({selectedCurrencies: selectedCurrencies})
  }
  addMoreCurrency() {
    if (this.state.addMoreCurrencySelectedValue !== 0) {
      let selectedCurrencies = this.state.selectedCurrencies
      selectedCurrencies.push(this.state.addMoreCurrencySelectedValue)
      this.setState({
        selectedCurrencies: selectedCurrencies,
        addMoreCurrencySelectedValue: 0,
        addMoreCurrency: false
      })
    }
  }
  changeActiveCurrency(evt) {
    axios.get("https://api.exchangeratesapi.io/latest?base="+evt.target.value)
      .then(response => {
        this.setState({
          activeCurrency: response.data.base,
          rates: response.data.rates,
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
  render() {
    return (
      <div className="app container">
        <div className="row justify-content-center">
          <div className="col-7">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-3">Foreign Exchange Currency App</h5>
                <div className="row">
                  <div className="col-4">
                    <select className="form-control" id="active-currency" value={this.state.activeCurrency} onChange={this.changeActiveCurrency.bind(this)}>
                      {
                        Object.keys(this.state.rates).map((base, i) => (
                          <option key={i}>{base}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="col-8">
                    <input type="text" className="form-control" id="active-currency-input" value={this.state.activeCurrencyValue} onChange={evt => { this.setState({activeCurrencyValue: evt.target.value}) }}/>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="list-group">
                  {
                    this.state.selectedCurrencies.map((base, i) => {
                      return base !== this.state.activeCurrency ? (
                        <div key={i} className="list-group-item mb-3">
                          <div className="row">
                            <div className="col-10 d-flex justify-content-between align-items-top pr-3">
                              <p>{base}<br/><small>1 {this.state.activeCurrency} = {base + " "} {this.state.rates[base] !== undefined ? this.state.rates[base].toLocaleString(undefined, { minimumFractionDigits: 4 }) : ""}</small></p>
                              <p>{(this.state.rates[base] * this.state.activeCurrencyValue).toLocaleString()}</p>
                            </div>
                            <div className="col-2 d-flex justify-content-center align-items-center" style={{borderLeft: "1px solid #ddd"}}>
                              <button className="btn" onClick={() => { this.removeCurrency(base) }}>(-)</button>
                            </div>
                          </div>
                        </div>   
                      ) : ""
                    })
                  }
                  {
                    !this.state.addMoreCurrency ? 
                    <div className="list-group-item">
                      <button className="btn" onClick={() => { this.setState({ addMoreCurrency: !this.state.addMoreCurrency }) }}>(+) Add More Currencies</button>
                    </div> :
                    <div className="input-group">
                      <select className="custom-select" value={this.state.addMoreCurrencySelectedValue} onChange={evt => {this.setState({addMoreCurrencySelectedValue: evt.target.value})}}>
                        <option value="0">Choose...</option>
                        {
                          Object.keys(this.state.rates).filter(base => !this.state.selectedCurrencies.includes(base, 0)).map((base, i) => (
                            <option key={i} value={base}>{base}</option>
                          ))
                        }
                      </select>
                      <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.addMoreCurrency.bind(this)}>Submit</button>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
