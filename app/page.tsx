import React from "react";
import TopSection from '../components/main/Top/component'
import AboutMeSection from '../components/main/AboutMe/component'
import TextScroll from '../components/main/TextScroll/component'
import MyCarousel from '../components/main/Carousel/component'
import ModelViewer from '../components/3DComponents/ModelViewer/component'
import Styles from './page.module.css'
import { LinkOptions } from '../utils/types/interface';
import { useApiService } from '../utils/ApiServiceContext';
import { Container, PageData } from '../utils/ApiDataInterface';

const scrollText = "XR DESIGN ✦ UI/UX DESIGN ✦ PRODUCT DESIGN ✦ 3D DESIGN ✦";
const topScrollColor: string = 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 100%)';
const textScrollData = [
  //Data for first and second textscroll.
  {
    bgColor: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 100%)',
    textColor: 'white'
  },
  { bgColor: 'white', textColor: 'black' }
];
//Setup the links here if the carousel needs them. 
let myLinkOptions: LinkOptions = {
  makeLinks: true,
  pathNames: [
    "/projects",
    "/projects",
    "/projects",
    "/projects",
    "/projects",
    "/projects",
    "/projects/jukebox",
    "/projects/ntnp",
    "/projects/ironGiant",
    "/projects/exhibit",
    "/projects/villa",
    "/projects/receiver"]
}

export default async function Page() {

  return (
    <main className={Styles[`navMargin`]}>
          <TopSection />
          <TextScroll scrollText={scrollText} bgColor={textScrollData[0].bgColor} textColor={textScrollData[0].textColor} paddingTop={20} paddingBottom={20} />
          <MyCarousel pageId={0} containerId={2} linkOptions={myLinkOptions} loadingString={"Loading..."} />
          <AboutMeSection />
          <TextScroll scrollText={scrollText} bgColor={textScrollData[1].bgColor} textColor={textScrollData[1].textColor} paddingTop={0} paddingBottom={0} />
    </main>
  );
}