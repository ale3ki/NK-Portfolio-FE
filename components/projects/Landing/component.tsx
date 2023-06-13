"use client"
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useApiService } from '../../../utils/ApiServiceContext';
import { Container } from '../../../utils/ApiDataInterface';
import Lottie from 'lottie-react';
import animationData from '../../../public/lottieFiles/LoadingBounce.json'

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
    const [showLottie, setShowLottie] = useState(true);
    const [showBackground, setShowBackground] = useState(true);
    const [animationClass, setAnimationClass] = useState('start-position');
    const [dataLoaded, setDataLoaded] = useState(false);
    const [initialAnimationDone, setInitialAnimationDone] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await apiService.getContainerDataByPageID(pageId, dataLocation.containerId);
                setData(result);
                setDataLoaded(true);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [apiService]);

    useEffect(() => {
        if (!initialAnimationDone) {
            setAnimationClass('slide-down');
            setTimeout(() => {
                setInitialAnimationDone(true);
                setShowBackground(false); 
            }, 1500); 
        } else if (dataLoaded) {
            setAnimationClass('slide-up');
            setTimeout(() => {
                setShowLottie(false);
            }, 1500); 
        }
    }, [dataLoaded, initialAnimationDone]);

    switch (data) {
        case (null):
            return <div>Whoops, there was a fatal error fetching the data.</div>;
        default:
            return (
                <div className={`${styles[`landingMain`]}`} style={{ backgroundColor: backgroundColor }}>
                    {showBackground && <div className={`${styles.backgroundCover}`}></div>}
                    {showLottie && (
                        <div className={`${styles[animationClass]} ${styles.lottieContainer}`}>
                            <Lottie animationData={animationData} style={{ height: '100%', width: '100%' }} />
                        </div>
                    )}
                    <div className={`${styles[`mainContent`]} container`}>
                        <h1 className={`${styles[`header`]} text-center`}> {data?.title}</h1>
                        <p className='text-center'>{data?.description}</p>
                        {firstSix &&
                            <img className={`${styles.landingImg} img-fluid d-block mx-auto`} src={data?.image + data?.blobLinkAppend!} alt={""} onLoad={() => setDataLoaded(true)} />
                        }
                    </div>
                    {!firstSix &&
                        <img className={`${styles.landingImg} img-fluid d-block mx-auto`} src={data?.image + data?.blobLinkAppend!} alt="" onLoad={() => setDataLoaded(true)} />
                    }
                </div>
            );
    }
};
