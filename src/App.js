import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import JoinUs from './pages/JoinUs';
import FAQ from './pages/FAQ';
import ProductList from './pages/ProductList';
import Contact from './pages/Contact';
import ConfirmPayment from './pages/ConfirmPayment';
import LoginRegister from './pages/LoginRegister';
import Navbar from './components/Navbar';
import BackToTop from './components/BackToTop';
import SmallNavbar from './components/SmallNavbar';
import Footer from './components/Footer';
import ProductDetails from './pages/ProductDetails';
import AboutUs from './pages/AboutUs';



class App extends React.Component {

    constructor() {
        super();
        this.state = {
            cart: 0
        }
    }

    getCart = (x) => {
        this.setState({
            cart: x
        })
    }

    render() {
        return (
            <React.Fragment>
                <SmallNavbar />
                <Navbar cart={this.state.cart} />

                <div>
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/login" component={LoginRegister}></Route>
                    <Route
                        path='/productList'
                        render={(props) => <ProductList {...props} onCartClick={this.getCart} />}
                    />
                    <Route path="/joinUs" component={JoinUs}></Route>
                    <Route path="/contact" component={Contact}></Route>
                    <Route path="/confirmPayment" component={ConfirmPayment}></Route>
                    <Route path="/faq" component={FAQ}></Route>
                    <Route path="/productDetails" component={ProductDetails}></Route>
                    <Route path="/aboutUs" component={AboutUs}></Route>
                </div>

                <Footer />
                <BackToTop />


            </React.Fragment>
        )
    }
}

export default App;