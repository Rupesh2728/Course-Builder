import React from 'react';
import DownloadIcon from '../../../Assets/Icons/DownloadIcon.svg';
import toast from 'react-hot-toast';

const DownloadFile = ({ fileUrl, fileName }) => {

    const downloadFile = async () => {
        try {
          const response = await fetch(fileUrl);
    
          if (!response.ok) {
            throw new Error('Failed to download file');
          }
    
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
    
          const a = document.createElement('a');
          a.href = url;
          a.download = fileName; 
          document.body.appendChild(a);
          a.click();
    
        
          window.URL.revokeObjectURL(url);
          a.remove();
          toast.success("File Downloaded...");
        } catch (error) {
          console.error('Error downloading file:', error);
          toast.error(error)
        }
      };

  return (
    <div className="text-[0.9rem] flex" onClick={downloadFile}>
    <img src={DownloadIcon} alt="DownloadLogo"/>
    <p className="text-[#717171] ml-[0.5rem]">Download</p>
 </div>
  )
}

export default DownloadFile