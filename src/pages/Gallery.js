import React, { Component } from 'react'
import { Grid, Paper,GridListTile, GridList, GridListTileBar } from '@material-ui/core'
import {connect} from 'react-redux'


class Gallery extends Component {
    render() {
        let imgContWidth = "80vw"
        if(this.props.mobile && imgContWidth === "80vw"){
            imgContWidth="100vw"
        }
        return (
            <div style={{display:'flex', marginTop:'.2em', marginBottom:'2em',alignItems:'center', justifyContent:'center'}}>
                <GridList cellHeight={160} style={{width:imgContWidth, height:'450'}} cols={4}>
                        <GridListTile cols={this.props.isMobile ?4 : 2} rows={2}>
                            <img src='https://res.cloudinary.com/mikiyas/image/upload/v1607755032/hero1-bg_pvqypy.jpg' alt='bossburger' />
                            <GridListTileBar
                                title='Like what you see?'
                                subtitle={<span>Then what are you waiting for, place an order right now!</span>}
                                // actionIcon={
                                //     <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                                //     <InfoIcon />
                                //     </IconButton>
                                // }
                            />
                        </GridListTile>
                        <GridListTile cols={this.props.isMobile ?4 : 2} rows={2}>
                            <img src='https://res.cloudinary.com/mikiyas/image/upload/v1607756427/font2_gg4q96.jpg' alt='Boss Burger' />
                            
                        </GridListTile>
                        <GridListTile cols={this.props.isMobile ?4 : 2} rows={2}>
                            <img  src='https://res.cloudinary.com/mikiyas/image/upload/v1606364882/c-item7_oj36b9.jpg' alt='Boss Burger' />
                            
                        </GridListTile>
                        <GridListTile cols={this.props.isMobile ?4 : 2}  rows={2}>
                            <img  src='https://res.cloudinary.com/mikiyas/image/upload/v1606364891/c-item-3_i2lzp6.jpg' alt='Boss Burger' />
                        </GridListTile>
                        <GridListTile cols={this.props.isMobile ?4 : 2} rows={this.props.mobile ? 2 : 2.5}>
                            <img  src='https://res.cloudinary.com/mikiyas/image/upload/v1606569033/97237411_248415766235891_5659653975019641466_n_sxwi4c.jpg' alt='Boss Burger' />
                           
                        </GridListTile>
                        
                        <GridListTile cols={this.props.isMobile ?4 : 2} rows={this.props.mobile ? 2 : 2.5}>
                            <img  src='https://res.cloudinary.com/mikiyas/image/upload/v1606364886/c-item2_qewdgb.jpg' alt='Boss Burger' />
                        </GridListTile>
                        <GridListTile cols={this.props.isMobile ?4 : 2} rows={2}>
                            <img  src='https://res.cloudinary.com/mikiyas/image/upload/v1611043845/137362158_792180124842020_2700611164695898017_n_p0hdca.jpg' alt='Boss Burger' />
                        </GridListTile>
                        <GridListTile cols={this.props.isMobile ?4 : 2} rows={2}>
                            <img  src=' https://res.cloudinary.com/mikiyas/image/upload/v1606364889/c-item5_jsif5a.jpg' alt='Boss Burger' />
                        </GridListTile>
                       
                        
                    </GridList>
                   
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isMobile: state.ui.mobile,
});
export default connect(mapStateToProps, null)(Gallery)