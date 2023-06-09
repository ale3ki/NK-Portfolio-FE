"use client"
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useApiService } from '../../../utils/ApiServiceContext';
import { Container } from '../../../utils/ApiDataInterface';


//Set pageId and containerId to pull the appropriate data.  Easy peazy.
//In the html structure, just call {data.anything} 
const dataLocation: { pageId: number, containerId: number } = {
    pageId: 0, //Set me
    containerId: 0 //Set me
};
//Set this to change the loading string for the elements within the component.
const loadingString: string = "Loading...";

export default function Top() {
    const [data, setData] = useState<Container | null | undefined>(undefined);
    const apiService = useApiService();
    const [visibleIndex, setVisibleIndex] = useState(0);
    const hues = ['blue', 'red', 'purple']; //change me for button hue
    const timeChange: number = 3000; // 5 seconds

    useEffect(() => {
        const fetchData = async () => {
            try {
                //if this data is cached, it will use the cached data instead.  Everything is automated (hopefully).
                const result = await apiService.getContainerDataByPageID(dataLocation.pageId, dataLocation.containerId);
                setData(result);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [apiService]);

    useEffect(() => {
        const timer = setInterval(() => {
            setVisibleIndex((visibleIndex + 1) % 3);  // Cycle through 0, 1, 2
        }, timeChange);

        return () => {
            clearInterval(timer);
        };
    }, [visibleIndex]);

    switch (data) {
        case (null):
            return <div>Whoops, there was a fatal error fetching the data.</div>;
        default:
            return (
                <div className={`container`}>
                    <div className={`${styles[`centeredContainer`]}`}>
                        <h1 className={styles[`title-header-top`]}>{data?.title || loadingString}</h1>
                        <div className={`${styles.wordBox} d-flex}`}>
                            <div className={styles.wordContainer}>
                                <h1 className={styles.testing} style={{ opacity: !data || visibleIndex === 0 ? 0 : 1 }}>CREATE.&nbsp;</h1>
                                <h1 className={styles.testing} style={{ opacity: !data || visibleIndex === 1 ? 0 : 1 }}>DESIGN.&nbsp;</h1>
                                <h1 className={styles.testing} style={{ opacity: !data || visibleIndex === 2 ? 0 : 1 }}>PROTOTYPE.</h1>
                            </div>
                        </div>
                        <p className={styles[`description`]}>{data?.description || loadingString}</p>
                        <ButtonBlock visibleIndex={visibleIndex} hues={hues} />
                        <p className={styles[`subDescription`]}>{data?.description2 || loadingString}</p>
                        <img src="/mainProgramsUsed.svg" alt="Your Image" className={`${styles['logo-image']} img-fluid`} />
                    </div>
                </div>
            );
    }
};

//Just some messy code below that will get cleaned up. 
function ButtonBlock(props: { visibleIndex: number, hues: string[] }) {
    const { visibleIndex, hues } = props;
    const [isHovered, setIsHovered] = useState(false);
    const textShadowColor = isHovered ? hues[visibleIndex] : 'transparent'; //If hovered, apply current hue, else make transparent

    return (
        <div className={`${styles[`buttonBlock`]} d-flex justify-content-center`}>
            <button className={`${styles[`resumeButton`]} text-center`}>
                Resume ↓
            </button>
            <button
                className={`${styles[`projectsButton`]} text-center`}
                style={{
                    
                    boxShadow: `0 0 75px ${hues[visibleIndex]}, 0 0 5px ${hues[visibleIndex]}`,
                    textShadow: isHovered ? `0 0 10px ${textShadowColor}, 0 0 20px ${textShadowColor}, 0 0 30px ${textShadowColor}` : 'none', //If hovered, apply glowing text shadow
                    color: isHovered ? 'white' : 'black'

                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                Projects
            </button>
        </div>
    );
}

