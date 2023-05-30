export interface CarouselCard {
  carouselID: number;
  image: string;
  title: string;
  description: string;
}

export interface Container {
  container: number;
  blobLinkAppend?: string;
  title?: string;
  description?: string;
  description2?: string;
  carouselCards?: CarouselCard[];
  title2?: string;
  imageBLeft?: string;
  imageMidRight?: string;
  title3?: string;
  description3?: string;
  image?: string;
  resume?: string;
  email?: string;
  copyright?: string;
  video?: string;
}

export interface PageData {
  pageID: number;
  blobAppendSAS?: string;
  containers: Container[];
}
