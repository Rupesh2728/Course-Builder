import React from 'react';
import DownloadIcon from '../../../Assets/Icons/DownloadIcon.svg';
import toast from 'react-hot-toast';

const DownloadFile = ({ fileUrl, fileName }) => {

  const downloadFile = async () => {
    try {
      const a = document.createElement('a');
      a.href = fileUrl;
      a.download = fileName; 
      document.body.appendChild(a);
      a.click();
      
     
      window.URL.revokeObjectURL(fileUrl);
      a.remove();

      toast.success("File Downloaded...");
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error("Failed to download file");
    }
  };

  return (
    <div className="text-[0.9rem] flex" onClick={downloadFile}>
      <img src={DownloadIcon} alt="DownloadLogo"/>
      <p className="text-[#717171] ml-[0.5rem]">Download</p>
    </div>
  );
}

export default DownloadFile;
