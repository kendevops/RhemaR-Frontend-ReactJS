import React from "react";

const SearchBar = ()=>{

    const searchBarStyle = {
        width : "70%",
        padding : "1.4%",
        outline : "none",
        border : "none"
    }

    const searchButtonStyle = {
        background : "blue",
        color : "white",
        padding : "1%",
        outline : "none",
        border : "none"
    }

    return(
        <>
            <div>
                <input type = "text" placeholder =  "Enter Your Search Key" style = {searchBarStyle}/>
                <button style = {searchButtonStyle}>Search</button>
            </div>
        </>
    )

}

export default SearchBar;