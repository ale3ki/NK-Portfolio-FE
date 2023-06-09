'use client'
import React from "react";
import MyCarousel from '../../../components/main/Carousel/component'
import LandingTop from '../../../components/projects/Landing/component'
import VideoSection from '../../../components/projects/Video/component'

const pageId: number = 8;

export default function ProjectPage() {

  return (
    <main>
      <LandingTop pageId={pageId} backgroundColor={"#e4e4e4"}/>
      <MyCarousel pageId={pageId} containerId={1} loadingString={""}/>
      <VideoSection pageId={pageId} containerId={2}/>
    </main>
  )
}