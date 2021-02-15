import React, { Component,useState } from 'react'
import {Input, TextField, Button, Typography} from '@material-ui/core';
import {connect} from 'react-redux';
// import {add} from '../actions/MenuItems'
// import Previews from './UploadImage'
import Dropzone from 'react-dropzone'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {addMenuItem} from '../actions/MenuItems'
import { useFormik } from "formik";
import * as Yup from "yup";


function AddMenuItemForm(props) {
    const [FoodType, setFoodType] = useState('BRG')
    const HandleFoodType = (event) => {
        setFoodType(event.target.value)
    }
    const formik = useFormik({
        initialValues: {
          name: "",
          desc: "",
          price:'',
          food_type:FoodType,
          img:'none'
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, "Minimum 3 Characters")
                // .max(15, 'Maximum 15 Characters')
                .required("Required!"),
            desc: Yup.string()
                .min(3, "Minimum 3 Characters"),
            price: Yup.number()
                .required("Required!"),

            food_type: Yup.string()
                .required("Required!"),

        }),
        onSubmit: values => {
            values.food_type = FoodType
            props.addMenuItem(values)
            console.log(values)
            // props.register(JSON.stringify(values, null, 2));  
          }
      });
    
        
        return (
            <>
            <div style={{display:'flex',alignItems:'center',flexDirection:'column',justifyContent:'center'}}>
               <div>
                   <Typography align='center' style={{margin:'1em'}} variant='h5'> Add new Menu Item </Typography>
                   <TextField
                        error={formik.touched.name && Boolean(formik.errors.name)} 
                        helperText={formik.touched.name ?formik.errors.name : ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} 
                        className='normal-form'
                        name='name'
                        label="Name"
                        variant="outlined"
                        value={formik.values.name}
                        
                    />
                    <br/>
                    <br/>
                    <TextField
                        error={formik.touched.desc && Boolean(formik.errors.desc)} 
                        helperText={formik.touched.desc ?formik.errors.desc : ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} 
                        className='normal-form'
                        name='desc'
                        label="Description"
                        multiline
                        rows='3'
                        variant="outlined"
                        value={formik.values.desc}
                    />
                    <br/>
                    <br/>
                    <TextField 
                        error={formik.touched.price && Boolean(formik.errors.price)} 
                        helperText={formik.touched.price ?formik.errors.price : ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} 
                        className='normal-form'
                        type='number'
                        name='price'
                        label="Price"
                        variant="outlined"
                    />
                     <br/>
                    <br/>
                    <>Menu item type: </> 
                    <Select
                    variant='outlined'
                    value={FoodType}
                    onChange={HandleFoodType}
                    >
                    <MenuItem value='BRG'>Burger</MenuItem>
                    <MenuItem value='FRI'>Fires</MenuItem>
                    <MenuItem value='BVG'>Beverage</MenuItem>
                    <MenuItem value='EXT'>Extras</MenuItem>
                    </Select>
                    {/* <TextField
                        style={{width:'300px'}}
                        name='content'
                        label="Event Content(optional)"
                        variant="outlined"
                        multiline
                        value={this.state.content}
                        onChange={this.handleContent}
                        rows={5}
                    /> */}
                   
                    {/* <Dropzone multiple={false} accept="image/*" onDrop={this.onDrop}>
                        {({getRootProps, getInputProps}) => (
                            <>
                            <div {...getRootProps({className: 'dropzone'})}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop image here, or click to select image</p>
                            </div>
                            <aside>
                            <h4>File</h4>
                            <ul>{files}</ul>
                            </aside>
                            </>
                        )}
                    </Dropzone> */}
                    {/* <Previews img={this.state.img} content={this.state.content} desc={this.state.desc} title={this.state.title}/> */}
                    
                    
               </div>

               </div>
               <Button variant='contained' onClick={formik.handleSubmit} disabled={!formik.dirty || !formik.isValid} type='submit' className='normal-btn'  color='secondary' style={{borderRadius:'20px', width:'200px', marginBottom:'2em '}} >Add MenuItem</Button>

               </>

        )
}

export default connect(null , {addMenuItem})(AddMenuItemForm)



// constructor(){
//     super();
//     this.onDrop = (files) => {
//         this.setState({files})
//     }
//     this.state = {
//         files:[],
//         name:'',
//         price:'',
//         available:true,
//         img:'',
//         food_type:'BRG'
//     }
//     // this.handleChange = this.handleChange.bind(this)
// }
// uploadMenuItem = async() => {
//     const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`
//     const formData = new FormData()
//     formData.append('file', this.state.files[0])
//     formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
//     const response = await fetch(url, {
//         method:'post',
//         body:formData
//     })
//     const upload_status = await response.status;
//   const data = await response.json();
//   if(upload_status == 200){
//     const publicId = data.public_id
//     const uploadData = {
//       name:this.state.name,
//       price:this.state.price,
//       food_type:this.state.food_type,
//       img: publicId,
//       available: this.state.available
//     }
//     const MenuItem = JSON.stringify(uploadData)
//     this.props.addMenuItem(MenuItem)
//   }
// }
// handleName = (event) => {
//     this.setState({
//         name: event.target.value
//     })
// }
// handlePrice= (event)=> {
//     this.setState({
//         price:event.target.value
//     })
// }
// handleFoodtype= (event)=> {
//     this.setState({
//         food_type:event.target.value
//     })
// }