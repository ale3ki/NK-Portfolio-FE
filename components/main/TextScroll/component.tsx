"use client"
import styles from './styles.module.css';
import { useEffect, useRef } from 'react';
import anime from 'animejs';

const loadingString: string = "XR DESIGN ✦ UI/UX DESIGN ✦ PRODUCT DESIGN ✦ 3D DESIGN ✦";

export default function TextScroll(props: {scrollText: string, bgColor: string, textColor: string, paddingTop: number, paddingBottom: number }) {

    const list: string = Array(2).fill(loadingString).join('');
    const { bgColor, textColor, paddingBottom, paddingTop } = props;
    const textRef = useRef<HTMLDivElement>(null);

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
