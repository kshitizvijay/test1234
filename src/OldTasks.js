import React from "react";
import logo from "./react.svg";
import "./Home.css";
import Timer from './Timer';
import axios from 'axios';


class OldTasks extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   timerArray: []
    // };
    this.state = {};
    if (props.staticContext && props.staticContext.data) {
      this.state = {
        taskData: props.staticContext.data,
      };
    }
    this.state.timerArray = [];
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
    const {taskData} = this.state;
    // let taskData = typeof window === 'object' ? window.state : {};
    // // console.log(this.props.staticContext.data)
    // if(this.props.staticContext && this.props.staticContext.data){
    //   taskData =  this.props.staticContext.data;
    // }
    // if(this.state.taskData){
    //   taskData=this.state.taskData;
    // }
    return (
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
            if(new Date(parseInt(item.end_time)).getTime() > new Date().getTime() ){
                return null;
            }
            return (
              <tr>
                <td>{item.taskname}</td>
                <td>{item.project}</td>
                <td>{new Date(parseInt(item.start_time)).toString()}</td>
                <td>{new Date(parseInt(item.end_time)).toString()}</td>
                {!(this.state.timerArray.indexOf(index) >= 0) && (
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        this.setState({
                          timerArray: [...this.state.timerArray, index]
                        });
                      }}
                    >
                      Click here to find time since task ended
                    </button>
                  </td>
                )}
                <td>
                  {this.state.timerArray.indexOf(index) >= 0 && (
                    <Timer {...item} />
                  )}
                </td>
              </tr>
            );
          })}
      </table>
    );
  }
}

export default OldTasks;
