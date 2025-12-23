import { motion } from "framer-motion";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="bg-white text-black overflow-hidden">

      {/* HERO SECTION */}
      <section className="min-h-[60vh] flex flex-col justify-center items-center px-6 md:px-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          Engineering the Future
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="max-w-2xl text-base text-gray-700"
        >
          Regium Innovations and Research Pvt. Ltd. is a forward-thinking company
          focused on innovation, engineering, and real-world impact.
        </motion.p>
      </section>

      {/* WHO WE ARE */}
      <section className="px-6 md:px-16 py-16 flex justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>

          <p className="text-gray-700 leading-relaxed mb-3">
            Founded by <strong>Mr. Piyush Kumar</strong>, Regium Innovations and
            Research Pvt. Ltd. operates at the intersection of science,
            engineering, and deployment.
          </p>

          <p className="text-gray-700 leading-relaxed">
            We collaborate with private industries, government bodies, and
            innovators to convert research into scalable and sustainable
            solutions.
          </p>
        </motion.div>
      </section>

      {/* FOCUS AREAS */}
      <section className="px-6 md:px-16 py-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-semibold mb-10"
        >
          Our Focus Areas
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-6">
          {[
            "Automobile Manufacturing",
            "Chemical Research",
            "Water Purification",
            "Research & Development",
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="
                w-57.5
                border border-black
                rounded-xl
                px-5 py-4
                text-sm
                font-medium
                hover:bg-black
                hover:text-white
                transition-all
              "
            >
              {item}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 py-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-semibold mb-3"
        >
          Creating Sustainable Impact
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-gray-700 max-w-xl mx-auto text-sm"
        >
          Partnering with industries and institutions to deliver efficient,
          sustainable solutions.
        </motion.p>
      </section>

      <Footer />
    </div>
  );
};

export default About;
