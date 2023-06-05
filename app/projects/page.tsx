"use client"

import React from "react";
import Styles from './page.module.css'
import { useSearchParams } from 'next/navigation';

import LandingTop from '../../components/projects/Landing/component'
import ProjectSection from '../../components/projects/Project/component'




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
    </main>
  )
}