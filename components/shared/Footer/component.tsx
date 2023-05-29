"use client"

import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useApiService } from '../../../utils/ApiServiceContext';

interface ContainerData {
  container: number;
  title: string;
  title2: string;
  resume: string;
  email: string;
  copyright: string;
}

const Footer = () => {
  const [data, setData] = useState<ContainerData | null>(null);
  const apiService = useApiService();

  useEffect(() => {
    const fetchData = async () => {
        try {
          const result = await apiService.getContainerDataByPageID(0, 5);
          setData(result);
        } catch (error) {
          console.error(error);
        }
      };

    fetchData();
  }, [apiService]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className={`container`}>
            <div className={`${styles[`adjustable-aboutme-sub-container`]}`}>
                <div className={`${styles[`aboutme-text-wrapper2`]}`} id='aboutme-text-wrapper'>
                    <div id="line-top">
                        <h1 className={`${styles[`title-header-bottom2`]} ${styles[`line-top`]}`}>{data.title} <br/> View my <a href="~/nkresume/nicolaas kilde - resume 2023.pdf" download className={styles.resumeLink}>resume</a></h1>
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
};;

export default Footer;
