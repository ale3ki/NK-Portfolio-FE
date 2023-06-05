"use client"

import React from "react";
import Styles from './page.module.css'
import { useSearchParams } from 'next/navigation';

import LandingTop from '../../components/projects/Landing/component'
import ProjectSection from '../../components/projects/Project/component'
import ProcessSection from '../../components/projects/Process/component'
import ReasearchSection from '../../components/projects/Research/component'
import PersonaSection from '../../components/projects/Personas/component'
import FlowSection from '../../components/projects/Flow/component'
import CarouselSection from '../../components/main/Carousel/component'
import GuideSection from '../../components/projects/Guide/component'
import TestingSection from '../../components/projects/Testing/component'
import PrototypeSection from '../../components/projects/Prototype/component'
import AdMockUpSection from '../../components/projects/Advertisement/component'
import DemoVideoSection from '../../components/projects/Video/component'




export default function ProjectPage() {
  const searchParams = useSearchParams();
  const carouselID = searchParams.get('carouselId');
  const carouselNum: number = Number(carouselID);
  

  console.log(carouselID);


  return (
    <main>
      <LandingTop pageId={carouselNum}/>
      <ProjectSection pageId={carouselNum}/>
      <ProcessSection pageId={carouselNum}/>
      <ReasearchSection pageId={carouselNum}/>
      <PersonaSection pageId={carouselNum}/>
      <FlowSection pageId={carouselNum}/>
      <CarouselSection pageId={carouselNum} containerId={6}/>
      <GuideSection pageId={carouselNum}/>
      <TestingSection pageId={carouselNum}/>
      <PrototypeSection pageId={carouselNum}/>
      <AdMockUpSection pageId={carouselNum}/>
      <DemoVideoSection pageId={carouselNum}/>
    </main>
  )
}