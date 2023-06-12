"use client"
import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { useApiService } from '../../../utils/ApiServiceContext';
import { Container } from '../../../utils/ApiDataInterface';

//Set this to change the loading string for the elements within the component.
const loadingString: string = "Loading...    Loading...    Loading...    Loading...    ";

export default function TextScroll(props: { pageId: number, containerId: number, bgColor: string, textColor: string, paddingTop: number, paddingBottom: number }) {
    const [data, setData] = useState<Container | null | undefined>(undefined);
    const [list, setList] = useState<string>(Array(2).fill(loadingString).join(''));
    const { pageId, containerId, bgColor, textColor, paddingBottom, paddingTop } = props;
    const apiService = useApiService();

    useEffect(() => {
        const fetchData = async () => {
            try {
                //if this data is cached, it will use the cached data instead.  Everything is automated (hopefully).
                const result = await apiService.getContainerDataByPageID(pageId, containerId);
                const newText = Array(2).fill(result?.description || 'Error...').join('');
                setList(newText);
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
            default:
                return (
                  <div className={`${styles.scrollHolder}`} style={{
                      paddingTop: paddingTop,
                      paddingBottom: paddingBottom,
                      background: bgColor
                  }}>
                    <div className={styles.scroll}>
                        <div className={styles.text} style={{ color: textColor }}>
                            {list}{list}
                        </div>
                    </div>
                  </div>
              );
              
    }
}
