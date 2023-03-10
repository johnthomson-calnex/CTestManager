import React, { useState } from "react";
import PreviewContent from "./PreviewContent";

const ContentWindow = props => {

    const [selectedTab,setSelectedTab] = useState("test")

    const clickContentTab = name => {
        if(selectedTab)
            document.getElementById(`content-${selectedTab}`).classList.remove("active-content-tab")
        document.getElementById(`content-${name}`).classList.add("active-content-tab")
        setSelectedTab(name)
    }

    return (<>

        <div className="window-header">
            <div className="content-tabs">
                <div className="content-tab active-content-tab" onClick={() => clickContentTab("test")} id="content-test">
                    Preview Test
                </div>
                <div className="content-tab" onClick={() => clickContentTab("parameter")} id="content-parameter">
                    Preview Parameter
                </div>
            </div>
        </div>

        <div className="content-preview">
            {selectedTab === "test" && <PreviewContent {...props} type="test" />}
            {selectedTab === "parameter" && <PreviewContent {...props} type="parameter" />}
        </div>
    
    </>)
}

export default ContentWindow