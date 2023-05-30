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

  switch (data) {
    case (undefined):
      return <div>Loading...</div>;

    case (null):
      return <div>Whoops, there was a fatal error fetching the data.</div>;

    default:

    console.log(`${data.resume}${data.blobLinkAppend}`);
    console.log(`${data.blobLinkAppend}`)
      return (
        <div className={`container`}>
          <div className={`${styles[`adjustable-aboutme-sub-container`]}`}>
            <div className={`${styles[`aboutme-text-wrapper2`]}`} id='aboutme-text-wrapper'>
              <div id="line-top">
                <h1 className={`${styles[`title-header-bottom2`]} ${styles[`line-top`]}`}>{data.title} <br /> View my <a href={`${data.resume}${data.blobLinkAppend}`} download className={styles.resumeLink}>resume</a></h1>
              </div>
              <div id="line-bottom">
                <p className={`${styles[`description-bottom2`]} ${styles[`line-bottom`]}`}>
                  Email: {data.email}
                </p>
                <p className={styles[`copywrite-bottom`]}>
                  {data.copyright}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
  }
};;