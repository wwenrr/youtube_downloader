import React from "react";
import style from "./cmp.css";
import { logDOM } from "@testing-library/react";

class Main extends React.Component {
  state = {
    output: "C:/Users/qscvd/Documents/Vid/sound",
    url: "",
    loading: false,
    edit_output: false,
    data: [],
  };

  render() {
    return (
      <div className="outSide_box">
        <div>
          <label>Nhập Url Youtube: </label>
          <input
            type="text"
            disabled={this.state.loading}
            value={this.state.url}
            onChange={(e) => {
              this.setState({
                url: e.target.value,
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  this.setState({ edit_output: false });
                }
              }}
            />
          )}
          {this.state.edit_output === false && (
            <span style={{ color: "blue" }}>{this.state.output}</span>
          )}
        </div>

        <br></br>
        <button
          type="submit"
          disabled={this.state.loading}
          onClick={() => {
            this.setState({ loading: true });
            const url = this.state.url;
            const output = this.state.output;
            console.log(url, `${output}/%(title)s.mp4`);
            fetch("http://localhost:5000/api/download", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                url: url,
                output: `${output}/%(title)s.mp4`,
              }),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok.");
                }
                return response.json();
              })
              .then((data) => {
                // alert(JSON.stringify(data));
                this.setState({
                  loading: false,
                  data: JSON.stringify(data, null, 2),
                });
              })
              .catch((error) => {
                // alert(`Error: ${error.message}`);
                this.setState({
                  loading: false,
                  data: JSON.stringify(error, null, 2),
                });
              });
          }}
        >
          Submit
        </button>
        <br></br>
        <button
          onClick={() => {
            this.setState({ edit_output: true });
          }}
        >
          Đổi Output
        </button>

        <div className="log_box">
          <div>Log:</div>
          <div className="log">
            <div>{this.state.data}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
