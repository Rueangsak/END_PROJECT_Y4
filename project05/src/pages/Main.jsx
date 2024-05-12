import "../CSS/App.css";

import { Navigation } from "../c-main/navigation";
import { Header } from "../c-main/header";
import { Features } from "../c-main/features";
import { About } from "../c-main/about";
import { Contact } from "../c-main/contact";


import JsonData from "../c-main/data/data.json";
import SmoothScroll from "smooth-scroll";
import { useState, useEffect,useContext } from "react";
import { AuthContext } from "../login/Auth";
import { Navigate } from "react-router-dom";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});


const Main = () => {
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
      <Navigation />
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Contact data={landingPageData.Contact} />
      
    </div>
  );
};

export default Main;
