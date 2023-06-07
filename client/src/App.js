import './App.css';
import { createBrowserRouter, RouterProvider} from "react-router-dom";

import Home from './Pages/Home';
import Testing from './Pages/Testing';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/testing",
    element: <Testing/>
  },
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
