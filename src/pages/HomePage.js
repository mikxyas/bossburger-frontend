import React from 'react';
import {Button, Container} from '@material-ui/core';
import Link from '@material-ui/core/Link'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import OpenInBrowserIcon from '@material-ui/icons/tab'
import Section from '../components/Section'
import Banner from '../components/Banner'
import AdCard from '../components/AdCard'

function HomePage() {
  return (
  <> 
    <Section/>
    <Container>
      <Banner/>
      <div className='ad-grid'>
        <AdCard btnTitle='Order Now'/>
        <AdCard btnTitle='Check it out'/>
        <AdCard btnTitle='Order Now'/>
        <AdCard btnTitle='Check it out'/>
      </div>
    </Container>
  </>
  );
}

export default HomePage;
