import React from "react";
import pic from "../assets/pic.jpg";
import car from "../assets/car.webp";
import waste from "../assets/waste.jpg";
import chemical from "../assets/chemical.jpg";
import health from "../assets/Health-Innovation--800x338.jpeg";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <main className="bg-white text-black">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-24 text-center overflow-hidden">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
          <span className="block slide-left">Regium Innovations</span>

          <span className="block font-light slide-right mt-1">
            and Research Pvt. Ltd.
          </span>
        </h1>

        <p className="mt-6 max-w-3xl mx-auto text-gray-700 text-lg leading-relaxed">
          A forward-thinking private limited company dedicated to driving
          transformative change through innovation, science, and future-ready
          technologies.
        </p>
      </section>

      {/* FOUNDER */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14 items-center">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={pic} // replace with actual image
            alt="Founder - Piyush Kumar"
            className="w-72 h-72 object-cover rounded-xl grayscale"
          />
        </div>

        {/* Content */}
        <div>
          <h2 className="text-3xl font-semibold">
            Founder <span className="font-light">Mr. Piyush Kumar</span>
          </h2>

          <p className="mt-5 text-gray-700 leading-relaxed">
            Regium Innovations thrives on creativity, science, and a relentless
            pursuit of excellence. Our work is grounded in solving real-world
            problems through rigorous research, seamless collaboration, and
            scalable innovation.
          </p>

          <p className="mt-4 text-gray-700 leading-relaxed">
            From intelligent automotive systems to eco-friendly water
            purification and advanced chemical research, Regium stands at the
            intersection of science and practical application.
          </p>
        </div>
      </section>
      {/* FOCUS AREAS */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center">
            Our Focused Areas
          </h2>

          <div className="mt-16 grid md:grid-cols-2 gap-10">
            {[
              {
                title: "Automobile Modification & Manufacturing",
                desc: "Customized vehicle solutions with intelligent systems and performance engineering.",
                img: car,
              },
              {
                title: "Chemical Production & Research",
                desc: "From laboratory formulations to commercial-scale production — quality and safety prioritized.",
                img: chemical,
              },
              {
                title: "Water Purification & Packaging",
                desc: "Clean water access through scalable, tech-based purification and sustainable packaging.",
                img: waste,
              },
              {
                title: "Research & Development Services",
                desc: "Tailored R&D partnerships for government, private, and individual innovators.",
                img: health,
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-6 items-start">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg "
                />

                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-gray-700 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  );
};

export default Home;
