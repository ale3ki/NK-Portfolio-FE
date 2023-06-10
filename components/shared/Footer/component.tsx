"use client"
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useApiService } from '../../../utils/ApiServiceContext';
import { Container } from '../../../utils/ApiDataInterface';


//Set pageId and containerId to pull the appropriate data.  Easy peazy.
const dataLocation: { pageId: number, containerId: number } = {
  pageId: 0,    
  containerId: 5
};
//Set this to change the loading string for the elements within the component.
const loadingString: string = "Loading...";

export default function Footer() {
  const [data, setData] = useState<Container | null | undefined>(undefined); 
  const apiService = useApiService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiService.getContainerDataByPageID(dataLocation.pageId, dataLocation.containerId); 
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [apiService]);

  //Switch case for the 3 different possible html structures.
  //Loading, Error Fetching Data, and default.
  switch (data) {
    case (null):
      return <div>Whoops, there was a fatal error fetching the data.</div>;
    
    default:
      return (
        <div id="footer" className={styles.footerMain}>
          <div className={`${styles[`adjustable-aboutme-sub-container`]} container`}>
            <div className={`${styles[`aboutme-text-wrapper2`]}`} id='aboutme-text-wrapper'>
              <div id="line-top">
                <h1 className={`${styles[`title-header-bottom2`]} ${styles[`line-top`]}`}>{data?.title || loadingString} <br /> View my <a href={`${data?.resume}${data?.blobLinkAppend}`} target="_blank" rel="noopener noreferrer" download className={styles.resumeLink}>resume</a></h1>
              </div>
              <div id="line-bottom">
                <p className={`${styles[`email`]} ${styles[`line-bottom`]}`}>
                  Email: {data?.email || loadingString}
                </p>
                <p className={styles[`copywrite-bottom`]}>
                  {data?.copyright || loadingString}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
  }
};