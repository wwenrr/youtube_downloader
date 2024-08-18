import React from "react";
import style from "./cmp.css";
import { logDOM, logRoles } from "@testing-library/react";

class Main extends React.Component {
  state = {
    output: "C:/Users/qscvd/Documents/Vid/sound",
    url: "",
    loading: false,
    edit_output: false,
    data: [],
    quality: -1,
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
          <select
            disabled={this.setState.loading}
            title="Chọn độ phân giải"
            onChange={(e) => {
              let val = parseInt(e.target.value, 10);
              let notice = [
                "Lưu ý nếu vid không hỗ trợ độ phân giải thì ưu tiên độ phân giải thấp hơn",
              ];
              let arr = [];
              if (val >= 1080) {
                arr = ["\nVid chất lượng cao mất nhiều thời gian để tải!"];
              } else {
                arr = [];
              }

              this.setState({
                data: notice.concat(arr),
                quality: val,
              });
            }}
          >
            <option value="-1" selected>
              Quality
            </option>
            <option value="4000">4k</option>
            <option value="2000">2k</option>
            <option value="1080">1080</option>
            <option value="720">720</option>
            <option value="480">480</option>
            <option value="360">360</option>
          </select>
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
            if (this.state.quality == -1) {
              this.setState({ data: ["Vui lòng chọn độ phân giải!"] });
              return;
            }
            if (!this.state.url) {
              this.setState({ data: ["Vui lòng nhập url"] });
              return;
            }
            if (!this.state.output) {
              this.setState({ data: ["Chưa chọn output"] });
              return;
            }
            this.setState({ loading: true, data: [] });

            fetch("http://localhost:5000/api/download", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                url: this.state.url,
                output: `${this.state.output}/%(title)s.mp4`,
                quality: this.state.quality,
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
                  url: "",
                });
              })
              .catch((error) => {
                // alert(`Error: ${error.message}`);
                this.setState({
                  loading: false,
                  data: JSON.stringify(error, null, 2),
                  url: "",
                });
              });
          }}
        >
          Submit
        </button>
        <br></br>
        <button
          disabled={this.state.loading}
          onClick={() => {
            let newOutput = !this.state.edit_output;
            this.setState({ edit_output: newOutput });
          }}
        >
          Đổi Output
        </button>

        <div className="log_box">
          <div>Log:</div>
          <div className="log">
            <pre>{this.state.data}</pre>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
