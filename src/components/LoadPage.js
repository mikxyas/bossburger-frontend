import React, { Component } from 'react'
import Main from '../routes'
import {connect} from 'react-redux'
import Loading from './Loading'
import TimeIcon from '@material-ui/icons/Timelapse'

class LoadPage extends Component {
    render() {
        return (
            <div className='main-container'>
                {this.props.isAuthenticated !== null
                    ?<Main/>
                    :<div style={{display:"flex",height:"80vh", alignItems:"center",justifyContent:"center"}}>
                        <Loading LoaderIcon={<TimeIcon/>}/>
                    </div>
                }
            </div>
                
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, null)(LoadPage)
