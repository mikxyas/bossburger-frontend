import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Image } from 'cloudinary-react';


export default class HomePageCarousel  extends React.Component{
    render(){
    return (
    <Carousel showThumbs={false} autoPlay>
        <div style={{background:'white'}}>
            <Image cloudName='mikiyas' className='c-img' height='500' publicId='c-item8_wzaixq' secure="true"/>

            {/* <img className='c-img' alt="" src="./c-item1.jpg" /> */}
            {/* <p className="legend">Legend 1</p> */}
        </div>
        <div style={{background:'white'}}>
            <Image cloudName='mikiyas' className='c-img' height='500'  publicId='c-item-3_i2lzp6' secure="true"/>

            {/* <img className='c-img' alt="" src="./c-item2.jpg" /> */}
            {/* <p className="legend">Legend 2</p> */}
        </div>
        <div style={{background:'white'}}>
        <Image cloudName='mikiyas' className='c-img' height='500'  publicId='c-item5_jsif5a' secure="true"/>
            
            {/* <img className='c-img' alt="" src="./c-item-3.jpg" /> */}
            {/* <p className="legend">Legend 2</p> */}
        </div>
        <div style={{background:'white'}}>
        <Image cloudName='mikiyas' className='c-img' height='500'  publicId='c-item6_os98ji' secure="true"/>

            {/* <img  className='c-img' alt="" src="./c-item4.jpg" /> */}
            {/* <p className="legend">Legend 2</p> */}
        </div>
        <div style={{background:'white'}}>
        <Image cloudName='mikiyas' className='c-img' height='500'  publicId='c-item2_qewdgb' secure="true"/>

            {/* <img className='c-img' alt="" src="./c-item5.jpg" /> */}
            {/* <p className="legend">Legend 2</p> */}
        </div>
        <div style={{background:'white'}}>
        <Image cloudName='mikiyas' className='c-img' height='500'  publicId='c-item4_cwprfp' secure="true"/>

            {/* <img className='c-img' alt="" src="./c-item6.jpg" /> */}
            {/* <p className="legend">Legend 2</p> */}
        </div>
        <div style={{background:'white'}}>
        <Image cloudName='mikiyas' className='c-img' height='500'  publicId='c-item1_jjemug' secure="true"/>

            {/* <img className='c-img' alt="" src="./c-item7.jpg" /> */}
            {/* <p className="legend">Legend 2</p> */}
        </div>
        <div style={{background:'white'}}>
        <Image cloudName='mikiyas' className='c-img' height='500'  publicId='c-item7_oj36b9' secure="true"/>

            {/* <img className='c-img' alt=""  src="./c-item8.jpg" /> */}
            {/* <p className="legend">Legend 2</p> */}
        </div>
        {/* <div>
            <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-3.jpg" />
            <p className="legend">Legend 3</p>
        </div>
        <div>
            <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-4.jpg" />
            <p className="legend">Legend 4</p>
        </div>
        <div>
            <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-5.jpg" />
            <p className="legend">Legend 5</p>
        </div>
        <div>
            <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-6.jpg" />
            <p className="legend">Legend 6</p>
        </div>
        <div>
            <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-7.jpg" />
            <p className="legend">Legend 7</p>
        </div>
        <div>
            <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-8.jpg" />
            <p className="legend">Legend 8</p>
        </div>
        <div>
            <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-9.jpg" />
            <p className="legend">Legend 9</p>
        </div>
        <div>
            <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-10.jpg" />
            <p className="legend">Legend 10</p>
        </div>
        <div>
            <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-11.jpg" />
            <p className="legend">Legend 11</p>
        </div>
        <div>
            <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-12.jpg" />
            <p className="legend">Legend 12</p>
        </div>
        <div>
            <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-13.jpg" />
            <p className="legend">Legend 13</p>
        </div>
        <div>
            <img alt="" src="http://lorempixel.com/output/cats-q-c-640-480-14.jpg" />
            <p className="legend">Legend 14</p>
        </div> */}
    </Carousel>
);
    }}