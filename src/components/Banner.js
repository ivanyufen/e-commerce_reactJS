import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

class Banner extends React.Component {
    render() {
        const items = [
            {
                src: './img/banner/banner1.jpg',
                id: 1,
                // altText: 'Slide 1'
            },
            {
                src: './img/banner/banner2.jpg',
                id: 2,
                altText: 'Slide 2'
            },
            {
                src: './img/banner/banner3.jpg',
                id: 3,
                altText: 'Slide 3'
            }
        ];

        return (
            <React.Fragment>
                <UncontrolledCarousel items={items} />
            </React.Fragment>

        )
    }
}

export default Banner;