import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import JoinUs from './pages/JoinUs';
import Contact from './pages/Contact';
import ConfirmPayment from './pages/ConfirmPayment';
import LoginRegister from './pages/LoginRegister';
import Navbar from './components/Navbar';
import SmallNavbar from './components/SmallNavbar';
import Footer from './components/Footer';

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <SmallNavbar />
                <Navbar />

                <div>
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/login" component={LoginRegister}></Route>
                    <Route path="/joinUs" component={JoinUs}></Route>
                    <Route path="/contact" component={Contact}></Route>
                    <Route path="/confirmPayment" component={ConfirmPayment}></Route>
                </div>

                <Footer />
            </React.Fragment>
        )
    }
}

export default App;