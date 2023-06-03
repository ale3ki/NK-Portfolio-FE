"use client"
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useApiService } from '../../../utils/ApiServiceContext';
import { Container } from '../../../utils/ApiDataInterface';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';

const NextIcon = () => <h1 className={styles["custom-next"]}>&gt;</h1>;
const PrevIcon = () => <h1 className={styles["custom-prev"]}>&lt;</h1>;

//Set pageId and containerId to pull the appropriate data.  Easy peazy.
//In the html structure, just call {data.anything} 
const dataLocation: { pageId: number, containerId: number } = {
    pageId: 0, //Set me
    containerId: 2 //Set me
};
//Set this to change the loading string for the elements within the component.
const loadingString: string = "Loading...";

export default function Top() {
    const [data, setData] = useState<Container | null | undefined>(undefined);
    const apiService = useApiService();

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

    switch (data) {
        case (null):
            return <div>Whoops, there was a fatal error fetching the data.</div>;
        case (undefined):
            return (
                <div className={`${styles[`mainContainer`]} container`}>
                    <h1 className={styles.h1Title}>{loadingString}</h1>
                    <p className={styles.pDescription}> {loadingString} </p>
                    <div className={`${styles[`carouselBox`]}`}>
                        <Carousel className={styles.carouselBox} interval={null} nextIcon={<NextIcon />} prevIcon={<PrevIcon />} >
                            <Carousel.Item className={styles.carouselItem}>
                                <div className={`row`}>
                                    {Array.from({ length: 6 }, (_, index) => (
                                        <div className={`col-md-4`} key={index}>
                                            <Card className={styles.testing}>
                                                <Card.Img variant="top" src="/portPlaceholder.png" alt={loadingString} className={`${styles[`imgProp`]} img-fluid`} />
                                                <Card.Body className={styles.cardBody}>
                                                    <Card.Title className={`${styles[`titleBox`]}`}><h1>{loadingString}</h1></Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
            );
        default:
            const groupedCards = [];
            let totalItems = 0;
            if (data?.carouselCards) {
                totalItems = data.carouselCards.length;
                for (let i = 0; i < totalItems; i += 6) {
                    const topRow = data.carouselCards.slice(i, i + 3);
                    const bottomRow = data.carouselCards.slice(i + 3, i + 6);
                    groupedCards.push([topRow, bottomRow]);
                }
            }
            return (
                <div className={`${styles[`mainContainer`]} container`}>
                    <h1 className={styles.h1Title}>{data?.title || loadingString}</h1>
                    <p className={styles.pDescription}> {data?.description || loadingString} </p>
                    <div className={`${styles[`carouselBox`]}`}>
                        <Carousel
                            className={styles.carouselBox}
                            interval={null}
                            nextIcon={totalItems > 6 ? <NextIcon /> : null}
                            prevIcon={totalItems > 6 ? <PrevIcon /> : null}
                        >
                            {groupedCards.map((group, index) => (
                                <Carousel.Item key={index} className={styles.carouselItem}>
                                    {group.map((row, i) => (
                                        <div className={`row ${row.length < 3 ? 'justify-content-md-center' : ''}`} key={i}>
                                            {row.map((card, j) => (
                                                <div className={`col-md-4 d-flex justify-content-center`} key={j}>
                                                    <div style={{ maxWidth: '100%' }}>
                                                        <Card className={styles.testing}>
                                                            <Card.Img variant="top" src={card.image + data?.blobLinkAppend} alt={loadingString} className={`${styles[`imgProp`]} img-fluid`} />
                                                            <Card.Body className={styles.cardBody}>
                                                                <Card.Title className={`${styles[`titleBox`]}`}>{card.title}</Card.Title>
                                                                <Card.Subtitle className={`${styles[`subText`]} mb-2 text-muted`}>
                                                                    {card.description}
                                                                </Card.Subtitle>
                                                            </Card.Body>
                                                        </Card>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                </div>
            );
    }
};