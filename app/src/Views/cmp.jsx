import React from "react";
import style from "./cmp.css";

class Main extends React.Component {
  state = {
    output: "C:/Users/qscvd/Documents/Vid/sound",
    name: "",
    loading: false,
    edit_output: false,
  };

  render() {
    return (
      <div className="outSide_box">
        <div>
          <label>Nhập Url Youtube: </label>
          <input
            type="text"
            // disabled={this.state.loading}
            value={this.state.name}
            onChange={(e) => {
              this.setState({
                name: e.target.value,
              });
            }}
          />
        </div>

        <div>
          <label>Output: </label>
          {this.state.edit_output === true && (
            <input
              type="text"
              value={this.state.output}
              onChange={(e) => {
                this.setState({
                  output: e.target.value,
                });
              }}
            />
          )}
          {this.state.edit_output === false && (
            <span style={{ color: "blue" }}>{this.state.output}</span>
          )}
        </div>

        <button
          type="submit"
          // disabled={this.state.loading}
          onClick={this.setState({ loading: true })}
        >
          Submit
        </button>

        <div className="log_box">
          <div>Log:</div>
          <div className="log"></div>
        </div>
      </div>
    );
  }
}

export default Main;
