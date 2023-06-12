import { useState, useEffect, useRef } from 'react';
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
    // Create a ref for the container
    const containerRef = useRef(null);
    // Create a state variable for the left margin
    const [marginLeft, setMarginLeft] = useState(0);

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

    useEffect(() => {
        // Function to update the left margin
        const updateMargin = () => {
            if (containerRef.current) {
                const style = window.getComputedStyle(containerRef.current);
                setMarginLeft(parseFloat(style.marginLeft));
            }
        };
        // Update the left margin after fetching the data
        updateMargin();
        // Update the left margin when the window is resized
        window.addEventListener('resize', updateMargin);
        // Clean up the event listener when the component is unmounted
        return () => {
            window.removeEventListener('resize', updateMargin);
        };
    }, [data]);

    //Switch case for the 3 different possible html structures.
    //Loading, Error Fetching Data, and default.
    switch (data) {
        case (null):
            return <div>Whoops, there was a fatal error fetching the data.</div>;

        default:
            return (
                <div className={`${styles['projectMain']} `}>
                    <div ref={containerRef} className='container'>
                        <Fade direction='down' triggerOnce>
                            <h1 className={`${styles['grabMyLeftMargin']} ${styles['mainTitle']}`}>{data?.title || loadingString}</h1>
                        </Fade>
                    </div>
                    <div className={`${styles['setMyLeftMargin']} row`} style={{ marginLeft: `${marginLeft}px` }}>
                        <div className={`${styles['firstCol']} col-11 col-lg-6`}>
                            <Fade delay={500} triggerOnce>
                                <div>
                                    <p className={styles.myDescription}>{data?.description || loadingString}</p>
                                    <p className={styles.myDescription}>{data?.description2 || ''}</p>
                                </div>
                            </Fade>

                            <div className={styles.progsUsed}>
                                <Fade direction='down' triggerOnce>
                                    <h1 className={styles.mainTitle}>{data?.title2 || loadingString}</h1>
                                </Fade>
                                <Fade direction='left' triggerOnce>
                                    <img className={`${styles['myBtmLeftImg']} img-fluid`} src={data?.imageBLeft + data?.blobLinkAppend!} alt="Image Not Found" />
                                </Fade>
                            </div>
                        </div>
                        <div className={`${styles['mySecondCol']} col-12 col-lg-6 container`}>
                            <Fade direction='right' triggerOnce>
                                <img className={`${styles['myBtmRightImg']} img-fluid`} src={data?.imageMidRight + data?.blobLinkAppend!} alt="Image Not Found" />
                            </Fade>
                        </div>
                    </div>
                </div>
            );
    }
};