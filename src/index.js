import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";
class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // lat is latitude
  //   // THIS IS THE ONLY TIME we do direct assignment =
  //   this.state = { lat: null, errorMessage: "" };
  // }
  state = { lat: null, errorMessage: "" };

  //Put initial loading requests inside componentDidMount
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ lat: position.coords.latitude }),
      // never this.state.lat = position.coords.latitude
      (err) => this.setState({ errorMessage: err.message })
    );
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }
    return <Spinner message="Please accept location request." />;
  }
  render() {
    return <div className="boader red">{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
