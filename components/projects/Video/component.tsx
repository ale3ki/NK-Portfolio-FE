"use client"
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useApiService } from '../../../utils/ApiServiceContext';
import { Container } from '../../../utils/ApiDataInterface';
import { Fade } from 'react-awesome-reveal';

//Set pageId and containerId to pull the appropriate data.

//Set this to change the loading string for the elements within the component.
const loadingString: string = "Loading...";

export default function DemoVideo(props: { pageId: number , containerId: number}) {
    const [data, setData] = useState<Container | null | undefined>(undefined);
    const apiService = useApiService();
    const { pageId, containerId } = props;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await apiService.getContainerDataByPageID(pageId, containerId);
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
                <div className={` ${styles[`demoVideoMain`]} container`}>
                    <Fade direction="down" triggerOnce>
                        <h1 className={styles.mainTitle}>Demo Video</h1>
                    </Fade>
                    <video  className={` ${styles[`videoMain`]} img-fluid mx-auto d-block`} src={data?.video! + data?.blobLinkAppend! || loadingString}/>
                </div>
            );
    }
};
