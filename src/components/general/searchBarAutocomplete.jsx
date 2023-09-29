import React, { useState } from "react";
import { Search } from "react-feather";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const SearchBarAutocomplete = () => {
  const [myOptions, setMyOptions] = useState([]);

  const getDataFromAPI = () => {
    console.log("Options Fetched from API");

    fetch("http://dummy.restapiexample.com/api/v1/employees")
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        console.log(res.data);
        for (var i = 0; i < res.data.length; i++) {
          myOptions.push(res.data[i].employee_name);
        }
        setMyOptions(myOptions);
      });
  };

  return (
    <>
      {/* <div style={{ display: "flex" }}> */}
      <div className="input-group-prepend">
        <span className="input-group-text h-100" id="basic-addon1">
          <Search color="#182252" />
        </span>
      </div>
      <Autocomplete
        style={{ width: 1000 }}
        freeSolo
        autoComplete
        autoHighlight
        options={myOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={getDataFromAPI}
            variant="outlined"
            label="Search..."
            placeholder="Enter Student Name, ID or Username"
          />
        )}
      />
      {/* </div> */}
    </>
  );
};

export default SearchBarAutocomplete;
