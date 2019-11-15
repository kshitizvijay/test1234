import React from "react";
import Route from "react-router-dom/Route";
import Routes from './Routes';
import Switch from "react-router-dom/Switch";
import Home from "./Home";
import AddEntry from "./AddEntry";
import OldTasks from "./OldTasks";
// import "./App.css";

const App = (props) => {
  return <React.Fragment>
    <h1>Sample Task App</h1>
    <NavBar />
    <div class="container">
    <Switch>
        {Routes.map(item=>{
          var MyComp = item.component;
          return <Route path={item.path} component={MyComp} key={item.path}/>
        })}
      </Switch>
      {/* <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/app" component={AddEntry} />
        <Route exact path="/old" component={OldTasks}/>
      </Switch> */}
    </div>
  </React.Fragment>
}

class NavBar extends React.Component {
  constructor(){
    super();
    this.state = {};
  }
  componentDidMount(){
    var username = localStorage.getItem("username");
    this.setState({
      username
    })
  }
  render(){
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="/">
               Register
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href={`/app?username=${this.state.username}`}>
                Add tasks 
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href={`/old?username=${this.state.username}`}>
                Old tasks
              </a>
            </li>
           
          </ul>
        </div>
      </nav>
    );
  }
}

export default App;
