import React, { Component } from 'react'
import PhoneIcon from '@material-ui/icons/Phone';


export default class Footer extends Component {
    render() {
        return (
            <footer>
                <div>
                    <li>
                        <span><a>Events</a></span>
                    </li>
                    <li>
                        <span><a>Menu</a></span>
                    </li>
                    <li>
                        <span><a>About us</a></span>
                    </li>
                    <li>
                        <span><a>Contact us</a></span>   
                    </li> 
                </div>
                <div>
                        <div className='phone-number'><PhoneIcon/>0911846518</div>                   
                </div>
                <div>Hi</div>
            </footer>
        )
    }
}
