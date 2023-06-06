'use client'
import React from "react";
import MyCarousel from '../../../components/main/Carousel/component'
import LandingTop from '../../../components/projects/Landing/component'

const pageId: number = 10;

export default function ProjectPage() {

  return (
    <main>
      <LandingTop pageId={pageId} backgroundColor={"#e4e4e4"}/>
      <MyCarousel pageId={pageId} containerId={1} loadingString={""}/>
    </main>
  )
}