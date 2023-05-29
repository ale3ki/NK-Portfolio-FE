//This APIService is hooked up to a RESTful .net backend and is instantiated once at the top-level (layout.tsx).
//This service gets started automatically when a consumer first loads the website.
//Upon importing this on the top-level and instantiating it, our comps will call the getters to grab their data and
//the getters have a checker in place to ensure the data is loaded, if it isnt, we load it asychronously. 
//Please refer to the README documentation for additional information. 

import { PageData, Container } from './ApiDataInterface';

class ApiService {

  allPages: PageData[] | null;
  dataLoaded: boolean;
  fatalError: boolean;
  serviceStarting: boolean;

  constructor() {
    this.allPages = null;
    this.dataLoaded = false;
    this.fatalError = false;
    this.serviceStarting = false;
  }

  private async startService() {
    //This is an automated function that the getters call.
    this.serviceStarting = true;
    await this.fetchAllPages()
      .then(() => {
        console.log("INFO: API Services successfully initialized.");
        this.dataLoaded = true;
      })
      .catch((error) => {
        this.fatalError = true;
        console.error("ERROR: API Services failed to initialize.", error);
      });
    this.serviceStarting = false;
  }

  public async getContainerDataByPageID(pageID: number, containerID: number): Promise<Container | null> {
    const status = await this.checkStatus();
  
    switch (status) {
      case 'success':
        console.log("INFO: API Service is prepared to retrieve data from local cache.");
        const pageData = this.allPages![pageID];
        const containerData = pageData?.containers[containerID];
  
        if (pageData && containerData) {
          console.log("INFO: API Services successfully retrieved the data.");
          //console.log("Data: ", containerData);
          return containerData;
        } else {
          //Automates checking for undefined containers.
          this.nullDataLogger([`Page ${pageID}`, `Container ${containerID}`], [pageData, containerData]);
          return null;  
        }
  
      case 'loading':
        // Waiting for 1 second before retry.  Not sure if this is bad to do but we will find out one way or another.
        await new Promise(resolve => setTimeout(resolve, 1000));  
        return this.getContainerDataByPageID(pageID, containerID);
  
      default:
        //Failed will default here aswell.
        return null; 
    }
  }

  //PRIVATE FUNCTIONS
  private async fetchAllPages() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/PageData/All`);
    await this.checkResponse(response);
  }

  private async checkResponse(response: Response) {

    let responseCheck: boolean = true;
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    this.allPages = data;
  }

  private async checkStatus(): Promise<"success" | "loading" | "failed"> {

    if (!this.dataLoaded && !this.fatalError && !this.serviceStarting) {
      console.log("INFO: API Services is initiating startup...");
      await this.startService();
      if (this.dataLoaded) {
        return "success";
      } else {
        return "loading";
      }
    } else if (this.dataLoaded) {
      console.log("INFO: API Services has already loaded data into the cache.");
      return "success";
    } else if (this.serviceStarting) {
      console.log("INFO: API Services is in the process of loading...");
      return "loading";
    } else {
      console.error("ERROR: API Services failed to start. Please refer to preceding logs for further details.");
      return "failed";
    }
  }

  private nullDataLogger(containerNames: string[], containers: any[]) {
    // Check each container for data and log the result
    for (let i = 0; i < containers.length; i++) {
      if (containers[i]) {
        console.log(`INFO: Data for ${containerNames[i]} has been successfully located.`);
      } else {
        console.log(`ERROR: Data for ${containerNames[i]} was not found.`);
      }
    }
  }

}

export default ApiService;