//This APIService is hooked up to a RESTful .net backend and is instantiated once at the top-level (layout.tsx).
//This service gets started automatically when a consumer first loads the website.
//Upon importing this on the top-level and instantiating it, our comps will call the getters to grab their data and
//the getters have a checker in place to ensure the data is loaded, if it isnt, we load it asychronously. 
//Please refer to the README documentation for additional information. 

class ApiService {

  allPages: any;
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

  //PUBLIC GETTER FUNCTIONS
  public async getContainerDataByPageID(pageID: number, containerID: number) {
    const status = await this.checkStatus();
    const pageData = this.allPages[pageID];
    const containerData = pageData['containers'][containerID];

    if (!status) {
      console.log("INFO: API Service is prepared to retrieve data from local cache.");
      
      if (pageData && containerData){
        console.log("INFO: API Services successfully retrieved the data.");
        return containerData;

      } else {
        this.nullDataLogger([`Page ${pageID}`, `Container ${containerID}`], [pageData, containerData]);
        return null;  // Explicitly return null if the container data was not found
      }
    } else {
      console.error("ERROR: An issue has occurred. Please refer to the logs above for details.");
      return Promise.resolve(null);  // Return a resolved Promise if checkStatus() was true
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

  private async checkStatus() {
    /* This method verifies the current status of our data and the service.
   * It checks whether the data is cached, if the service has is starting up, and whether there was a recent failure in service initialization.
   * If no issues are detected, the service will be launched.
   * This service aims to auto-start during the initial page load via the getter functions.
   *
   * TODO: Refactor into a switch (not sure if JS supports switches).
   *
   * TODO: Depending on the variety of error codes encountered, we can implement a systematic approach
   * that counts and deciphers the error codes automatically. This can be achieved by creating a
   * deserialization service that we can develop in the future. 
   */

    if (!this.dataLoaded && !this.fatalError && !this.serviceStarting) {
      console.log("INFO: API Services is initiating startup...");
      await this.startService();
    } else if (this.dataLoaded) {
      console.log("INFO: API Services has already loaded data into the cache.");
    } else if (this.serviceStarting) {
      console.log("INFO: API Services is in the process of loading...");
    } else {
      console.error("ERROR: API Services failed to start. Please refer to preceding logs for further details.");
    }
    return this.fatalError;
  }

  private nullDataLogger(containerNames: string[], containers: any[]){
    // Check each container for data and log the result
    for (let i = 0; i < containers.length; i++) {
        if(containers[i]){
            console.log(`INFO: Data for ${containerNames[i]} has been successfully located.`);
        }else{
            console.log(`ERROR: Data for ${containerNames[i]} was not found.`);
        }
    }
}

}

export default ApiService;