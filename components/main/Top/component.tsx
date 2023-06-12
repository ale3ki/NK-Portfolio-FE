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
//TO DO: Move this out of here
interface SEOData {
    title: string;
    desc: string;
    desc2: string;
}

//<h1 className={styles[`title-header-top`]}>{seoData.title}</h1>

const seoData: SEOData = {
    title: "CREATE. DESIGN. PROTOTYPE.",
    desc: "Merging creativity and technology, transforming dreams into reality through innovative UI/UX design and product design.",
    desc2: "DESIGNS POWERED BY PROFESSIONAL CREATIVE SOFTWARE",
};

export default function Top() {
    const [data, setData] = useState<Container | null | undefined>(undefined);
    const apiService = useApiService();
    const [visibleIndex, setVisibleIndex] = useState(0);
    const hues = ['blue', 'red', 'purple']; //change me for button hue
    const timeChange: number = 3000; // 3 seconds

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

    useEffect(() => {
        // get the height of the Navbar
        const setTopMargin = () => {
            const navbarHeight = document.getElementById('navbar')!.offsetHeight;
            // set the padding-top of the main element to the Navbar height
            document.getElementById('main')!.style.height = `calc(100vh - ${navbarHeight}px)`;
            document.getElementById('main')!.style.marginTop = `${navbarHeight}px`;
        };
        setTopMargin();
        window.addEventListener('resize', setTopMargin)
        return () => {
            window.removeEventListener('resize', setTopMargin)
        };
    }, [data]);

    switch (data) {
        case (null):
            return <div>Whoops, there was a fatal error fetching the data.</div>;
        default:
            return (
                <div id="main" className={styles.topMain}>
                    <div className={`${styles[`centeredContainer`]} container`}>
                        <div className={`${styles.wordBoxRelative} d-flex} `}>
                            <div className={styles.wordContainer}>
                                <h1 className={styles[`title-header-top`]} style={{ background: "var(--blueGradient)" }}>CREATE.&nbsp;</h1>
                                <h1 className={styles[`title-header-top`]} style={{ background: "var(--redGradient)" }}>DESIGN.&nbsp;</h1>
                                <h1 className={styles[`title-header-top`]} style={{ background: "var(--purpleGradient)" }}>PROTOTYPE.</h1>


                            </div>
                        </div>
                        <div className={`${styles.wordBox} d-flex} `}>
                            <div className={styles.wordContainer}>
                                <h1 className={styles.word} style={{ opacity: visibleIndex === 0 ? 0 : 1 }}>CREATE.&nbsp;</h1>
                                <h1 className={styles.word} style={{ opacity: visibleIndex === 1 ? 0 : 1 }}>DESIGN.&nbsp;</h1>
                                <h1 className={styles.word} style={{ opacity: visibleIndex === 2 ? 0 : 1 }}>PROTOTYPE.</h1>
                            </div>
                        </div>
                        <p className={styles[`description`]}>{seoData.desc}</p>
                        <ButtonBlock visibleIndex={visibleIndex} hues={hues} />
                        <p className={styles[`subDescription`]}>{seoData.desc2}</p>
                        <img src="/mainProgramsUsed.svg" alt="Image Is Not Home" className={`${styles['logo-image']} img-fluid`} />
                    </div>
                </div>
            );
    }
};

//Just some messy code below that will get cleaned up. 
function ButtonBlock(props: { visibleIndex: number, hues: string[] }) {
    const { visibleIndex, hues } = props;
    const [isHovered, setIsHovered] = useState(false);
    const textShadowColor = isHovered ? hues[visibleIndex] : 'transparent';

    function scrollTo(id: string) {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
    }
    return (
        <div className={`${styles[`buttonBlock`]} d-flex justify-content-center row`}>
            <button
                className={`${styles[`resumeButton`]} text-center`}
                onClick={() => scrollTo('footer')}
            >
                Resume&nbsp;
            </button>
            <button
                onClick={() => scrollTo('dynoCaro')}
                className={`${styles[`projectsButton`]}  text-center`}
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


