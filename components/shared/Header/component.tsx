'use client'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './styles.module.css';
import { useApiService } from '../../../utils/ApiServiceContext';
import { Container } from '../../../utils/ApiDataInterface';
import { useState, useEffect } from 'react';


//Set pageId and containerId to pull the appropriate data.  Easy peazy.
//For the header. we are just grabbing the resume.  We will fix this later as its over kill for the resume.
const dataLocation: { pageId: number, containerId: number } = {
  pageId: 0,
  containerId: 5
};

export default function NavBar() {
  const [data, setData] = useState<Container | null | undefined>(undefined);
  const apiService = useApiService();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiService.getContainerDataByPageID(dataLocation.pageId, dataLocation.containerId);
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [apiService]);
  const navLinks =
    [
      { path: '/#dynoCaro', name: 'WORK' },
      { path: '/#about', name: 'ABOUT' },
      { path: `${pathname}#footer`, name: 'CONTACT' },
    ];

  const handleClick = (event: any, path: any) => {
    event.preventDefault();
    const hash = path.split('#')[1];
    if (pathname == '/' || path == navLinks[2].path) {
      const element = document.getElementById(hash);
      element?.scrollIntoView({ behavior: 'smooth' });
    } 
    else {
      router.push(path);
    }
  };
  //Switch case for the 3 different possible html structures.
  //Loading, Error Fetching Data, and default.
  switch (data) {
    case (null):
      return <div>Whoops, there was a fatal error fetching the data.</div>;

    default:
      return (
        <nav className={`${styles.navbar} navbar navbar-expand-md navbar-toggleable-md navbar-light bg-white border-bottom box-shadow`}>
          <div className={`container`}>
            <div className={`${styles['d-flex']} d-flex align-items-center`}>
              <Link href="/" className={`navbar-brand`}>
                <img src="/headerLogo.svg" alt="Your Image" className={`${styles['logo-image']}`} />
                Nicolaas Kilde
              </Link>
            </div>
            <button className={`navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
              aria-expanded="false" aria-label="Toggle navigation">
              <span className={`navbar-toggler-icon`}></span>
            </button>
            <div className={`navbar-collapse collapse d-md-inline-flex justify-content-between`}>
              <ul className={`navbar-nav ms-auto`}>
                {navLinks.map((link, index) => (
                  <li key={index} className={`nav-item `}>
                    <Link
                      onClick={(event) => handleClick(event, link.path)}
                      href={link.path}
                      className={`${styles['nav-link']} ${styles.noUnderline} nav-link text-dark`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <a href={`${data?.resume}${data?.blobLinkAppend}`} target="_blank" rel="noopener noreferrer" download className={styles.resumeLink}>
                <span className={`${styles[`text`]}`}>Resume </span>
                <span className={`${styles[`icon`]}`}>⬇</span> {/* Use any icon you want */}
              </a>
          </div>

        </nav>
      );
  }
};


