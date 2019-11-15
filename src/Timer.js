import React from "react";

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { start_time, end_time } = this.props;
    const currentTime = new Date().getTime();
    if (start_time < currentTime && end_time > currentTime) {
      const updateTimer = () => {
        this.setState({
          currentSecond: parseInt((end_time - new Date().getTime()) / 1000)
        });
      };
      updateTimer();
      this.timer = setInterval(() => {
        updateTimer();
      }, 1000);
    } else if (start_time > currentTime) {
      const updateTimer = () => {
        this.setState({
          currentSecond: parseInt((end_time - new Date().getTime()) / 1000),
          futureEvent: true
        });
      };
      updateTimer();
      this.timer = setInterval(() => {
        updateTimer();
      }, 1000);
    } else if (end_time < currentTime) {
      const updateTimer = () => {
        this.setState({
          currentSecond: parseInt((new Date().getTime() - end_time) / 1000),
          pastEvent: true
        });
      };
      updateTimer();
      this.timer = setInterval(() => {
        updateTimer();
      }, 1000);
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    if (this.state.futureEvent) {
      return (
        <div>
          {this.state.currentSecond
            ? `${this.state.currentSecond} seconds remaining till task starts`
            : ""}
        </div>
      );
    }
    if (this.state.pastEvent) {
      return (
        <div>
          {this.state.currentSecond
            ? `${this.state.currentSecond} seconds since task has ended`
            : ""}
        </div>
      );
    }
    return (
      <div>
        {this.state.currentSecond
          ? `${this.state.currentSecond} seconds remaining till task end`
          : ""}
      </div>
    );
  }
}
