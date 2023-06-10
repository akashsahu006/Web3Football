import { createBrowserRouter, RouterProvider} from "react-router-dom";

import Home from './Pages/Home';
import Testing from './Pages/Testing';
import Marketplace from "./Pages/Marketplace";
import PlayerCards from "./Pages/PlayerCards";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/Game",
    element: <Testing/>
  },
  {
    path:"/Marketplace",
    element: <Marketplace/>
  },
  {
    path: "/Yourcards",
    element: <PlayerCards/>
  }
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
