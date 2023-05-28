import React from "react";
import ApiService from "../utils/ApiService";

const apiService = new ApiService();

export default function Page() {
  apiService.getContainerDataByPageID(1, 4).then((containerData) => {
    if (containerData) {
      console.log(containerData.description);
    }
  });

  return <main></main>;
}