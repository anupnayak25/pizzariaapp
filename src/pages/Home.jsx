import React from "react";

import ingredients from "../assets/ingredients.png";
import chef from "../assets/chef.png";
import timer from "../assets/timer.png";

function Home() {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto bg-white shadow p-10">
          <h2 className="text-5xl font-light text-center mb-10">Our Story</h2>

          <div className="space-y-5 text-gray-700 leading-7 text-justify">
            <p>
              We believe in good food. We launched Fresh Pan Pizza Best Excuse
              Awards on our Facebook fan page. Fans were given situations where
              they had to come up with wacky and fun excuses.
            </p>
            <p>
              Ever since we launched the Tastiest Pan Pizza, people have not
              been able to resist the softest, cheesiest, crunchiest and
              butteriest pizza. They have been leaving the stage in the middle
              of performances just to grab another slice.
            </p>
            <p>
              We launched Fresh Pan Pizza Best Excuse Awards on our Facebook
              page where the winner received the Best Excuse Badge and vouchers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 mt-12 items-center">
            <img
              src={ingredients}
              alt="Ingredients"
              className="rounded shadow-lg w-full h-80 object-cover"
            />

            <div>
              <h3 className="text-4xl font-light mb-5">Ingredients</h3>

              <p className="text-gray-700 leading-8 text-justify">
                We're ruthless about goodness. We have no qualms about tearing
                up a day-old lettuce leaf or steaming a baby carrot. Steam.
                Stir. Chop. Cut. It makes the kitchen a better place.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 mt-16 items-center">
            <div>
              <h3 className="text-4xl font-light mb-5">Our Chefs</h3>

              <p className="text-gray-700 leading-8 text-justify">
                They make sauces sing and salads dance. They create magic with
                skill, knowledge and passion. They make goodness so good it
                doesn't know what to do with itself. We send it to you.
              </p>
            </div>

            <img
              src={chef}
              alt="Chef"
              className="rounded shadow-lg w-full h-80 object-cover"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-10 mt-16 items-center">
            <img
              src={timer}
              alt="Delivery"
              className="rounded shadow-lg w-full h-80 object-cover"
            />
            <div>
              <h3 className="text-4xl font-light">45 min delivery</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
