"use client"
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useApiService } from '../../../utils/ApiServiceContext';
import { Container } from '../../../utils/ApiDataInterface';

//Set pageId and containerId to pull the appropriate data.  Easy peazy.
const dataLocation: { containerId: number } = {

    containerId: 0
};
//Set this to change the loading string for the elements within the component.
const loadingString: string = "Loading...";

export default function Landing(props: { pageId: number, backgroundColor: string }) {
    const [data, setData] = useState<Container | null | undefined>(undefined);
    const apiService = useApiService();
    const { pageId, backgroundColor } = props;
    const firstSix: boolean = (pageId < 6);

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
                <div className={`${styles[`landingMain`]}`} style={{
                    backgroundColor: backgroundColor
                }}>
                    <div className={styles.holder}>
                        <div className={`container`}>
                            <h1 className={`${styles[`header`]} text-center`}> {data?.title || loadingString}</h1>
                            <p className='text-center'>{data?.description || loadingString}</p>
                            {firstSix &&
                                <img className={`${styles.landingImg} img-fluid d-block mx-auto`} src={data?.image + data?.blobLinkAppend! || loadingString} alt="Image Not Found" />
                            }
                        </div>
                        {!firstSix &&
                            <img className={`${styles.landingImg} img-fluid d-block mx-auto`} src={data?.image + data?.blobLinkAppend! || loadingString} alt="Image Not Found" />
                        }

                    </div>
                </div>
            );
    }
};
