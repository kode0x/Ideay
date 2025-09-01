import { explain } from "../constants/Explaination";
import { motion } from "framer-motion";
import { Search, TrendingUp, Lightbulb, ArrowRight, Play } from "lucide-react";

const stepIcons = [Search, TrendingUp, Lightbulb];

function Explain() {
  return (
    <section className="py-20 px-4 bg-zinc-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/3 via-transparent to-pink-500/3"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500/20 to-pink-500/20 border border-rose-500/30 text-rose-400 px-6 py-3 rounded-full text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <Play className="w-4 h-4" />
            <span>Simple & Effective</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
          >
            How It{" "}
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              Works
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-zinc-400 max-w-4xl mx-auto leading-relaxed"
          >
            Our streamlined process makes discovering profitable SaaS ideas
            effortless. Just three simple steps to unlock your next business
            opportunity.
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {explain.map((item, index) => {
            const IconComponent = stepIcons[index] || Lightbulb;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                {/* Step Number Badge */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl z-20 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-rose-500/25">
                  {item.id}
                </div>

                {/* Card */}
                <div className="relative bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 border border-zinc-700/50 rounded-3xl p-8 pt-16 text-center transition-all duration-500 hover:border-rose-500/50 hover:shadow-2xl hover:shadow-rose-500/20 hover:bg-gradient-to-br hover:from-zinc-800/90 hover:to-zinc-700/90">
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Icon */}
                  <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-zinc-800 to-zinc-700 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-zinc-700 group-hover:to-zinc-600 transition-all duration-500 shadow-lg">
                    <IconComponent className="w-12 h-12 text-rose-500 group-hover:text-rose-400 transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-rose-400 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-zinc-300 leading-relaxed text-base">
                      {item.para}
                    </p>
                  </div>

                  {/* Hover effect line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-pink-500 rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>

                {/* Arrow between steps (except last) */}
                {index < explain.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 text-rose-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-10 h-10" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Process Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 border border-zinc-700/50 rounded-3xl p-12 backdrop-blur-sm"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              The Complete Workflow
            </h3>
            <p className="text-zinc-400 text-lg">
              From discovery to execution, we've got you covered
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                number: "1",
                title: "Data Collection",
                description: "Scan Reddit communities",
              },
              {
                number: "2",
                title: "AI Analysis",
                description: "Process & filter content",
              },
              {
                number: "3",
                title: "Trend Detection",
                description: "Identify opportunities",
              },
              {
                number: "4",
                title: "Idea Generation",
                description: "Surface actionable insights",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-rose-500/30 group-hover:to-pink-500/30 transition-all duration-300 border border-rose-500/20">
                  <span className="text-rose-400 font-bold text-xl">
                    {step.number}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-rose-400 transition-colors duration-300">
                  {step.title}
                </h4>
                <p className="text-zinc-400 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Explain;
