import React, { useContext, useEffect, useState } from "react";
import { ParameterContext, TestContext } from "../../../App";

const PreviewTest = props => {

    const {type} = props
    const {selectedTest} = useContext(TestContext)
    const {selectedParameter} = useContext(ParameterContext)
    
    

    const displayTestContent = () => {

        return <code> <textarea className="content-textarea" readOnly value={selectedTest.fileContents.join("\n")}>

        </textarea></code>

    }

    const displayParameterContent = () => {

        return <code> <textarea className="content-textarea" readOnly value={selectedParameter.fileContents.join("\n")}>

        </textarea></code>

    }

    return (<>
    
        <div className="content-preview-content">
            {type === "test" && ((!selectedTest || !selectedTest.fileContents) ? <div> Select a test to preview . . .</div> : displayTestContent() )}
            {type === "parameter" && ((!selectedParameter || !selectedParameter.fileContents) ? <div> Select a parameter to preview . . .</div> : displayParameterContent() )}
            
        </div>

    
    </>)
}

export default PreviewTest