import React from 'react'
import "./MyProject.css"
function MyProject() {
    return (
        <div className='container'>
            <div className='row d-flex justify-content-center'>
                <div className='col-12 d-flex justify-content-center flex-columnn mt-3'>
                    <h6 className='daily-p'>Daily Action Log Table for Effective Task Management</h6>

                </div>
                <div className="col-md-4 col-8 border-css" ></div>
                <span className='daily-span'>This side is 100% editable.Adopt it to your need and capture your Audience's Attention</span>
            </div>
            <div className='row d-flex justify-content-center'>
            <div className='col-lg-11 mt-4 table-responsive table-id' >
                
            <table class="table table-striped table-bordered"  >
                        <thead style={{backgroundColor: '#497DD3', color: 'white'}}> 
                            <tr>
                                <th className='text-start pt-3 pb-3'>Days</th>
                                <th className=' pt-3 pb-3'>Action 1</th>
                                <th className=' pt-3 pb-3'>Action 2</th>
                                <th className=' pt-3 pb-3'>Action 3</th>
                                <th className=' pt-3 pb-3'>Action 4</th>
                                <th className=' pt-3 pb-3'>Action 5</th>
                                <th className=' pt-3 pb-3'>Action 6</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row" className='table-th pt-3 pb-3'>Monday</th>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                            </tr>
                            <tr>
                                <th scope="row" className='table-th pt-3 pb-3'>Tuesday</th>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                            </tr>
                            <tr>
                                <th scope="row" className='table-th pt-3 pb-3'>Wednesday</th>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                            </tr>
                            <tr>
                                <th scope="row" className='table-th pt-3 pb-3'>Thursday</th>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                            </tr>
                            <tr>
                                <th scope="row" className='table-th pt-3 pb-3'>Friday</th>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                            </tr>
                            <tr>
                                <th scope="row" className='table-th pt-3 pb-3'>Saturday</th>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                            </tr>
                            <tr>
                                <th scope="row" className='table-th pt-3 pb-3'>sunday</th>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                                <td className='table-td pt-3 pb-3'>Add text here</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MyProject