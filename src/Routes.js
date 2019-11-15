import Home from "./Home";
import AddEntry from "./AddEntry";
import OldTasks from "./OldTasks";
import axios from "axios";

const Routes = [
  {
    path: "/old",
    exact: true,
    component: OldTasks,
    getData: username => {
      return axios
        .get(`http://localhost:3000/get?username=${username}`)
        .then(response => response.data);
    }
  },
  {
    path: "/app",
    exact: true,
    component: AddEntry,
    getData: username => {
      return axios
        .get(`http://localhost:3000/get?username=${username}`)
        .then(response => response.data);
    }
  },

  {
    path: "/",
    exact: true,
    component: Home
  }
];

export default Routes;
