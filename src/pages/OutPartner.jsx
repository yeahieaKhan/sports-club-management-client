import React from "react";
import Marquee from "react-fast-marquee";

// Import all images
import Client1 from "../assets/1.jpg";
import Client2 from "../assets/2.jpg";
import Client3 from "../assets/5.jpg";
import Client4 from "../assets/4.jpg";
import Client7 from "../assets/7.jpg";
import Client8 from "../assets/8.jpg";
import Client9 from "../assets/9.jpg";
import Client10 from "../assets/10.jpg";

const OutPartner = () => {
  const clients = [
    Client1,
    Client2,
    Client3,
    Client4,
    Client7,
    Client8,
    Client9,
    Client10,
  ];

  return (
    <div className="bg-white py-20">
      <h2 className="text-center text-3xl md:text-4xl font-extrabold mb-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Our Partners
      </h2>
      <Marquee gradient={false} speed={50} pauseOnHover={true}>
        {clients.map((logo, index) => (
          <div key={index} className="mx-8 flex items-center">
            <img
              src={logo}
              alt={`Client ${index + 1}`}
              className="h-20 md:h-40  w-auto object-contain"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default OutPartner;
