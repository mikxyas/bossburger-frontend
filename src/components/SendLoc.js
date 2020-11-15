import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {createLoc} from '../actions/locations'
import PropTypes from 'prop-types'

class SendLoc extends Component {
    static propTypes = {
        createLoc: PropTypes.func.isRequired,
    };
    render() {
        return (
            <div>
                <Button fullWidth onClick={() => this.props.createLoc(this.props.loc)} variant='contained' color='primary'>Create Location</Button>
            </div>
        )
    }
}

export default connect(null, {createLoc})(SendLoc)
