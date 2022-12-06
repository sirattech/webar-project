import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'mind-ar/dist/mindar-image.prod.js';
// import 'aframe';
// import 'mind-ar/dist/mindar-image-aframe.prod.js';
import './App.css';
import MindARViewer from './mindar-viewer';
import {
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import SideBar from "./Component/SideBar/SideBar"
import QrCode from './QrCode';
import Signup from './Component/Signup/Signup';
import Login from './Component/Login/Login';
import MyProject from "./Component/MyProject/MyProject"
import MyProfile from "./Component/my-profile/MyProfile"
import HomePage from "./Component/HomePage/HomePage";
import { useSelector } from "react-redux"
import axios from 'axios';
import { BACKEND_URI } from "./config/config"
import Hello from './Component/hello/Hello';
import PrivateComponent from './Component/PrivateComponent/PrivateComponent';
import MindarViewer from './mindar-viewer';
import InnerHtml from './Component/innerHtml/InnerHtml';
import Preview from './Component/Preview/Preview';

function App() {
  const [started, setStarted] = useState(false);
  // let { isAdmin } = useSelector(state => state.LOGIN_REDUCERS)
  // console.log("isAdmin", isAdmin);
  
  return (
    <div className="App">
      
      <Routes>
        <Route exact path="/" element={<Login setStarted={setStarted} />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route element={<PrivateComponent />}>
          
          <Route exact path='/sidebar' element={<SideBar />} >
            <Route path='Homepage' element={<HomePage />}>
            </Route>
              <Route path='preview' element={<div className="container121"><Preview/><video></video></div>}/>
            <Route path='myproject' element={<MyProject />} />
            <Route path="myprofile" element={<MyProfile />} />
          </Route>
            <Route path="/mindar" element={<div className="container121"><MindarViewer /><video></video></div>} />
            {/* <Route path="/demo" element={<InnerHtml/>}/> */}
        </Route>
      </Routes>
    

    </div>

  );
}

export default App;
