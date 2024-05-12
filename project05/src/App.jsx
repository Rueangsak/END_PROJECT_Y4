
import { Routes,Route,BrowserRouter,Link, Navigate ,Redirect  } from "react-router-dom";
import Work from "./pages/Work";
import Open from "./pages/Open";
import Main from "./pages/Main";
import Show from "./pages/Show";


import "./CSS/App.css"
import './CSS/style.css'



import LogIn from "./login/LogIn";
import SignUp from "./login/SignUp";
import Logout from "./login/Logout";
import { AuthProvider } from "./login/Auth";
const App = () => {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={< Main />} />
              <Route path="/Login" element={< LogIn />} />
              <Route path="/Logout" element={<Logout/>}/>
              <Route path="/SignUp" element={< SignUp />} />
              <Route path="/Work" element={<Work />} />
              <Route path="/Open/:docId" element={<Open />} />
              <Route path="/Show/:docId" element={<Show />} />
            </Routes>
        </BrowserRouter>
      </AuthProvider>
      

    </div>
  );
};

export default App;
