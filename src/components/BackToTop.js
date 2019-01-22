import React from 'react';
import ScrollTop from 'react-scrolltop-button';

class BackToTop extends React.Component {
    render() {
        return (
            <React.Fragment>
                <ScrollTop
                    text="back to top"
                    distance={100}
                    breakpoint={768}
                    style={{ backgroundColor: "#598bdb", color: "#fff", position: "fixed", bottom: "3rem", right: "3rem", border: "none", padding: "10px" }}
                    className="scroll-your-role btn-primary"
                    speed={350}
                    target={0}
                />
            </React.Fragment>
        )
    }
}

export default BackToTop;