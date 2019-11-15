import React from "react";
import logo from "./react.svg";
import "./Home.css";
import "react-datepicker/dist/react-datepicker.css";
import Datetime from "react-datetime";
import Timer from './Timer';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskname: "",
      project: "project1",
      start_time: new Date().getTime(),
      end_time: new Date().getTime() + 3600 * 1000,
      timerArray: []
    };
  }
  // static getData(username){
  //   return axios.get(`http://localhost:3000/get?username=${username}`).then(response=>response.data)
  // }
  async componentDidMount() {
    var username = localStorage.getItem("username");

    if (username && username.length > 0) {
      // var responsePromise = await fetch(`/get?username=${username}`);
      // var data = await responsePromise.json();
      // this.setState({
      //   taskData: data,
      //   username
      // });
      this.setState({
        // taskData: data,
        username
      });
    } else {
      location.href = "/";
    }
  }
  render() {
    let taskData = typeof window === 'object' ? window.state : {};
    // console.log(this.props.staticContext.data)
    if(this.props.staticContext && this.props.staticContext.data){
      taskData =  this.props.staticContext.data;
    }
    if(this.state.taskData){
      taskData=this.state.taskData;
    }
    return (
      <div className="Home" id="container">
        <form
          onSubmit={e => {
            e.preventDefault();

            const { project, taskname, start_time, end_time } = this.state;
            if (end_time < start_time) {
              alert("end time should be greater than start time");
              return;
            }
            fetch(
              `/add?username=${this.state.username}&taskname=${taskname}&project=${project}&start_time=${start_time}&end_time=${end_time}`
            ).then(response => {
              window.location.href = location.href;
            });
          }}
        >
          <div>
            <label>task name</label>
            <input
              name="taskname"
              type="text"
              className="form-control"
              value={this.state.taskname}
              onChange={e => {
                this.setState({ taskname: e.target.value });
              }}
            ></input>
          </div>
          <div>
            <label>project name</label>
            <select
              name="project"
              value={this.state.project}
              className="form-control"
              onChange={e => {
                this.setState({ project: e.target.value });
              }}
            >
              <option value="project1">project1</option>
              <option value="project2">project2</option>
              <option value="project3">project3</option>
              <option value="project4">project4</option>
            </select>
          </div>

          <div>
            <label>start time</label>
            <Datetime
              value={new Date(this.state.start_time)}
              inputProps={{
                className: "form-control"
                // disabled: true,
              }}
              onChange={time => {
                try {
                  this.setState({
                    start_time: time.unix() * 1000
                  });
                } catch (err) {}
              }}
            />
            {/* <input name="start_time" type="text"></input> */}
          </div>

          <div>
            <label>end time</label>
            <Datetime
              inputProps={{
                className: "form-control"
              }}
              value={new Date(this.state.end_time)}
              onChange={time => {
                try {
                  this.setState({
                    end_time: time.unix() * 1000
                  });
                } catch (err) {}
              }}
            />
            {/* <input name="end_time" type="text"></input> */}
          </div>
          <button type="submit" className="btn btn-primary mt-2">ADD TASK</button>
        </form>


        <h2 className="mt-5">All Task List</h2>
        <table class="table table-dark">
          
            <thead>
              <tr>
                <th scope="col">Task Name</th>
                <th scope="col">Project name</th>
                <th scope="col">start Time</th>
                <th scope="col">end time</th>
                <th scope="col">Timer</th>
              </tr>
            </thead>
            {/* <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </tbody> */}
          {taskData instanceof Array &&
            taskData.map((item, index) => {
              return (
                <tr>
                  <td>{item.taskname}</td>
                  <td>{item.project}</td>
                  <td>
                    {new Date(parseInt(item.start_time)).toString()}
                  </td>
                  <td>
                    {new Date(parseInt(item.end_time)).toString()}
                  </td>
                  {!(this.state.timerArray.indexOf(index) >= 0) && <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        this.setState({
                          timerArray: [...this.state.timerArray, index]
                        });
                      }}
                    >
                      Click here for timer
                    </button>
                  </td>}
                  <td>
                  {this.state.timerArray.indexOf(index) >= 0 && (
                    <Timer {...item} />
                  )}
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
    );
  }
}



export default Home;
