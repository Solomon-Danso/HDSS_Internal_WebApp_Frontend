import React, { useState } from 'react';
import { TestPdf, apiServer } from '../../Constants /Endpoints';

const Test = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePDF = async (Id) => {
    try {
      setIsLoading(true);
  
      // Send a request to the backend to generate the PDF
      const response = await fetch(apiServer + TestPdf+Id, {
        method: 'GET',
      });
  
      if (response.ok) {
        // Convert the response to a blob
        const blob = await response.blob();
  
        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);
  
        // Create an anchor element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Solomon.pdf';
        document.body.appendChild(a);
        a.click();
  
        // Clean up the URL and remove the anchor element
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        // Handle HTTP error responses
        console.error('HTTP Error:', response.status, response.statusText);
      }
    } catch (error) {
      // Handle other errors (e.g., network issues)
      console.error('Error generating PDF:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <button onClick={handleGeneratePDF} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate PDF'}
      </button>
    </div>
  );
};

export default Test;
