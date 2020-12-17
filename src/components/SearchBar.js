import React from 'react';

const SearchBar = (props) => {

  function localFilterStocksHandler(e) {
    props.filterStocksHandler(e.target.value)
  }

  function localRadioHandler(e) {
    props.updateSort(e.target.value)
  }

  return (
    <div> 

      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="Alphabetically" name="sort" checked={props.sort === 'Alphabetically'} onChange={localRadioHandler}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Price" name="sort" checked={props.sort === 'Price'} onChange={localRadioHandler}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={localFilterStocksHandler}>
          <option value="All">All</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
