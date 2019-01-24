import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
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
import axios from 'axios';
import Dashboard from './dashboard/Dashboard';



class App extends React.Component {

    constructor() {
        super();
        this.state = {
            cart: 0,
            data_user: "",
            files: "",
            isLoggedIn: false,
            isCheckingSession: true
        }
    }

    checkUserSession = () => {
        //di cek apakah ada sessionnya di local storage
        if (localStorage.getItem("user_session")) {
            // kalau ada di local storage, di cek apakah sessionnya ada di table session
            axios.post("http://localhost:3007/session", {
                user_session: localStorage.getItem("user_session")
            }).then((x) => {
                // kalau ada sessionnya di table session, kita minta data user yg login
                axios.get(`http://localhost:3007/users/${x.data[0].id_user}`).then((y) => {
                    // dan kita kasi data2 user yg mau dipakai
                    //buat object sementara
                    let data_user = {
                        id: y.data[0].id,
                        name: y.data[0].name,
                        username: y.data[0].username,
                        profpict: y.data[0].profpict,
                        role: y.data[0].role
                    };
                    // dikasi ke state objectnya
                    this.setState({
                        isLoggedIn: true,
                        data_user: data_user,
                        files: "",
                        isCheckingSession: false
                    });
                });
            });
        }
        // kalau session gaada di local storage, lsg login
        else {
            console.log("Silakan login!");
            this.setState({
                isCheckingSession: false
            })
        }
    }

    componentDidMount() {
        this.checkUserSession();
    }

    // ini nanti kalau user login/register, buat ambil user datanya dari component LoginRegister, terus di pass ke Navbar
    getUserData = (x) => {
        this.setState({
            data_user: x
        });
    }

    getCart = (x) => {
        this.setState({
            cart: x
        });
    }

    render() {
        return (
            <React.Fragment>
                <SmallNavbar />
                <Navbar cart={this.state.cart} data_user={this.state.data_user} isCheckingSession={this.state.isCheckingSession} />

                <div>
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/dashboard" component={Dashboard}></Route>

                    {/* kalau user ke login, dia gaakan bisa ke /login, akan ke direct ke Home; kalau ga login, bisa */}
                    {this.state.isLoggedIn ? this.state.data_user.role == "Admin" ?
                        <Redirect to={{
                            pathname: '/dashboard',
                            role: this.state.data_user.role
                        }}
                        />
                        :
                        <Route path="/login" component={Home}></Route>
                        :
                        <Route
                            path='/login'
                            render={(props) => <LoginRegister {...props} onLoginClick={this.getUserData} checkUserSession={this.checkUserSession} />}
                        />
                    }

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


            </React.Fragment >
        )
    }
}

export default App;