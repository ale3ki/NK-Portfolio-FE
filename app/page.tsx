import React from "react";
import TopSection from '../components/main/Top/component'
import AboutMeSection from '../components/main/AboutMe/component'
import TextScroll from '../components/main/TextScroll/component'
import AnimatedText from '../components/main/ChangingColorText/component'
import Styles from './page.module.css'

export default function Page() {
  return(
    <main className={Styles[`navMargin`]}>
      <TopSection/>
      <AnimatedText/>
      <TextScroll/>
      <AboutMeSection/>
    </main>
  );
}