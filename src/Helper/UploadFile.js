
// const uploadFile = async (file) => {
//     const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`; 
//     const formData = new FormData();
//     formData.append('file', file);
//     const resourceType = file.type.startsWith('image/') ? 'image' : 'raw';
//     formData.append('resource_type', resourceType);
    
//     formData.append('upload_preset', 'Course-builder'); 
  
//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         body: formData,
//       });
//       const result = await response.json();
//       console.log('File uploaded successfully:', result);
//       return result; 
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };

// module.exports= {
//     uploadFile,
// }