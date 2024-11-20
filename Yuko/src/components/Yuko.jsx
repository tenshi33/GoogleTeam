import React from 'react'
import './Main.css'
import { FaDivide } from 'react-icons/fa'

const Main = () => {
  return (
    <div className='main'>
        <div className='nav'>
            <p><b>YUKO</b></p>
        </div>
            <div className="main-container">
                <div className='greet'>
                    <p><b><span>Hello, User.</span></b></p>
                    <p><b>How may I help?</b></p>
                </div>
                    <div className='cards'>
                        <div className='card'>
                            <p><b>Prompt 1</b></p>
                        </div>
                        <div className='card'>
                            <p><b>Prompt 2</b></p>
                        </div>
                        <div className='card'>
                            <p><b>Prompt 3</b></p>
                        </div>
                    </div>
                    <div>
                        <div className='main-bottom'>
                            <div className='search-box'>
                                <input type="text" placeholder='Talk to Yuko'/>
                            </div>
                        </div>
                    </div>
            </div>
    </div>
  )
}

export default Main