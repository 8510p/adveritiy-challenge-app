import React from "react";

import "./Display.css";

class Display extends React.Component {
    render() {
      const sumClicks = this.props.sumClicks;
      const sumImpressions = this.props.sumImpressions;
      //console.log(`Display:`, sumClicks, " ", sumImpressions);
  
      return (
        <div className="display">
            <div>
                Clicks:
            </div>
            <div>
                {sumClicks}
            </div>
            <div>
                Impressions:
            </div>
            <div>
                {sumImpressions}
            </div>
        </div>    
      );
    }
  }
export default Display;