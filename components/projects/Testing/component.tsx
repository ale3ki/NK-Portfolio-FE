"use client"
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useApiService } from '../../../utils/ApiServiceContext';
import { Container } from '../../../utils/ApiDataInterface';
import { Fade, Slide } from 'react-awesome-reveal';

//Set pageId and containerId to pull the appropriate data.  Easy peazy.
const dataLocation: { containerId: number } = {
    containerId: 8
};
//Set this to change the loading string for the elements within the component.
const loadingString: string = "Loading...";

export default function Iterations(props: { pageId: number }) {
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
                <div className={` ${styles[`iterationsMain`]} container`}>
                    <Fade direction="down" triggerOnce>
                        <h1 className={styles.mainTitle}>{data?.title || loadingString}</h1>
                    </Fade>
                    <div className={`${styles[`myCol`]} col-12 col-lg-8`}>
                        <Fade triggerOnce>
                            <p>{data?.description || loadingString}</p>
                        </Fade>
                    </div>
                    <Slide triggerOnce>
                        <img className='img-fluid mx-auto d-block' src={data?.image ? (data.image + data.blobLinkAppend!) : ""} alt="Image Not Found"/>
                    </Slide>
                </div>
            );
    }
};
