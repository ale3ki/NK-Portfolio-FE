//DynoCaro - A dynamic carousel that displays 2 rows of 3 items (as many items or just a few), with page routing capablities. 
"use client"
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useApiService } from '../../../utils/ApiServiceContext';
import { Container } from '../../../utils/ApiDataInterface';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Link from 'next/link';
import { LinkOptions } from '../../../utils/types/interface';


//Set this to change the loading string for the elements within the component.
const loadingString: string = "Loading...";
//Our custom nav buttons because the defaults cant be moved.
const NextIcon = () => <h1 className={styles["custom-next"]}>&gt;</h1>;
const PrevIcon = () => <h1 className={styles["custom-prev"]}>&lt;</h1>;
//The path name corresponds over into the page that will load. 
//We need to remove this and update this structure so its more reusable. 
//https://nextjs.org/docs/app/api-reference/components/link
//https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#link-component




export default function DynoCaro(props: {pageId: number, containerId: number, linkOptions?: LinkOptions}) {
    const [data, setData] = useState<Container | null | undefined>(undefined);
    const apiService = useApiService();
    const {pageId, containerId, linkOptions} = props;

    useEffect(() => {
        const fetchData = async () => {
            try {
                //if this data is cached, it will use the cached data instead.  Everything is automated (hopefully).
                const result = await apiService.getContainerDataByPageID(pageId, containerId);
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
                let totalItems: number = 0;
                let carouselNumber: number = 1;
                if (data?.carouselCards) {
                    totalItems = data.carouselCards.length;
                    for (let i = 0; i < totalItems; i += 6) {
                        const topRow = data.carouselCards.slice(i, i + 3);
                        const bottomRow = data.carouselCards.slice(i + 3, i + 6);
                        groupedCards.push([topRow, bottomRow]);
                    }
                }
                //Our single checker if we should add a link to the carousel items. 
                //Checks if user set the links and if the 'makeLinks' boolean is true. 
                const shouldLink = props.linkOptions && props.linkOptions.makeLinks;
            
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
                                                            {shouldLink ? (
                                                                <Link style={{ textDecoration: 'none' }} href={{
                                                                    pathname: linkOptions!.pathNames![carouselNumber - 1],
                                                                    query: {carouselId: carouselNumber++}
                                                                }}>
                                                                    <Card className={styles.testing} >
                                                                        <Card.Img variant="top" src={card.image + data?.blobLinkAppend} alt={loadingString} className={`${styles[`imgProp`]} img-fluid`} />
                                                                        <Card.Body className={styles.cardBody}>
                                                                            <Card.Title className={`${styles[`titleBox`]}`}>{card.title}</Card.Title>
                                                                            <Card.Subtitle className={`${styles[`subText`]} mb-2 text-muted`}>
                                                                                {card.description}
                                                                            </Card.Subtitle>
                                                                        </Card.Body>
                                                                    </Card>
                                                                </Link>
                                                            ) : (
                                                                <Card className={styles.testing} >
                                                                    <Card.Img variant="top" src={card.image + data?.blobLinkAppend} alt={loadingString} className={`${styles[`imgProp`]} img-fluid`} />
                                                                    <Card.Body className={styles.cardBody}>
                                                                        <Card.Title className={`${styles[`titleBox`]}`}>{card.title}</Card.Title>
                                                                        <Card.Subtitle className={`${styles[`subText`]} mb-2 text-muted`}>
                                                                            {card.description}
                                                                        </Card.Subtitle>
                                                                    </Card.Body>
                                                                </Card>
                                                            )}
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