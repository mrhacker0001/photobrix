import React from 'react'
import iphone from "../icons/iphone.svg"
import "./Footer.css"
import store from "../icons/appstore.svg"
import market from "../icons/google.svg"

function Footer() {
    return (
        <div className='Footer'>
            <div className="footer-card">
                <div className="first-cart">
                    <h1>Приложение для генерации <br /> мозаики из фото</h1>
                    <p>Соберите свою картину или одну из имеющихся в приложении</p>
                    <div className="imgs-cart">
                        <button> <img src={store} alt="" /></button>
                        <button><img src={market} alt="" /></button>

                    </div>
                </div>
                <img src={iphone} alt="..." />
            </div>
        </div>
    )
}

export default Footer