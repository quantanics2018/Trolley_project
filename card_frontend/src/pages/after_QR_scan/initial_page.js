import React, {useContext, useEffect } from 'react'
import '../after_QR_scan/initial_page.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import scanning from '../../image/ScanningProduct.jpg'
import billing from '../../image/billing.jpg'
import {ReactComponent as SVG} from '../../image/leaves-svgrepo-com.svg'
import { TrolleyContext } from "../../TrolleyContext";
import {useNavigate} from 'react-router-dom'


const InitialPage = () =>{

    const navigate = useNavigate()
    const {updatedData} = useContext(TrolleyContext)

    useEffect(() => {
        if(updatedData.length > 0) {
            navigate('/cart')
        }
    },[updatedData])

    const SlideComponent = ({description,link,flag}) => {
        return (
            <div className='child-container'>
                <div className='content_container'>
                    {description}
                </div>
                {flag == true && <SVG className='svg-image'/>}
                <div className='button_container'>
                    <div className='buttonShape'>Start Scan</div>
                </div>
                <div className='image_container'>
                    <img alt='cart image' src={link}/>
                </div>
            </div>
        );
      };

    const settings = {
        dots : false,
        infinite : false,
        speed: 500,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed : 3000,
        arrows:false,
        slidesToShow:1,
        afterChange : (current) =>{
            if(current === 1) {
                setTimeout(()=>{
                    const slickList = document.querySelector('.slick-list')
                    if(slickList){
                        slickList.style.pointerEvents = 'none'
                    }
                },0)
            }
        }
    }

    return (
        <div className='mainlayout_for_initailpage'>
            <div className='overlay'></div>
            <div className='container'>
                <Slider {...settings} className='slider-container'>
                   <SlideComponent description='Streamline your experience, avoid the queue.' link={billing} flag={true}/>
                   <SlideComponent description='Seamless payments, anytime, anywhere.' link = {scanning}/>
                </Slider>
            </div>
        </div>
    )
}
export default InitialPage;