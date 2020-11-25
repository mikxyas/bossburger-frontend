// import React, { useCallback,useState } from 'react';
// import {useDropzone} from 'react-dropzone';
// import {connect} from 'react-redux'
// import {addEvent} from '../actions/events'

// function Previews(props) {
//   const onDrop = useCallback((acceptedFiles) => {
//     const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`
  
//     acceptedFiles.forEach(async(acceptedFile) => {
//       const formData = new FormData()
//       formData.append('file', acceptedFile);
//       formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
//       const response =  await fetch(url, {
//         method:'post',
//         body:formData
//       })
//       const upload_status = await response.status;
//       const data = await response.json();
//       if(upload_status == 200){
//         const publicId = data.public_id + '.' +data.format
//         const uploadData = {
//           title:title,
//           desc:desc,
//           content:content,
//           img: publicId,
//           post_type: 'EV',
//         }
//         // const event = JSON.stringify(uploadData)
//         props.addEvent(uploadData)
//       }
//       // console.log(publicId);
//     })
    
//   }, []);
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop, accepts:"image/*",multiple:false})
//   return(
//     <>
//       <div {...getRootProps()} className={`${'dropzone'} ${isDragActive ? 'active-dropzone' :null}`}>
//         <input {...getInputProps()}/>
//         Drop Zone
//       </div>
//       </div>
//     </>
//   )
// }
// export default connect(null, {addEvent})(Previews)