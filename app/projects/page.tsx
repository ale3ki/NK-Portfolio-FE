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




export default function ProjectPage() {
  const searchParams = useSearchParams();
  const carouselID = searchParams.get('carouselId');
  const carouselNum: number = Number(carouselID);
  

  console.log(carouselID);

  // Now you can use carouselID in your component.






  return (
    <main>
      <LandingTop pageId={carouselNum}/>
      <ProjectSection pageId={carouselNum}/>
      <ProcessSection pageId={carouselNum}/>
      <ReasearchSection pageId={carouselNum}/>
      <PersonaSection pageId={carouselNum}/>
      <FlowSection pageId={carouselNum}/>
    </main>
  )
}