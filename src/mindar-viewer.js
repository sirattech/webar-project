import React, { useEffect, useRef, useState } from 'react';
import "./mindar.css"
import { Link, Navigate, useNavigate } from 'react-router-dom';
// import HomePageSetCookies from './Component/Cookies/HomePageCookies/HomePageSetCookies';
// import mind from "./Assets/"
export default () => {
   
  let auth = localStorage.getItem("total data")
    let auths = JSON.parse(auth)
    console.log(auths.webardata.TranslationURL);
//   const [homePageDataInMind, setHomePageDataInMind] = useState()
let query= new URLSearchParams(window.location.search);
let link = query.get("link");
let mind = query.get("mind");
let TranslationURL = query.get("TranslationURL")
let radio = query.get("radio")
console.log(link);
console.log(mind);
console.log(radio);
console.log(TranslationURL);

// useEffect(()=>{
//  let minddata= HomePageSetCookies("HomePageData")
//  console.log("minddata", minddata);
// })
  const vidRef = useRef();
  const getPlay = () => {
    const video = vidRef.current;
    console.log("hdcijdhcijsdhics");
    const sceneEl = document.querySelector('a-scene');
    sceneEl.addEventListener("arReady", (event) => {
      console.log("MindAR is ready")
    });
    const exampleTarget = document.querySelector('#example-target');
    // console.log(exampleTarget);
    exampleTarget.addEventListener("targetFound", event => {
      console.log("target found");
      video.play()
      setTimeout(() => {
        window.location.href = TranslationURL;
      }, 5000)
    });
    console.log(exampleTarget);
    exampleTarget.addEventListener("targetLost", event => {
      console.log("target lost");
    });

  }
  useEffect(() => {
    getPlay()
  }, [])


  return (

    <>
      {/* <button onCli className="playcss">play</button> */}
      <a-scene mindar-image={`imageTargetSrc: ${mind}; maxTrack: 1; uiLoading:no; uiScanning:no;`}
        color-space="sRGB" renderer="colorManagement: false, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false"

      >
        <a-assets>
          <video src={link}
            ref={vidRef}

            preload="auto" id="vid" response-type="arraybuffer" loop
            crossOrigin="true"  autoPlay muted playsInline style={{ zIndex: '200000000' }}
          >
          </video>
          {/* <img id="card" src="images/river.png" /> */}
          {/* <div className='d-flex justify-content-between'>
            <img id="cardone" src='images/sirat tech.png' width={20} />
            <img id="cardtwo" src='images/google-plus.png' width={20}/>
          <img id="cardthree" src='images/linkedin.png' width={20}/>
          </div> */}
        </a-assets>
        <a-camera position="0 0 0" look-controls="enabled: false" ></a-camera>
        <a-entity mindar-image-target="targetIndex: 0" id="example-target">
          <a-video src="#vid" position={radio} height="0.5" width="0.5" rotation="0 0 0 " scale="1 1 1" className="video-a" id="vido"></a-video>
          {/* <a-image src="#card" position="0 -0.25 0" height="0.552" width="0.5" rotation="0 0 0"></a-image>
          <a-image src="#cardone" position="0 -0.650 0" height="0.252" width="0.2" rotation="0 0 0"></a-image> */}
          {/* <a-plane src="#cardtwo" position="0 -0.500 1.75" height="0.252" width="0.2" rotation="0 0 0"></a-plane>
        <a-plane src="#cardthree" position="0 -0.500 2.150" height="0.252" width="0.2" rotation="0 0 0"></a-plane> */}
        </a-entity>
        <a-entity mindar-image-target="targetIndex: 1" id="example-target">




{/*  top 0 0.95 0
0 0.28 0
below 0 -0.22 0
*/}
        </a-entity >
      </a-scene>
    </>
  )
}
