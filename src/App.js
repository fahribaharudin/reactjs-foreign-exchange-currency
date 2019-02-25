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
      supportedCurrencies: [
        "USD", "CAD", "IDR", "GBP", "CHF", "SGD", "INR", "MYR", "JPY", "KRW"
      ],
      rates: {}
    }
  }
  componentDidMount() {
    axios.get("https://api.exchangeratesapi.io/latest?base=USD")
      .then(response => {
        console.log(response.data.rates)
        this.setState({
          rates: response.data.rates
        })
      }).catch(error => {
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
                <p>{this.state.activeCurrency} - United States Dollars</p>
                <h5>
                  <span>{this.state.activeCurrency}</span>
                  <span className="float-right">{this.state.activeCurrencyValue.toLocaleString()}</span>
                </h5>
              </div>
              <div className="card-body">
                <ul className="list-group">
                  {
                    this.state.supportedCurrencies.map((base, i) => {
                      return base !== this.state.activeCurrency ? (
                        <li key={i} className="list-group-item mb-3">
                          <div className="row">
                            <div className="col-10 d-flex justify-content-between align-items-top pr-3">
                              <p>{base}<br/><small>1 {this.state.activeCurrency} = {base + " "} {this.state.rates[base] !== undefined ? this.state.rates[base].toLocaleString() : ""}</small></p>
                              <p>{(this.state.rates[base] * this.state.activeCurrencyValue).toLocaleString()}</p>
                            </div>
                            <div className="col-2 d-flex justify-content-center align-items-center" style={{borderLeft: "1px solid #ddd"}}>
                              <button className="btn">(-)</button>
                            </div>
                          </div>
                        </li>   
                      ) : ""
                    })
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
