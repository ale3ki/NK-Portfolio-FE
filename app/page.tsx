import React from "react";
import TopSection from '../components/main/Top/component'
import AboutMeSection from '../components/main/AboutMe/component'
import TextScroll from '../components/main/TextScroll/component'
import MyCarousel from '../components/main/Carousel/component'
import Styles from './page.module.css'


const topScrollColor: string = 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 100%)';
const textScrollData = [
  //Data for first and second textscroll.
  { bgColor: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 100%)', 
  textColor: 'white' },
  { bgColor: 'white', textColor: 'black' }
];

export default function Page() {
  return(
    <main className={Styles[`navMargin`]}>
      <TopSection/>
      <TextScroll pageId={0} containerId={1} bgColor={textScrollData[0].bgColor} textColor={textScrollData[0].textColor}/>
      <MyCarousel/>
      <AboutMeSection/>
      <TextScroll pageId={0} containerId={4} bgColor={textScrollData[1].bgColor} textColor={textScrollData[1].textColor}/>
    </main>
  );
}