import React from 'react';
import logo from './react.svg';
import './Home.css';
import "react-datepicker/dist/react-datepicker.css";

class Home extends React.Component {
  constructor(){
    super();
    this.state = {
      username : '',
    };
  }
  render() {
    
    return (
      <div className="Home form-group">
        <form onSubmit={(e)=>{
          e.preventDefault();
          if(this.state.username.length > 0){
            localStorage.setItem('username', this.state.username);
            fetch(`/register?username=${this.state.username}`).then(response=>{
              location.href = `/app?username=${this.state.username}`;
            })
          }
          
        }}>
          <label> enter username</label>
          <input class="form-control" type="text" name="username" value={this.state.username} onChange={(e)=>{
            this.setState({
              username: e.target.value
            })
          }}/>
          <button type="submit" className="btn btn-primary mt-2">Submit</button>
        </form>


        
      </div>
    );
  }
}

export default Home;
