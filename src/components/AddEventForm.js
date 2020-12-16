import React, { Component } from 'react'
import {Input, TextField, Button} from '@material-ui/core';
import {connect} from 'react-redux';
import {addEvent} from '../actions/events'
// import Previews from './UploadImage'
import Dropzone from 'react-dropzone'

class AddEventForm extends Component {
    constructor(){
        super();
        this.onDrop = (files) => {
            this.setState({files})
        }
        this.state = {
            files:[],
            title:'',
            desc:'',
            content:'',
            post_pic:null,
            img:'https://www.youtube.com/watch?v=Sc1KKe1Pguw',
            post_type:'EV'
        }
        // this.handleChange = this.handleChange.bind(this)
    }
    uploadEvent = async() => {
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
          title:this.state.title,
          desc:this.state.desc,
          content:this.state.content,
          img: publicId,
          post_type: 'EV',
        }
        const event = JSON.stringify(uploadData)
        this.props.addEvent(event)
      }
      // console.log(publicId)
    }
    handleTitle = (event) => {
        this.setState({
            title: event.target.value
        })
    }
    handleDesc= (event)=> {
        this.setState({
            desc:event.target.value
        })
    }
    handleContent= (event)=> {
        this.setState({
            content:event.target.value
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
               <div >
                   <h1>This the form</h1>
                   <TextField
                        name='title'
                        label="Event Title"
                        variant="outlined"
                        onChange={this.handleTitle}
                        value={this.state.title}
                        style={{width:'300px'}}
                    />
                    <br/>
                    {/* <input placeholder='fuck' onChange={this.handleChange}/> */}
                    <br/>
                    <TextField
                        style={{width:'300px'}}
                        name='desc'
                        label="Event Description"
                        variant="outlined"
                        multiline
                        value={this.state.desc}
                        onChange={this.handleDesc}
                        rows={3}
                    />
                     <br/>
                    <br/>
                    <TextField
                        style={{width:'300px'}}
                        name='content'
                        label="Event Content(optional)"
                        variant="outlined"
                        multiline
                        value={this.state.content}
                        onChange={this.handleContent}
                        rows={5}
                    />
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
                    
                    
                    
                    <Button style={{marginBottom:'80px'}} variant='contained' onClick={() => this.uploadEvent()}  color='primary'>Add Event</Button>
               </div>
               </div>
               </>

        )
    }
}

export default connect(null , {addEvent})(AddEventForm)