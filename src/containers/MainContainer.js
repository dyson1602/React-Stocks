import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  //State

  state = {
    stocksArray: [],
    filteredArray: [],
    sort: "None",
    filter: "All"
  }

  componentDidMount() {
    this.fetchAllStocks()
  }

  //EVENT HANDLERS

  stockHandler = (stockObj) => {
    let stock = stockObj

    if (stock.portfolio === true) {
      stock.portfolio = false
    } else {
      stock.portfolio = true
    }
    
    let newArray = [...this.state.stocksArray]
    let idx = newArray.findIndex(stk => stk.id === stock.id)
    newArray[idx] = stock
    
    this.setState({ stocksArray: newArray })
    this.buyOrSellFetch(stock)
  }
  
  filterStocksHandler = (e) => {
    this.setState({filter: e})
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


  // filteredStocksArray = () => {
  //   let filteredStocks = [...this.state.stocksArray]

  //   if(this.state.filter !== "All"){
  //     filteredStocks =  filteredStocks.filter(stock => stock.type === this.state.filter)        
  //   } 

  //   switch(this.state.sort){
  //     case "Alphabetically":
  //       return filteredStocks.sort((a,b) => a.name > b.name ? 1 : -1)
  //     case "Price":
  //         return filteredStocks.sort((a,b) => a.price > b.price ? 1 : -1)
  //     default:
  //       return filteredStocks
  //   }
  // }

  modifyStocksArray = () => {
    let filteredStocks = [...this.state.stocksArray]

    if (this.state.filter !== "All") {
      filteredStocks = filteredStocks.filter(stock => stock.type === this.state.filter)
    }
    
    switch(this.state.sort){
      case "Alphabetically":
        return filteredStocks.sort((a,b) => a.name > b.name ? 1 : -1)
      case "Price":
        return filteredStocks.sort((a,b) => a.price > b.price ? 1 : -1)
      default:
        return filteredStocks
    }
  }

  portfolioArray = () => {
    return this.modifyStocksArray().filter(stock => stock.portfolio)
  }

  //RENDER

  render() {
    return (
      <div>
        <SearchBar filterStocksHandler={this.filterStocksHandler}/>

        <div className="row">
          <div className="col-8">

            <StockContainer stocksArray={this.modifyStocksArray()} clickHandler={this.stockHandler} />

          </div>
          <div className="col-4">

            <PortfolioContainer portfolioArray={this.portfolioArray()} clickHandler={this.stockHandler}/>

          </div>
        </div>
      </div>
    );
  }

}

export default MainContainer;
