import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="relative w-full">
      <Carousel
        autoPlay
        infiniteLoop
        interval={3000}
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
      >
        {/* Slide 1 */}
        <div className="relative w-full">
          <img
            className="w-full h-[60vh] md:h-[80vh] lg:h-[90vh] object-cover"
            src="https://i.ibb.co/vxxmYgjW/joppe-spaa-Ts-Yzva0e2p-Q-unsplash-1.jpg"
            alt="Football Slide"
          />
          <div className="absolute inset-0 flex flex-col justify-end md:justify-center items-center text-center text-white bg-gradient-to-t from-black/80 via-black/30 to-black/80 p-4 md:p-8 lg:p-12 py-20">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
              Score Big with Every Goal
            </h2>
            <p className="max-w-md md:max-w-lg lg:max-w-xl mb-6 md:text-lg lg:text-xl">
              Experience the thrill of football like never before. Join the game
              and chase your passion on the field.
            </p>
            <Link
              to={"/all-Courts"}
              className="btn btn-secondary px-6 py-3 text-sm md:text-base"
            >
              Discover Courts
            </Link>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative w-full">
          <img
            className="w-full h-[60vh] md:h-[80vh] lg:h-[90vh] object-cover"
            src="https://i.ibb.co/xtzvm3z9/muktasim-azlan-p-Pf-OLOK0oe-I-unsplash-1.jpg"
            alt="Tennis Slide"
          />
          <div className="absolute inset-0 flex flex-col justify-end md:justify-center items-center text-center text-white bg-gradient-to-t from-black/80 via-black/30 to-black/80 p-4 md:p-8 lg:p-12 py-20">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
              Serve Your Way to Victory
            </h2>
            <p className="max-w-md md:max-w-lg lg:max-w-xl mb-6 md:text-lg lg:text-xl">
              Swing, hit, and dominate the court. Elevate your tennis skills
              with every match.
            </p>
            <Link
              to={"/all-Courts"}
              className="btn btn-secondary px-6 py-3 text-sm md:text-base"
            >
              Discover Courts
            </Link>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative w-full">
          <img
            className="w-full h-[60vh] md:h-[80vh] lg:h-[90vh] object-cover"
            src="https://i.ibb.co/Hp7N3qgX/moises-alex-Wq-I-Pb-Yugn4-unsplash-1.jpg"
            alt="Badminton Slide"
          />
          <div className="absolute inset-0 flex flex-col justify-end md:justify-center items-center text-center text-white bg-gradient-to-t from-black/80 via-black/30 to-black/80 p-4 md:p-8 lg:p-12 py-20">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
              Smash Your Limits
            </h2>
            <p className="max-w-md md:max-w-lg lg:max-w-xl mb-6 md:text-lg lg:text-xl">
              Fast-paced action, agility, and fun await. Take your badminton
              game to new heights.
            </p>
            <Link
              to={"/all-Courts"}
              className="btn btn-secondary px-6 py-3 text-sm md:text-base"
            >
              Discover Courts
            </Link>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
