import React from 'react'
import { Accordion, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
                <Accordion fluid styled>
                    <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                        <Icon name='dropdown' />
                        Apakah itu Van & Co?
        </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <p>
                            Van & Co adalah e-commerce penjual jam tangan nomer satu di Indonesia dengan lebih dari 3000 cabang offline serta penjualan lebih dari 500 items per hari.
          </p>
                    </Accordion.Content>

                    <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                        <Icon name='dropdown' />
                        Apakah semua produk di website ini ready stock?
        </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        <p>
                            Ya, semua produk di website ini ready stock kecuali yang berlabel sold out.
          </p>
                    </Accordion.Content>

                    <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
                        <Icon name='dropdown' />
                        Dimana saja cabang toko Van & Co?
        </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2}>
                        <p>
                            Silakan buka halaman <Link to="/stores"><a href="">Our Stores</a></Link> untuk informasi seluruh offline store kami.
          </p>
                    </Accordion.Content>
                </Accordion>
            </div>
        )
    }
}
export default TesAccordion;