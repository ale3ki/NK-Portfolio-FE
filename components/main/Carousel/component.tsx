//DynoCaro - A dynamic carousel that displays 2 rows of 3 items (as many items or just a few), with page routing capablities. 
//You cannot change the rows but in the future we will create a new carousel that is fully dynamic.
//This file needs to be cleaned up.  We can sinplify a lot of stuff below. 
"use client"
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useApiService } from '../../../utils/ApiServiceContext';
import { Container } from '../../../utils/ApiDataInterface';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal'
import Link from 'next/link';
import { LinkOptions } from '../../../utils/types/interface';
import { Fade } from 'react-awesome-reveal';
import Lottie from 'lottie-react';
import animationData from '../../../public/lottieFiles/LoadingBounce.json'


//Our custom nav buttons because the defaults cant be moved.
const NextIcon = () => <h1 className={styles["custom-next"]}>&gt;</h1>;
const PrevIcon = () => <h1 className={styles["custom-prev"]}>&lt;</h1>;

const NextIconModal = () => <h1 className={styles["customNextModal"]}>&gt;</h1>;
const PrevIconModal = () => <h1 className={styles["customPrevModal"]}>&lt;</h1>;
//The path name corresponds over into the page that will load. 
//We need to remove this and update this structure so its more reusable. 
//https://nextjs.org/docs/app/api-reference/components/link
//https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#link-component

function DynoCaroModal(props: { showModal: boolean, handleCloseModal: () => void, activeIndex: number, carouselCards: any[], SASToken: string }) {
    const { showModal, handleCloseModal, carouselCards, SASToken } = props;
    const [activeCarouselIndex, setActiveCarouselIndex] = useState(props.activeIndex);
    const [currentCard, setCurrentCard] = useState(carouselCards[props.activeIndex]);
    const totalItems: number = carouselCards.length;

    useEffect(() => {
        setActiveCarouselIndex(props.activeIndex);
        setCurrentCard(carouselCards[props.activeIndex]);
    }, [props.activeIndex, carouselCards]);

    const handleSelect = (selectedIndex: number, e: Record<string, unknown> | null) => {
        setActiveCarouselIndex(selectedIndex);
        setCurrentCard(carouselCards[selectedIndex]);
    };

    return (
        <Modal className={styles.customModal} show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton className={styles.modalHeader}>
                <div className={styles.modalHeaderCenter}>
                    <Modal.Title className={styles.centerMe}>{currentCard.title}</Modal.Title>
                </div>
            </Modal.Header>
            <Modal.Body className={styles.myCaro}>
                <Carousel
                    id="myGallery"
                    activeIndex={activeCarouselIndex}
                    onSelect={handleSelect}
                    data-interval={false}
                    interval={null}
                    nextIcon={totalItems > 1 ? <NextIconModal /> : null}
                    prevIcon={totalItems > 1 ? <PrevIconModal /> : null}>
                    {carouselCards.map((card, index) => (
                        <Carousel.Item key={index} className={`${styles[`imageHelper`]}`}>
                            <img src={card.image + SASToken} alt={`item${index}`} />

                        </Carousel.Item>
                    ))}
                </Carousel>

            </Modal.Body>

        </Modal>
    );
}


export default function DynoCaro(props: { pageId: number, containerId: number, loadingString: string, linkOptions?: LinkOptions }) {
    const [data, setData] = useState<Container | null | undefined>(undefined);
    const [showModal, setShowModal] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const apiService = useApiService();
    const { pageId, containerId, linkOptions, loadingString } = props;

    // Function to handle card click
    const handleCardClick = (index: number) => {
        setActiveIndex(index);
        setShowModal(true);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setShowModal(false);
    };

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
                <div className="testing">
                    <div  className={`${styles[`mainContainer`]} container`}>
                        <h1 className={`${styles.h1Title}`}>{loadingString}</h1>
                        <p id="dynoCaro" className={styles.pDescription}> {loadingString} </p>
                    </div>
                    <div style={{ height: '100vh', width: '100vw' }}>
                        <Lottie animationData={animationData} style={{ height: '100%', width: '100%' }} />
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
                    <Fade triggerOnce>
                        <h1 className={styles.h1Title}>{data?.title || loadingString}</h1>
                    </Fade>
                    <Fade delay={250} triggerOnce>
                        <p className={`${styles.pDescription} col-12 col-lg-8`}> {data?.description || loadingString} </p>
                    </Fade>
                    <div className={`${styles[`carouselBox`]}`}>
                        <Carousel
                            id="dynoCaro"
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
                                                                query: { carouselId: carouselNumber++ }
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
                                                            <Card
                                                                className={styles.testing}
                                                                onClick={() => handleCardClick(index * 6 + i * 3 + j)}>
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
                    <DynoCaroModal
                        showModal={showModal}
                        handleCloseModal={handleCloseModal}
                        activeIndex={activeIndex}
                        carouselCards={data?.carouselCards || []}
                        SASToken={data.blobLinkAppend!}
                    />
                </div>

            );
    }

};
