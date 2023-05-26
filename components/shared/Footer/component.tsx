import styles from './styles.module.css';

const Footer = () => {
  return (
    <div className={`container`}>
            <div className={`${styles[`adjustable-aboutme-sub-container`]}`}>
                <div className={`${styles[`aboutme-text-wrapper2`]}`} id='aboutme-text-wrapper'>
                    <div id="line-top">
                        <h1 className={`${styles[`title-header-bottom2`]} ${styles[`line-top`]}`}>Get In Touch! <br/> View my <a href="~/nkresume/nicolaas kilde - resume 2023.pdf" download className={styles.resumeLink}>resume</a></h1>
                    </div>
                    <div id="line-bottom">
                        <p className={`${styles[`description-bottom2`]} ${styles[`line-bottom`]}`}>
                            Email: nicolaaskilde@outlook.com
                        </p>
                        <p className={styles[`copywrite-bottom`]}>
                            Copyright © 2023 Nicolaas Kilde. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
       
    </div>
  );
};

export default Footer;