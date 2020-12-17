import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  //State

  state = {
    stocksArray: [],
    sortAlpha: true,
    sortPrice: false,
    filter: ""
  }

  componentDidMount() {
    this.fetchAllStocks()
  }

  //EVENT HANDLERS

  buyStockHandler = (stockObj) => {
    let stock = stockObj
    if (stock.favorite === true) {
      stock.favorite = false
    } else {
      stock.favorite = true
    }
    let newArray = [...this.state.stocksArray]
    let idx = newArray.findIndex(stk => stk.id === stock.id)
    newArray[idx] = stock
    this.setState({ stocksArray: newArray })
    console.log(stock)
    this.buyOrSellFetch(stock)
  }


  //API REQUESTS

  fetchAllStocks = async () => {
    const apiResponse = await fetch('http://localhost:4000/stocks')
    const stocksArray = await apiResponse.json()
    this.setState({ stocksArray })
  }

  buyOrSellFetch = async (stockObj) => {
    await fetch(`http://localhost:4000/stocks/${stockObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(stockObj)
    })
  }


  //HELPER FUNCTIONS

  filterStocksArray = () => {

  }

  //RENDER

  render() {
    return (
      <div>
        <SearchBar />

        <div className="row">
          <div className="col-8">

            <StockContainer stocksArray={this.state.stocksArray} clickHandler={this.buyStockHandler} />

          </div>
          <div className="col-4">

            <PortfolioContainer />

          </div>
        </div>
      </div>
    );
  }

}

export default MainContainer;
