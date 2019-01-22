import React from 'react';

class Banner extends React.Component {
    render() {
        return (
            <div id="carouselExampleIndicators" class="carousel slide carousel-fade" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="./img/banner/banner1.jpg" alt="" />
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="./img/banner/banner2.jpg" alt="" />
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="./img/banner/banner3.jpg" alt="" />
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="./img/banner/banner4.jpg" alt="" />
                    </div>
                </div>
                <a href="" class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a href="" class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>

        )
    }
}

export default Banner;