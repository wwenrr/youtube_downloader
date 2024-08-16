import React from "react";
import style from "./cmp.css";
import { logDOM } from "@testing-library/react";

class Main extends React.Component {
  state = {
    output: "D:/backend0/audio",
    url: "",
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
            />
          )}
          {this.state.edit_output === false && (
            <span style={{ color: "blue" }}>{this.state.output}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={this.state.loading}
          onClick={() => {
            this.setState({ loading: true });
            const url = this.state.url;
            const output = this.state.output;
            console.log(url, output);
            fetch("http://localhost:5000/api/download", {
              method: "POST", // Thay đổi phương thức thành POST
              headers: {
                "Content-Type": "application/json", // Đặt loại nội dung là JSON
              },
              body: JSON.stringify({
                url: url,
                output: output,
              }), // Gửi dữ liệu trong body dưới dạng JSON
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok.");
                }
                return response.json();
              })
              .then((data) => {
                alert(JSON.stringify(data));
                this.setState({
                  loading: false,
                });
              })
              .catch((error) => {
                alert(`Error: ${error.message}`);
                this.setState({
                  loading: false,
                });
              });
          }}
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
