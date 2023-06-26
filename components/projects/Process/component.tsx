"use client"
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useApiService } from '../../../utils/ApiServiceContext';
import { Container } from '../../../utils/ApiDataInterface';
import { Fade } from "react-awesome-reveal";

//Set pageId and containerId to pull the appropriate data.  Easy peazy.
const dataLocation: { containerId: number } = {

    containerId: 2
};
//Set this to change the loading string for the elements within the component.
const loadingString: string = "Loading...";

export default function Project(props: { pageId: number }) {
    const [data, setData] = useState<Container | null | undefined>(undefined);
    const apiService = useApiService();
    const { pageId } = props;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await apiService.getContainerDataByPageID(pageId, dataLocation.containerId);
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
        
        <div className={`${styles[`mainProcess`]} container`}>
          <Fade direction="down" triggerOnce>
            <h1>{data?.title || loadingString}</h1>
            </Fade>
            <Fade direction="left" triggerOnce>
            <img className='img-fluid' src={data?.image ? (data.image + data.blobLinkAppend!) : ""} alt="Could Not Find Image"/>
            </Fade>
        </div>
      );
  }
};