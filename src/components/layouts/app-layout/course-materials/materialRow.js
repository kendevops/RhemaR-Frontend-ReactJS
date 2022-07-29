import React, { useEffect, useState } from "react";
import axios from "axios";
import Material from "./material";

const MaterialRow = (props)=>{

    var materialClassLink = props.materialClassLink;

    const [materials, setMaterials] = useState("");

    const getMaterials = ()=>{
        axios.post({materialClassLink}, {})
        .then((response)=>{setMaterials(response)});
    }

    useEffect(()=>{
        getMaterials();
    });

    /*----------------------------------------------------------------------------------------------*/
    /*-- The test material variable below should be deleted when the data is ready to be fetched. --*/
    /*----------------------------------------------------------------------------------------------*/

    const testMaterials = [        {
            name : "God's_time.mp4",
            type : "video"
        },
        {
            name : "God's_time.pdf",
            type : "pdf"
        }
    ]

    /*---------------------------------------------------------------------------------------------------*/
    /*-- The variable "testMaterials" should be changed to "materials" when working with fetched data. --*/
    /*---------------------------------------------------------------------------------------------------*/

    return(
        <>
            <div style = {{display : "grid", gridTemplateColumns : "1fr 1fr 1fr"}}>

                {
                    testMaterials.map((material)=>{
                        <Material material = {material} />
                    })
                }

            </div>
        </>
    )
}

export default MaterialRow;