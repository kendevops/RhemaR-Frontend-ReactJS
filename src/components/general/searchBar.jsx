import React from "react";
import { Search } from "react-feather";

const searchBarStyle = {
  width: "70%",
  padding: "1.4%",
  outline: "none",
  border: "none",
};

const searchButtonStyle = {
  //   border: "none",
};

const SearchBar = (props) => {
  const { onSearch, inputOnChange, placeholder } = props;

  return (
    <>
      <div
        className="input-group bg-blue-400"
        style={{ border: "2px solid #203864" }}
      >
        <div className="input-group-prepend g-search-icon">
          <span className="input-group-text h-100 " id="basic-addon1">
            <Search color="#182252" />
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder={placeholder ? placeholder : "Enter Your Search Key"}
          style={searchBarStyle}
          onChange={inputOnChange}
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <div className="input-group-append">
          <button
            onClick={onSearch}
            style={searchButtonStyle}
            className="btn btn-lg btn-blue-800 rounded-0"
            type="button"
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
