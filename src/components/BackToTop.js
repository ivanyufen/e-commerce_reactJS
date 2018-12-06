import React from 'react';

class BackToTop extends React.Component {

    backToTop = () => {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <React.Fragment>
                <button type="button" className="btn btn-primary" id="backToTop" style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px"
                }} onClick={this.backToTop}>Back to top!</button>
            </React.Fragment>
        )
    }
}

export default BackToTop;