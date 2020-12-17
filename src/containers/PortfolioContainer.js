import React, { Component } from 'react';
import Stock from '../components/Stock'
 
class PortfolioContainer extends Component {

  displayStocks = () => {
    return this.props.portfolioArray.map(stockObj => <Stock key={stockObj.id} stockObj={stockObj} clickHandler={this.props.clickHandler}/>)
  }

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {
            this.displayStocks()
          }
      </div>
    );
  }

}

export default PortfolioContainer;
