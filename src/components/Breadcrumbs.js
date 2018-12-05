import React from 'react';

class Breadcrumbs extends React.Component {
    render() {
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Join Us</li>
                </ol>
            </nav>
        )
    }
}

export default Breadcrumbs;