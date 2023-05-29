"use client"

import React, { createContext, useContext } from 'react';
import ApiService from './ApiServiceWorker';  // Adjust the path if necessary

// Create the context
const ApiServiceContext = createContext<ApiService | null>(null);

// Create a provider component
export function ApiServiceProvider({ children }: { children: React.ReactNode }) {
  // Initialize the ApiService
  const apiService = new ApiService();

  // Provide the ApiService to child components
  return (
    <ApiServiceContext.Provider value={apiService}>
      {children}
    </ApiServiceContext.Provider>
  );
}

// Create a custom hook for accessing the ApiService
export function useApiService() {
  const context = useContext(ApiServiceContext);
  if (context === null) {
    throw new Error('useApiService must be used within a ApiServiceProvider');
  }
  return context;
}
