"use client"
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useApiService } from '../../../utils/ApiServiceContext';
import { Container } from '../../../utils/ApiDataInterface';
import { Fade } from "react-awesome-reveal";

//Set pageId and containerId to pull the appropriate data.  Easy peazy.
const dataLocation: { containerId: number } = {

    containerId: 1
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
                <div className={`${styles[`projectMain`]} `}>
                    <div className='d-flex container'>
                        <div className={`${styles[`fme`]} col-12 col-md-7`}>
                            <Fade direction="down" triggerOnce>
                                <h1>{data?.title || loadingString}</h1>
                            </Fade>
                            <Fade delay={500} triggerOnce>
                                <div>
                                    <p className={styles.firstDescription}>{data?.description || loadingString}</p>
                                    <p>{data?.description2 || ""}</p>
                                </div>
                            </Fade>
                            <Fade direction="down" triggerOnce>
                                <div className={styles.progsUsed}>
                                    <h1>{data?.title2 || loadingString}</h1>
                                </div>
                            </Fade>
                            <Fade direction="left" triggerOnce>
                                <img className={`${styles[`myBtmLeftImg`]} img-fluid`} src={data?.imageBLeft + data?.blobLinkAppend!} alt="Image Not Found" />
                            </Fade>
                        </div>
                        <div className={`${styles[`fme`]} col-12 col-md-5 container `}>
                            <h1></h1>
                        </div>
                    </div>
                    <Fade  triggerOnce>
                        <img className={`${styles[`myBtmRightImg`]} img-fluid`} src={data?.imageMidRight + data?.blobLinkAppend!} alt="Image Not Found" />
                    </Fade>
                </div>
            );
    }
};













