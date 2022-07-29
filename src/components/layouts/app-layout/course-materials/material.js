import React from "react";
import { Icon } from '@iconify/react';

const Material = (props)=>{

    var materialType = props.materialType;
    var materialTitle = props.materialTitle;


    switch(materialType){

        case "video":
            var typeIcon = <Icon icon="arcticons:video" width="50" height="50" />;
            var materialBackgroundColor = "green";
            var playIcon = <Icon icon="ei:play" />;
            break;

        case "audio":
            var typeIcon = <Icon icon="cil:audio-spectrum" width="50" height="50" />;
            var materialBackgroundColor = "purple";
            var playIcon = <Icon icon="ei:play" />;
            break;

        case "pdf":
            var typeIcon = <Icon icon="icomoon-free:file-pdf" width="50" height="50" />;
            var materialBackgroundColor = "red";
            var playIcon = "";
            break;

        default : 
            //

    }

    
    const materialStyle = {
        background : materialBackgroundColor,
        height : "20vh",
        width : "100%"
    }

    const buttonStyle = {
        width : "95%",
        color : "white",
        background : "blue"
    }

    return(
        <>
            <div style = {materialStyle}>

                <div>
                    {typeIcon}
                </div>

                <div style={{display : "grid", gridTemplateColumns : "3fr 1fr"}}>

                    <div>
                        <h1>{materialTitle}</h1>
                    </div>
                    
                    <div>
                        {playIcon}
                    </div>

                </div>
                
                <center>
                    <button style = {buttonStyle}>Download <Icon icon="ant-design:cloud-download-outlined" /></button>
                </center>
                
            </div>

        </>
    )
}

export default Material;