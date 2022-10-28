import React, { useState } from "react";
import SearchBar from "../../../general/searchBar";
import MaterialRow from "./materialRow";

const MaterialRender = ()=>{

    var [materialClassLink, setMaterialClassLink] = useState("/");

    return(
        <>

            <div>
                <center>
                    <h1>Download</h1>
                </center>
            </div>

            <SearchBar />

            <div style = {{borderBottom : "0.2px solid silver", outline : "none"}}>

                <button onClick={(setMaterialClassLink("/"))}>RBTC Materials Level 1</button>
                <button onClick={(setMaterialClassLink("/"))}>RBTC Materials Level 2</button>

            </div>

            <MaterialRow materialClassLink = {materialClassLink}/>

        </>
    );
    
}

export default MaterialRender;