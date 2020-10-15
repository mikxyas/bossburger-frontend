import React, { Component } from 'react'
import {Container} from '@material-ui/core'

export default class About extends Component {
    render() {
        return (
            <Container>
                <div className='about-cont'>
                    <h2>Boss Burger</h2>
                    <hr/>
                    <h3>About us</h3>
                    <p>
                    A programming language is a formal language, which comprises a set of instructions used
                    to produce various kinds of output. Programming languages are used in computer
                    programming to create programs that implement specific algorithms. Most programming
                    languages consist of instructions for computers, although there are programmable machines
                    that use a limited set of specific instructions
                    </p>
                    <h3>Our vision</h3>
                    <p>
                    A programming language is a formal language, which comprises a set of instructions used
                    to produce various kinds of output. Programming languages are used in computer
                    programming to create programs that implement specific algorithms. Most programming
                    languages consist of instructions for computers, although there are programmable machines
                    that use a limited set of specific instructions
                    </p>
                </div>
            </Container>
        )
    }
}
