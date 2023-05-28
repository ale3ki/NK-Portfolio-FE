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

    this.serviceStarting = true;

    await this.fetchAllPages()
      .then(() => {
        console.log("SUCCESS: Api Services has successfully started.");
        this.dataLoaded = true;
      })
      .catch((error) => {
        this.fatalError = true;
        console.error("WARNING: Api Services was unable to start.", error);
      });

    this.serviceStarting = false;
  }

  //PUBLIC FUNCTIONS
  public async fetchPageData(pageId: String) {
    //Not being used but available nonetheless.
    const response = await fetch(`${process.env.NEXT_APP_API_BASE_URL}/PageData/${pageId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch page data. HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }

  //PUBLIC GETTER FUNCTIONS
  public async getContainerDataByPageID(pageID: number, containerID: number) {

    // TODO : Split this function up into 2 functions  

    if (!await this.checkStatus()) {

      console.log("MESSAGE: API SERVICE IS READY TO PULL DATA FROM LOCAL CACHE");
      const pageData = this.allPages[pageID];

      if (pageData) {
        const containerData = pageData[containerID];

        if (containerData) {
          return containerData;
        } else {
          console.error(`Container ${containerID} does not exist on page ${pageID}`);
        }
      } else {
        console.error(`Page ${pageID} does not exist`);
      }
    } else {
      console.error(`Data not loaded yet`);
    }

    return null;
  }

  //PRIVATE FUNCTIONS
  private async fetchAllPages() {
    //This gets called once upon instantiation.
    const response = await fetch(`${process.env.NEXT_APP_API_BASE_URL}/PageData/All`);
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
    //Checks to see if our data is cached and if the service recently failed to start.
    //If all is well, we will start the service. 
    //This service attemps to start itself of initial page load, automatically via the getter functions. 
    //TODO : Fix this ugly mess.  CheckStatus might grow and eventually need a new class altogether. 
    //Just fix the data structure for now. 
    // TODO : Depending on how many error codes we will have, we can create a mathematical system that just counts the error codes 
    // and deciphers the errors automatically through a deserialization service that we can create manually. 

    let status: boolean = false;

    if (!this.dataLoaded && !this.fatalError && !this.serviceStarting) {
      console.log("MESSAGE: Api Services attempting to start......");
      await this.startService();
    } else if (this.dataLoaded) {
      console.log("MESSAGE: Data already loaded into cache.....");
    } else if (this.serviceStarting) {
      console.log("MESSAGE: Api Services is currently loading....");
    } else {
      console.error("WARNING: Api Services was unable to start.  Check logs for additional details.");
    }
    return this.fatalError;
  }

}

export default ApiService;