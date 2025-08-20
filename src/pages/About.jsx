import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CountUp from "react-countup";
import { Link } from "react-router";

const About = () => {
  const {
    data: stats = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axios.get("/about.json");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10">Error loading data</p>;

  return (
    <>
      <div className="bg-gray-300 py-20">
        <div className="px-4 ">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
              About Our Clubs
            </h2>

            <h4 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-relaxed mb-12">
              Join our club to sharpen your skills, stay fit, and enjoy friendly
              <br className="hidden md:block" /> competitions across football,
              tennis, and badminton.
            </h4>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2  lg:grid-cols-4 max-w-7xl mx-auto gap-6">
          {stats.map((item) => (
            <div
              key={item.id}
              className="bg-white  rounded-xl p-6 w-36 md:w-36 lg:w-72 mx-auto text-center 
                 shadow-md hover:shadow-2xl transform hover:-translate-y-2 
                 transition-all duration-300"
            >
              <h3 className="text-3xl md:text-4xl font-extrabold text-blue-600">
                <CountUp end={item.value} duration={3} />
              </h3>
              <p className="text-gray-600 mt-2 text-sm md:text-lg font-medium">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r  from-orange-500 vai-red-500 mt-20 px-5 text-white overflow-hidden text-center to-pink-600 md:max-w-7xl max-w-5xl p-14 mx-auto rounded-3xl">
          <h2 className="font-bold text-3xl md:text-5xl py-4">
            Ready to Join Our Clubs?
          </h2>
          <h4 className="text text-xl">
            Experience the difference at Bangladesh's most prestigious sports
            club. <br /> Your journey to excellence starts here.
          </h4>
          <button className="btn btn-primary mt-10">
            {" "}
            <Link to={"/register"}>Become a Member</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default About;
