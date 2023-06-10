"use client"
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useApiService } from '../../../utils/ApiServiceContext';
import { Container } from '../../../utils/ApiDataInterface';
import { Fade } from 'react-awesome-reveal';

//Set pageId and containerId to pull the appropriate data.  Easy peazy.
const dataLocation: { pageId: number, containerId: number } = {
  pageId: 0,
  containerId: 3
};
//Set this to change the loading string for the elements within the component.
const loadingString: string = "Loading...";

export default function AboutMe() {
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
          <div id="about" className={styles.aboutMeMain}>
            <div className={`container`}>
              <Fade triggerOnce>
                <h2 className={styles['title-header-bottom']}>{data?.title || loadingString}</h2>
              </Fade>
              <Fade triggerOnce>
                <p className={styles['description-bottom']}>
                  {data?.description || loadingString}
                </p>
              </Fade>
              <Fade triggerOnce>
                <p className={styles['description-bottom']}>
                  {data?.description2 || loadingString}
                </p>
              </Fade>
            </div>
          </div>
        );
    }
  };