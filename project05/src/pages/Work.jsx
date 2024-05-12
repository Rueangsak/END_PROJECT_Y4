import Presentation from '../c-createfile/presentation'
import Navbar1 from '../c-createfile/navbar1'
import '../CSS/work.css'
import { useState, useEffect,useContext } from "react";
import { AuthContext } from "../login/Auth";
import JsonData from "../c-main/data/data.json";
import { Navigate } from "react-router-dom";





const Work = () => {
  const { currentUser } = useContext(AuthContext);

  const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
 
  return (
    <div> 
      <Navbar1 rootClassName="navbar1-root-class-name"></Navbar1>
      <Presentation></Presentation>
    </div>
  );


};





export default Work;
