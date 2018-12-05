import React from 'react';
import Banner from './../components/Banner';
import SocialFeed from './../components/SocialFeed';
import NewsLetter from '../components/NewsLetter';

class Home extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Banner />
                <SocialFeed />
                <NewsLetter />
            </React.Fragment>
        )
    }
}

export default Home;