"use client";

import { motion } from "framer-motion";
import JobsCard from "./JobsCard";


const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const SmartJobs = () => {
  return (
    <div className="py-25">
      <div>
        <motion.div
          className="flex items-center justify-center gap-2 mb-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          <span className="w-1.5 h-1.5 rounded-sm bg-violet-500 inline-block" />
          <span className="text-violet-400 text-[11px] font-medium tracking-widest uppercase">
            SMART JOB DISCOVERY
          </span>
          <span className="w-1.5 h-1.5 rounded-sm bg-violet-500 inline-block" />
        </motion.div>

        <motion.h2
          className="text-white text-4xl md:text-5xl font-bold text-center leading-tight "
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          {`The roles you'd never`}
          <br />
          find by searching
        </motion.h2>
      </div>

      <div className="container mx-auto mt-20">
        {/* <JobsCard/> */}
      </div>
    </div>
  );
};

export default SmartJobs;
