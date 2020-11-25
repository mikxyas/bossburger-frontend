import React, { Component } from 'react'
import {Input, TextField, Button} from '@material-ui/core';
import {connect} from 'react-redux';
// import {add} from '../actions/MenuItems'
// import Previews from './UploadImage'
import Dropzone from 'react-dropzone'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {addMenuItem} from '../actions/MenuItems'

class AddMenuItemForm extends Component {
    constructor(){
        super();
        this.onDrop = (files) => {
            this.setState({files})
        }
        this.state = {
            files:[],
            name:'',
            price:'',
            available:true,
            img:'',
            food_type:'BRG'
        }
        // this.handleChange = this.handleChange.bind(this)
    }
    uploadMenuItem = async() => {
        const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`
        const formData = new FormData()
        formData.append('file', this.state.files[0])
        formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
        const response = await fetch(url, {
            method:'post',
            body:formData
        })
        const upload_status = await response.status;
      const data = await response.json();
      if(upload_status == 200){
        const publicId = data.public_id
        const uploadData = {
          name:this.state.name,
          price:this.state.price,
          food_type:this.state.food_type,
          img: publicId,
          available: this.state.available
        }
        const MenuItem = JSON.stringify(uploadData)
        this.props.addMenuItem(MenuItem)
      }
    }
    handleName = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    handlePrice= (event)=> {
        this.setState({
            price:event.target.value
        })
    }
    handleFoodtype= (event)=> {
        this.setState({
            food_type:event.target.value
        })
    }
    render() {
        const files = this.state.files.map(file => (
            <li key={file.name}>
              {file.name} - {file.size / 1000} Kilo Bytes
            </li>
          ));
        return (
            <>
            <div style={{display:'flex',alignItems:'center',flexDirection:'column',justifyContent:'center'}}>
               <div>
                   <h1>This the form</h1>
                   <TextField
                        name='name'
                        label="Name"
                        variant="outlined"
                        onChange={this.handleName}
                        value={this.state.title}
                        style={{width:'300px'}}
                    />
                    <br/>
                    {/* <input placeholder='fuck' onChange={this.handleChange}/> */}
                    <br/>
                    <TextField
                        style={{width:'300px'}}
                        name='price'
                        label="Price"
                        variant="outlined"
                        multiline
                        value={this.state.price}
                        onChange={this.handlePrice}
                        rows={3}
                    />
                     <br/>
                    <br/>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={this.state.food_type}
                    onChange={this.handleFoodtype}
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
                    <br/>
                    <br/>
                    <Dropzone multiple={false} accept="image/*" onDrop={this.onDrop}>
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
                    </Dropzone>
                    {/* <Previews img={this.state.img} content={this.state.content} desc={this.state.desc} title={this.state.title}/> */}
                    
                    <br/>
                    <br/>
                    <Button variant='contained'  onClick={() => this.uploadMenuItem()} color='primary'>Add MenuItem</Button>
               </div>
               </div>
               </>

        )
    }
}

export default connect(null , {addMenuItem})(AddMenuItemForm)