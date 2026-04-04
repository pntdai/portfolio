"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

/** First calendar day of professional work (set month 0–11, day if you want exact tenure). */
const FRONTEND_CAREER_START = new Date(2022, 0, 1);

function getYearsSinceStart(start: Date): number {
  const elapsed = Date.now() - start.getTime();
  const msPerYear = 1000 * 60 * 60 * 24 * 365.25;
  return Math.max(0, elapsed / msPerYear);
}

/** e.g. 4.3 → "4+" for display */
function formatYearsPlusLabel(start: Date): string {
  return `${Math.floor(getYearsSinceStart(start))}+`;
}

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const frontendYearsLabel = `${formatYearsPlusLabel(FRONTEND_CAREER_START)} years`;

  const skills = [
    "React",
    "Zustand",
    "React Query",
    "React Hook Form",
    "i18next",
    "Socket.io",
    "Storybook",
    "Zod",
    "Ant Design",
    "Chart.js",
    "Recharts",
    "Next.js",
    "TypeScript",
    "Shadcn UI",
    "GraphQL",
    "Tailwind CSS",
    "Apollo Client",
    "Vercel AI SDK",
    "Langchain",
    "RAG",
    "Prompting",
    "OpenAI API",
    "MCP",
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 lg:px-8 relative pt-16 sm:pt-20">
      {/* Structured Data for Skills and Profile */}

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Professional Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Main Title */}
              <motion.h1
                className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Dai Phan
                </span>
              </motion.h1>
              <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-6"></div>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white">
                Frontend Engineer
              </h2>
              <div className="text-base sm:text-lg text-gray-300 space-y-3">
                <p className="flex items-center flex-wrap">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                  <span className="text-cyan-400 font-semibold">
                    {frontendYearsLabel}
                  </span>
                  <span className="ml-2">Frontend Development Experience</span>
                </p>
                <p className="flex items-center flex-wrap">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <span className="text-blue-400 font-semibold">6 months</span>
                  <span className="ml-2">Self-taught AI & Agentic Systems</span>
                </p>
              </div>
            </motion.div>

            <motion.p
              className="text-base sm:text-lg text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Frontend Engineer with {frontendYearsLabel} of experience building
              scalable, high-performance web applications using React, Next.js,
              and TypeScript. Skilled in micro-frontend architecture, design
              systems, and performance optimization. Experienced in developing
              AI-powered web applications and integrating AI solutions to
              deliver intelligent, user-centric experiences.
            </motion.p>

            {/* Skills */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <h3 className="text-xl font-semibold text-white">
                Core Technologies
              </h3>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {skills.map((skill) => (
                  <motion.div
                    key={skill}
                    className="block cursor-pointer px-3 py-1  sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm border border-cyan-500/30 rounded-full text-xs sm:text-sm font-medium text-cyan-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(34, 211, 238, 0.1)",
                    }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Creative Visual */}
          <motion.div
            className="relative h-64 sm:h-96 lg:h-[600px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Central Tech Visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="relative"
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-48 h-48 sm:w-64 sm:h-64 border-2 border-cyan-500/30 rounded-full relative">
                  <div className="absolute inset-4 border border-blue-500/20 rounded-full">
                    <div className="absolute inset-4 border border-purple-500/20 rounded-full">
                      <div className="w-full h-full flex items-center justify-center">
                        <motion.div
                          className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <span className="text-white font-bold text-lg sm:text-xl">
                            AI
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {["⚛️", "🚀", "🤖", "💻"].map((icon, index) => (
                    <motion.div
                      key={index}
                      className="absolute w-8 h-8 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-base sm:text-xl"
                      style={{
                        top: "50%",
                        left: "50%",
                        marginTop: window.innerWidth < 640 ? "-16px" : "-24px",
                        marginLeft: window.innerWidth < 640 ? "-16px" : "-24px",
                      }}
                      animate={{
                        rotate: 360,
                        x:
                          Math.cos(index * (Math.PI / 2)) *
                          (window.innerWidth < 640 ? 80 : 120),
                        y:
                          Math.sin(index * (Math.PI / 2)) *
                          (window.innerWidth < 640 ? 80 : 120),
                      }}
                      transition={{
                        duration: 10 + index * 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      {icon}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Code Snippet Overlay */}
            <motion.div
              className="absolute bottom-0 right-0 bg-black/40 backdrop-blur-sm p-2 sm:p-4 rounded-lg border border-cyan-500/30 hidden sm:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <div className="text-xs font-mono text-green-400">
                <div className="text-cyan-400">const engineer = {`{`}</div>
                <div className="ml-2 text-white">
                  Frontend Engineering:{" "}
                  <span className="text-yellow-400">
                    &quot;{formatYearsPlusLabel(FRONTEND_CAREER_START)}{" "}
                    years&quot;
                  </span>
                  ,
                </div>
                <div className="ml-2 text-white">
                  Self-taught AI:{" "}
                  <span className="text-yellow-400">&quot;6 months&quot;</span>,
                </div>
                <div className="ml-2 text-white">
                  Passion:{" "}
                  <span className="text-yellow-400">&quot;∞&quot;</span>
                </div>
                <div className="text-cyan-400">{`}`}</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
          >
            <motion.div
              className="flex flex-col items-center space-y-2 cursor-pointer group"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                });
              }}
            >
              <span className="text-gray-400 text-sm font-medium tracking-wider group-hover:text-cyan-400 transition-colors">
                SCROLL DOWN
              </span>
              <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full relative group-hover:border-cyan-400 transition-colors">
                <motion.div
                  className="w-1 h-3 bg-cyan-400 rounded-full absolute left-1/2 top-2 transform -translate-x-1/2"
                  animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
