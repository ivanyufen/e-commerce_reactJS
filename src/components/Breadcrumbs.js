import React from 'react';
import { Link } from 'react-router-dom';

class Breadcrumbs extends React.Component {
    constructor() {
        super();
        this.state = {
            path: ""
        }
    }

    componentDidMount() {
        // FUNGSI UNTUK MENGEDIT BREADCRUMBS SUPAYA GAADA "/" DI DEPANNYA
        var initialPath = this.props.path;
        var noSlash = initialPath.slice(1, (initialPath.length));
        var makeCapital = noSlash.charAt(0).toUpperCase()
        var combine = makeCapital + noSlash.slice(1)
        this.setState({ path: combine })
    }

    render() {
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb" style={{ justifyContent: "center" }}>
                    <li className="breadcrumb-item"><Link to="/"><a href="" href="">Home</a></Link></li>
                    {/* <li className="breadcrumb-item active" aria-current="page">{this.props.path}</li> */}
                    <li className="breadcrumb-item active" aria-current="page">{this.state.path}</li>
                </ol>
            </nav>
        )
    }
}

export default Breadcrumbs;