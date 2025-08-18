import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={3000} // change slide every 3 seconds
        showThumbs={false} // hide thumbnails
        showStatus={false} // hide slide counter (e.g., 1/3)
        showArrows={false} // hide navigation arrows
        showIndicators={true} // show dots below
        stopOnHover={false} // keep sliding even when hovered
        swipeable={true} // allow swipe on mobile
        emulateTouch={true} // allow swipe on desktop touchscreens
      >
        <div>
          <img
            src="https://i.ibb.co/xtzvm3z9/muktasim-azlan-p-Pf-OLOK0oe-I-unsplash-1.jpg"
            alt="Legend 1"
          />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img
            src="https://i.ibb.co/vxxmYgjW/joppe-spaa-Ts-Yzva0e2p-Q-unsplash-1.jpg"
            alt="Legend 2"
          />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <img
            src="https://i.ibb.co/Hp7N3qgX/moises-alex-Wq-I-Pb-Yugn4-unsplash-1.jpg"
            alt="Legend 3"
          />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
