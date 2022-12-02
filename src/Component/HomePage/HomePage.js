import React, { useRef, useState, useEffect } from 'react'
import "./HomePage.css"
import { BiSearch } from "react-icons/bi"
import axios from 'axios';
import startfirebase from '../../firebaseConfig';
import { ref, onValue } from "firebase/database"
import toast, { Toaster } from 'react-hot-toast';
import QRCode from "react-qr-code";
import { ChromePicker } from "react-color";
import { CiPickerHalf } from "react-icons/ci";
import { DiJqueryLogo } from "react-icons/di";
import { AiOutlineClose } from "react-icons/ai";
import GetCookie from '../Cookies/GetCookies'
import HomePageSetCookies from '../Cookies/HomePageCookies/HomePageSetCookies';
import HomePageRemoveCookies from "../Cookies/HomePageCookies/HomePageRemoveCookies";
import HomePageGetCookies from '../Cookies/HomePageCookies/HomePageGetCookies';
function HomePage() {
    const inputRef = useRef();
    const inputImageRef = useRef()
    const [source, setSource] = useState();
    const [imageSource, setImageSource] = useState()
    const [radio, setRadio] = useState('false')
    const [radioOne, setRadioOne] = useState("false");
    const [TranslationURL, setTranslationURL] = useState("")
    const [qrscan, setqrscan] = useState(false)
    const [isColor, setIsColor] = useState("#fff")
    const [isColorOne, setIsColorOne] = useState("#000000")
    const [showColorPickerOne, setShowColorPickerOne] = useState(false)
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [file, setFile] = useState();
    const [getUerId, SetGetUserId] = useState()
    
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const handleMind = (e)=>{
     console.log(e.target.files);
    //  setImageSource(URL.createObjectURL(e.target.files[0]))
     let filess= e.target.files[0]
     setImageSource(filess)
    }
    console.log("imageSource", imageSource);
    const handleFileChange = (event) => {
        let file = event.target.files[0];
        // let file = URL.createObjectURL(event.target.files[0])
        // file = file.name
        // console.log("file", file);
        // const url = URL.createObjectURL(file);
        // console.log("url", url);
        // let file1 = file.name
        // setSource(url);
        // console.log("file1", file1);
        setSource(file);

    };
    // console.log("imageSource", source);
    const handleRadio = (e) => {
        setRadio(e.target.value)
    }
    const handleRadioOne = (e) => {
        setRadioOne(e.target.value)
    }
    const GenerateQRCode = async (e) => {
        try {
            await axios.post(`http://localhost:8000/data`, {
                radio,
                TranslationURL,
                radioOne,
                getUerId
            }).then(res => {
                console.log("ressetCheckBoxValue", res.data.data);
                HomePageRemoveCookies('HomePageData')
                HomePageSetCookies('HomePageData', JSON.stringify(res.data.data))
            })
                .catch((err) => {
                    console.log(err);
                });
            const data = new FormData()
            data.append("file", source);
            await axios.post("http://localhost:8000/upload", data).then((res) => {
                
            }).catch((e) => {
                console.log("e", e);
            })



            // const minddata = new FormData();
            //  minddata.append("mind", imageSource)

            //  await axios.post("http://localhost:8000/mindfile", minddata).then((res)=>{
            //     console.log("minddata", res);
            //  }).catch((e) => {
            //     console.log("e", e);
            // })

        } catch (e) {
            console.log("e", e);
        }
    }
    const imageRemove = () => {
        setFile();
    }

    return (
        <div className='container' style={{ maxHeight: '100vh' }} >
            {/* <form onSubmit={handlesubmit} method="post" action='/data'> */}
            <div className='row '>
                <div className='col-12 text-start'>
                    <h5 className='video-h5'>Your Video</h5>
                </div>
            </div>
            <div className='row ms-md-5'>

                <div className='col-lg-6 col-11 text-start' >
                    {/* <label for="formFile" className='YouTube-p text-start form-label'>YouTube URL</label>
                    <div className="input-group " style={{ border: '1px solid rgb(51, 51, 51)', background: "white", borderRadius: "5px" }}>
                        <span className="input-group-text " style={{ backgroundColor: 'white', border: '2px solid transparent' }}><BiSearch size={20} color="black" /></span>
                        <input type="text" className="form-control" placeholder="search" aria-label="Username" aria-describedby="basic-addon1" />
                    </div> */}
                    <div className="VideoInput mt-3">
                        <label className='YouTube-p text-start form-label'>Uplaod Video</label><br />
                        <input
                            ref={inputRef}
                            className="VideoInput_input form-control"
                            type="file"
                            onChange={handleFileChange}
                        // accept=".mov,.mp4"
                        // method="POST"
                        />
                        {/* {!source && <button onClick={handleChoose}>Choose</button>} */}
                        {/* {source && (
        <video
          className="VideoInput_video"
          width="20%"
          height={"20%"}
          controls
          src={source}
        />
      )} */}
                        {/* <div className="VideoInput_footer mt-2">{source || ""}</div> */}
                    </div>
                    {/* <button className='btn btn-upload mt-3'>Upload Video</button> */}
                </div>
            </div>

            <div className='row mt-4'>
                <div className='col-12 text-start'>
                    <h5 className='video-h5'>Your Maker</h5>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-2 col-11 ms-md-5 text-start'>
                    <button className='btn btn-upload mt-3' onClick={() => setqrscan(!qrscan)}>Create QR Code</button>
                    {/* <button className='btn btn-upload mt-3'>Upload Image</button> */}
                </div>
            </div>

            {
                qrscan ? (
                    <div className='row'>
                        <div class="col-lg-6">
                            <div class="tabs">
                                <div class="tab">
                                    <input type="checkbox" id="chck1" />
                                    <label class="tab-label text-start" htmlFor="chck1"><span><CiPickerHalf size={25} /> Colors </span></label>
                                    <div class="tab-content">
                                        <div className='row d-flex justify-content-center'>
                                            <div className='col-lg-6 text-start'>
                                                <h5>Background</h5>
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
                                                <h5>Foreground</h5>
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
                                    // size={256}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%", }}
                                    value="data"
                                    viewBox={`0 0 256 256`}
                                />
                                <img src={file} width="70px" className='mt-3' style={{ position: "absolute" }} />
                            </div>
                        </div>

                    </div>
                ) : (<>
                </>)
            }

            <div className='row'>
                <div className='col-12 mt-3'>
                <h5 className="YouTube-p text-start form-label ms-5 mt-3">Convert image to Mind File</h5>
                </div>
                <div className='col-md-2 col-11 ms-md-5 text-start mt-3'>
                    <button className='btn btn-upload ' ><a href='https://projects.sirattech.com/mind-ar-js-master/examples/image-tracking/compile.html' style={{ textDecoration: "none", color: "white" }}  target="_blank">Image Compiler</a></button>
                </div>
            </div>

            <div className='row mt-3 ms-md-5'>
                <div className="col-6 VideoInput mt-3 text-start">


                    <label className='YouTube-p text-start form-label'>Uplaod Mind File</label><br />
                    <input
                        ref={inputImageRef}
                        onChange={handleMind}
                        className="VideoInput_input form-control"
                        type="file"
                        accept="image/mind"
                    />
                </div>
            </div>
            <div className='row mt-4'>
                <div className='col-12 text-start'>
                    <h5 className='video-h5'>Video Postion (In Relation to Your Maker)</h5>
                </div>
                <div className='col-md-10  text-start ms-md-5 mt-3 uper-form'>
                    {/* <form > */}
                    <div class="form-check d-flex align-items-center mb-3">
                        <input className="form-check-input mt-2" type="radio" name="exampleRadios" id="exampleRadios1" value="Play Video on above of Maker" checked={radio === "Play Video on above of Maker"} onChange={handleRadio} />
                        <label className="form-check-label YouTube-p mt-2" htmlFor="exampleRadios1">
                            &nbsp;&nbsp;&nbsp;Play Video on above of Maker
                        </label>
                    </div>
                    <div className="form-check d-flex align-items-center mb-3">
                        <input className="form-check-input mt-2" type="radio" name="exampleRadios" id="exampleRadios2" value="Play Video on top of maker" checked={radio === "Play Video on top of maker"} onChange={handleRadio} />
                        <label className="form-check-label YouTube-p mt-2" htmlFor="exampleRadios2">
                            &nbsp;&nbsp;&nbsp;Play Video on top of maker
                        </label>
                    </div>
                    <div className="form-check d-flex align-items-center mb-2">
                        <input className="form-check-input mt-2" type="radio" name="exampleRadios" id="exampleRadios3" value="Float Video below my Maker" checked={radio === "Float Video below my Maker"} onChange={handleRadio} />
                        <label className="form-check-label YouTube-p mt-2" htmlFor="exampleRadios3">
                            &nbsp;&nbsp;&nbsp;Float Video below my Maker
                        </label>
                    </div>


                </div>
                <div className='col-lg-6 col-11 text-start  mt-3' >
                    <label htmlFor="formFile" className='YouTube-p text-start form-label'>Translation to WHat URL</label>
                    <div className="input-group ms-md-5 mt-4" >
                        <input type="text" className="form-control inputborder" id="inputborder" placeholder="URL" aria-label="Username" aria-describedby="basic-addon1" value={TranslationURL} onChange={(e) => setTranslationURL(e.target.value)} style={{ border: "2px solid red" }} />
                        {/* <span className="input-group-text "><BiSearch size={20} color="white" /></span> */}
                    </div>
                </div>
            </div>

            <div className='row mt-4'>
                <div className='col-12 text-start'>
                    <h5 className='video-h5'>How Long to Wait to Redirect to URL</h5>
                </div>
            </div>

            <div className='col-10 text-start ms-md-5 mt-3 down-form pb-3 uper-form' >
                {/* <form> */}
                <div class="form-check d-flex align-items-center mb-3">
                    <input className="form-check-input mt-2" type="radio" name="Second" id="Second" value="Second" checked={radioOne === "Second"} onChange={handleRadioOne} />
                    <label className="form-check-label YouTube-p mt-2" htmlFor="Second">
                        &nbsp;&nbsp; Second
                    </label>
                </div>
                <div className="form-check d-flex align-items-center mb-3">
                    <input className="form-check-input mt-2" type="radio" name="Second" id="Video" value="End of Video" checked={radioOne === "End of Video"} onChange={handleRadioOne} />
                    <label className="form-check-label YouTube-p mt-2" htmlFor="Video">
                        &nbsp;&nbsp; End of Video
                    </label>
                </div>


            </div>
            {/* <button type='submit'>data</button> */}
            <button
                // type='submit'
                onClick={GenerateQRCode}
            >Generate</button>
            {/* {qr && <>
				<img src={qr} />
 				<a href={qr} download="qrcode.png">Download</a>
			</>} */}
            {/* </form> */}


            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    )
}

export default HomePage