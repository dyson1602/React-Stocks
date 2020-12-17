import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  displayStocks = () => {
    return this.props.stocksArray.map(stockObj => <Stock key={stockObj.id} stockObj={stockObj} clickHandler={this.props.clickHandler}/>)
  }

  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {this.displayStocks()}
      </div>
    );
  }

}

export default StockContainer;
