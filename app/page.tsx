import React from "react";
import TopSection from '../components/main/Top/component'
import AboutMeSection from '../components/main/AboutMe/component'
import TextScroll from '../components/main/TextScroll/component'

import Styles from './page.module.css'

export default function Page() {
  return(
    <main className={Styles[`navMargin`]}>
      <TopSection/>
      <TextScroll pageId={0} containerId={1}/>
      <AboutMeSection/>
      <TextScroll pageId={0} containerId={4}/>
    </main>
  );
}