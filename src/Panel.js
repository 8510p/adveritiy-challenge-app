import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import _ from "lodash";
import axios from "axios";
import Display from "./Display";

import "./Display.css";

class Panel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      csvData: [{}],
      searchLabels: [],
      metric: '',
      selectedValue: '',
      sumClicks: 0,
      sumImpressions: 0
    }

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  
  handleSelectChange(selectedOption) {

    this.setState({ 
      metric : selectedOption.metric,
      selectedValue: selectedOption.label,
      sumClicks: _(this.state.csvData)
                  .filter(function (o) { return o[selectedOption.metric] == selectedOption.label; })
                  .reduce(function (memoizer, value) {
                    return memoizer + value.clicks;
                  }, 0),
      sumImpressions: _(this.state.csvData)
                        .filter(function (o) { return o[selectedOption.metric] == selectedOption.label; })
                        .reduce(function (memoizer, value) {
                          return memoizer + value.impressions;
                        }, 0)
    });

    console.log(`Option selected:`, selectedOption);

  }

componentDidMount(){
  //http://localhost:8000/test.csv
  axios.get('http://typeaheadaggregates.free.beeceptor.com').then(results => 
    {
      const rawData = results.data;
      console.log(rawData);
      this.setState(
        {
          csvData: this.csvJSON(rawData),
          searchLabels: this.setSearchLabels(this.csvJSON(rawData))
        }
      );
      console.log("StateCSVData", this.state.csvData);
      console.log("SearchLabels", this.state.searchLabels);
    }
    );

}

csvJSON(csv) {

  var lines = csv.split("\n");

  var result = [];

  var headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {

    var obj = {};
    var currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      let isNumber = !isNaN(currentline[j]);

      isNumber ? (obj[headers[j]] = Number(currentline[j])) : (obj[headers[j]] = String(currentline[j]));
    
    }

    result.push(obj);

  }
  console.log("csvToJson result", result);

  return result;
}

  setSearchLabels(csv){

    var resultUniqCampaign = _.uniqBy(csv, "campaign");
    var resultUniqChanel = _.uniqBy(csv, "channel");

    resultUniqCampaign = _.map(resultUniqCampaign, function(item) {
      return {
        label: item.campaign,
        metric: "campaign"
      };
    });
    
    resultUniqChanel = _.map(resultUniqChanel, function(item) {
      return {
        label: item.channel,
        metric: "channel"
      };
    });

    return _.union(resultUniqCampaign, resultUniqChanel);

  }

  render() {
    return (
      <div className="component-panel">
        <div>
        Choose chanel or campaign:
        <Select
          onChange={this.handleSelectChange}
          options={this.state.searchLabels}
        />
        </div>
        <div>
        <Display 
          sumClicks={this.state.sumClicks}
          sumImpressions={this.state.sumImpressions}
        />
        </div>
      </div>
    );
  }
}

export default Panel;