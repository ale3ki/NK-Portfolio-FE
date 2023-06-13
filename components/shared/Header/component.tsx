'use client'
import { usePathname, useRouter } from 'next/navigation';
import styles from './styles.module.css';
import { useApiService } from '../../../utils/ApiServiceContext';
import { Container } from '../../../utils/ApiDataInterface';
import { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-bootstrap';
import Link from 'next/link';


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
        <Navbar collapseOnSelect expand="md" className={`${styles.navbar} border-bottom box-shadow bg-white`}>
          <div className={`container`}>
          <Link href='/' className={styles.imageTextLink}>
            <Navbar.Brand className={`${styles['d-flex']} d-flex align-items-center`}>
                <img src="/headerLogo.svg" alt="Your Image" className={`${styles['logo-image']}`} />
                Nicolaas Kilde
            </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="navbarResponsive" />
            <Navbar.Collapse id="navbarResponsive">
              <Nav className="ms-auto">
                {navLinks.map((link, index) => (
                  <Nav.Link
                    key={index}
                    onClick={(event) => handleClick(event, link.path)}
                    href={link.path}
                    className={`${styles['nav-link']} ${styles.noUnderline} ${styles.textCenter}`}
                  >
                    {link.name}
                  </Nav.Link>
                ))}
                <Nav.Link
                  href={`${data?.resume}${data?.blobLinkAppend}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Nicolaas Kilde Resume 2023.pdf"
                  className={`${styles['resumeLink']} text-center`}
                >
                  <span className={`${styles[`text`]} `}>Resume </span>
                  <span className={`${styles[`icon`]} `}>⬇</span>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
      );
  }
};


