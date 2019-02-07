import React from 'react'
import { Accordion, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Faker from 'faker';

class TesAccordion extends React.Component {

    state = { activeIndex: 0 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render() {
        const { activeIndex } = this.state

        return (
            <div className="container p-3 my-5">
                <h2 className="text-center my-3">Frequently Asked Questions</h2>
                <Accordion fluid styled className="my-5">
                    <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                        <Icon name='dropdown' />
                        Apakah itu Van & Co?
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <p>
                            {Faker.lorem.paragraphs()}Van & Co adalah e-commerce penjual jam tangan nomer satu di Indonesia dengan lebih dari 3000 cabang offline serta penjualan lebih dari 500 items per hari.
                        </p>
                        <p>
                            {Faker.lorem.paragraphs()}Van & Co adalah e-commerce penjual jam tangan nomer satu di Indonesia dengan lebih dari 3000 cabang offline serta penjualan lebih dari 500 items per hari.
                        </p>
                        <p>
                            {Faker.lorem.paragraphs()}Van & Co adalah e-commerce penjual jam tangan nomer satu di Indonesia dengan lebih dari 3000 cabang offline serta penjualan lebih dari 500 items per hari.
                        </p>
                    </Accordion.Content>

                    <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                        <Icon name='dropdown' />
                        Apakah semua produk di website ini ready stock?
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        <p>
                            {Faker.lorem.paragraphs()}Ya, semua produk di website ini ready stock kecuali yang berlabel sold out.
                        </p>
                    </Accordion.Content>

                    <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
                        <Icon name='dropdown' />
                        Dimana saja cabang toko Van & Co?
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2}>
                        <p>
                            {Faker.lorem.paragraphs()}Silakan buka halaman <Link to="/stores"><a href="">Our Stores</a></Link> untuk informasi seluruh offline store kami.
                        </p>
                    </Accordion.Content>

                    <Accordion.Title active={activeIndex === 3} index={3} onClick={this.handleClick}>
                        <Icon name='dropdown' />
                        Apakah Van & Co terpercaya?
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 3}>
                        <p>
                            {Faker.lorem.paragraphs()}
                        </p>
                    </Accordion.Content>
                </Accordion>
            </div>
        )
    }
}
export default TesAccordion;