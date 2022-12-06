import React,{useEffect, useState} from 'react'
import { CiPickerHalf } from "react-icons/ci";
import { ChromePicker } from "react-color";
import { DiJqueryLogo } from "react-icons/di";
import { AiOutlineClose } from "react-icons/ai";
import QRCode from "qrcode.react";
function Preview() {
  const [showColorPickerOne, setShowColorPickerOne] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [isColor, setIsColor] = useState("#fff")
    const [isColorOne, setIsColorOne] = useState("#000000")
    const [file, setFile] = useState();
    function handleChange(e) {
      setFile(URL.createObjectURL(e.target.files[0]));
  }
  const downloadQR = () => {
    const qrCodeURL = document.getElementById('qrCodeEl')
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    console.log(qrCodeURL)
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = "QR_Code.png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
};
const imageRemove = () => {
  setFile();
}
let [dataGet, setDataGet] = useState([])
let [videoLink, setVideoLink] = useState()
let [mindLink,setMindLink] =useState()
// let [fileToUpload, setFileToUpload] = useState()
// let [radios,setRadios] = useState()
// let [radiosOne,setRadiosOne] = useState();
// let 
// var videoLink;
// var mindLink;
useEffect(()=>{
  let auth = localStorage.getItem("total data")
    let auths = JSON.parse(auth)
    setDataGet(auths)
    console.log(dataGet);
    setVideoLink(`http://localhost:8000/uploads/${auths?.filetoupload}`)
    setMindLink(`http://localhost:8000/mind/${auths?.dataget}`)
    // videoLink = 
    // mindLink = 
   
},[])
console.log(videoLink);
console.log(mindLink);

  return (
    <div className='container'>
      <div className='row  d-flex justify-content-center align-items-center'  style={{height: "80vh"}}>
        <div class="col-lg-5">
          <div class="tabs">
            <div class="tab">
              <input type="checkbox" id="chck1" />
              <label class="tab-label text-start" htmlFor="chck1"><span><CiPickerHalf size={25} /> Colors </span></label>
              <div class="tab-content">
                <div className='row d-flex justify-content-center'>
                  <div className='col-lg-6 text-start'>
                    <h5>Foreground</h5>
                    <div className='d-flex justify-content-center'>
                      <div className='col-md-12 '>
                        <button className='btn btn-clor' onClick={() => setShowColorPicker(showColorPicker => !showColorPicker)}>{isColor}</button>
                        {showColorPicker && (
                          <div className='' style={{ zIndex: '20000' }}>
                            <ChromePicker color={isColor} onChange={updatedColor => setIsColor(updatedColor.hex)} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-6 text-start'>
                    <h5>background</h5>
                    <div className='d-flex justify-content-center'>
                      <div className='col-md-12 '>
                        <button className='btn btn-clor' onClick={() => setShowColorPickerOne(showColorPickerOne => !showColorPickerOne)}>{isColorOne}</button>

                        {showColorPickerOne && (
                          <div className=''>
                            <ChromePicker color={isColorOne} onChange={updatedColors => setIsColorOne(updatedColors.hex)} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab">
              <input type="checkbox" id="chck2" />
              <label class="tab-label" htmlFor="chck2"><span><DiJqueryLogo size={25} /> Logo</span></label>
              <div class="tab-content">
                <div className='row'>
                  <div className='col-10 text-start'>
                    <label className='text-start'>Uplaod Logo</label><br />
                    <input type="file" onChange={handleChange} class="form-control" />
                    <div className='mt-2 d-flex'>
                      <div className='boxes' onClick={imageRemove}>
                        <AiOutlineClose />
                      </div>
                      <img src={file} width="80px" className='' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/**/}
        <div className='col-lg-5'>
          <div style={{ height: "auto", margin: "0 auto", maxWidth: 224, width: "100%", position: "relative", backgroundColor: "green" }} className="d-flex justify-content-center align-items-center">
            <QRCode
              bgColor={isColor}
              fgColor={isColorOne}
              size={356}
              // style={{ height: "auto", maxWidth: "100%", width: "100%", }}
              id="qrCodeEl"
              value={`http://localhost:3000/mindar?mind=${mindLink}&link=${videoLink}&radio=${dataGet?.webardata?.radio}&TranslationURL=${dataGet?.webardata?.TranslationURL}`}
              // viewBox={`0 0 256 256`}
              level={"H"}
              includeMargin={true}
            />
            <img src={file} width="40px" className='mt-3' style={{ position: "absolute" }} />
          </div>
          <button className="btn btn-primary mt-3" onClick={downloadQR}> Download QR </button>
        </div>

      </div>

    </div>
  )
}

export default Preview