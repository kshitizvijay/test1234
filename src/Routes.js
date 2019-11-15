import Home from "./Home";
import AddEntry from "./AddEntry";
import OldTasks from "./OldTasks";

const Routes = [
    {
        path: '/old',
        exact: true,
        component: OldTasks,
      },
  {
    path: '/app',
    exact: true,
    component: AddEntry,
  },
  
  {
    path: '/',
    exact: true,
    component: Home
  }
];

export default Routes;