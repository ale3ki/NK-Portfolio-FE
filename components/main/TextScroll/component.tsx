//This is a cheater implementation for endless scrolling text.
//This is not endless because we are duping our string 250 times 
//animating that across the screen slowly. 

//TODO: Fix implementation and make it endless when we have more time.

"use client"
import styles from './styles.module.css';


export default function App() {
    const text = 'XR DESIGN ✦ 3D DESIGN ✦ UI/UX DESIGN ✦ PRODUCT DESIGN ✦'.repeat(200);

    return (
        <div className={styles["marquee"]}>
            <div className={styles["marquee__inner"]} aria-hidden="true">
                <span>{text}</span>
            </div>
        </div>
    );
}
