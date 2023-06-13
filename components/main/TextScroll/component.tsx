"use client"
import styles from './styles.module.css';
import { useState, useEffect, useRef } from 'react';
import { useApiService } from '../../../utils/ApiServiceContext';
import { Container } from '../../../utils/ApiDataInterface';
import anime from 'animejs';

//Set this to change the loading string for the elements within the component.
const loadingString: string = "Loading...    Loading...    Loading...    Loading...    ";

export default function TextScroll(props: { pageId: number, containerId: number, bgColor: string, textColor: string, paddingTop: number, paddingBottom: number }) {
    const [data, setData] = useState<Container | null | undefined>(undefined);
    const [list, setList] = useState<string>(Array(2).fill(loadingString).join(''));
    const { pageId, containerId, bgColor, textColor, paddingBottom, paddingTop } = props;
    const apiService = useApiService();
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await apiService.getContainerDataByPageID(pageId, containerId);
                const newText = result?.description || 'Error...';
                setList(Array(2).fill(newText).join(''));
                setData(result);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [apiService]);

    useEffect(() => {
        if (textRef.current) {
            const animation = anime({
                targets: textRef.current,
                translateX: ['-0%', '-50%'],
                duration: 40000,
                loop: true,
                easing: 'linear'
            });
        
            return () => animation.pause(); // clean up the animation if the component unmounts or textRef changes
        }
    }, [textRef]);

    switch (data) {
        case (null):
            return <div>Whoops, there was a fatal error fetching the data.</div>;
        default:
            return (
                <div className={`${styles.scrollHolder}`} style={{
                    paddingTop: paddingTop,
                    paddingBottom: paddingBottom,
                    background: bgColor
                }}>
                    <div className={styles.scroll}>
                        <div className={styles.text} ref={textRef} style={{ color: textColor }}>
                            {list}{list}
                        </div>
                    </div>
                </div>
            );
    }
}
