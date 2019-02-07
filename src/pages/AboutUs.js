import React from 'react';
import Breadcrumbs from './../components/Breadcrumbs';
import Faker from 'faker';
import { Link } from 'react-router-dom';

class AboutUs extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Breadcrumbs path={this.props.match.url} />
                <div className="container text-center m-5 mx-auto">
                    <h2>About us Page</h2>
                    <p>{Faker.lorem.paragraphs()}</p>
                    <img className="my-3" src={Faker.image.image()} />
                    <p>{Faker.lorem.paragraphs()}</p>
                    <p>{Faker.lorem.paragraphs()}</p>
                    <p>{Faker.lorem.paragraphs()}</p>
                    <img className="my-3" src={Faker.image.image()} />
                    <p>{Faker.lorem.paragraphs()}</p>
                    <p>{Faker.lorem.paragraphs()}</p>

                    <a href="/shop" className="btn btn-outline-primary btn-lg btn-block">SHOP NOW! <i class="fas fa-shopping-bag"></i></a>
                </div>
            </React.Fragment>
        )
    }
}


export default AboutUs;