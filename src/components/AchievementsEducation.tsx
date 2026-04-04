"use client";

import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

interface Achievement {
  id: number;
  /** Primary headline (e.g. credential or award name) */
  name: string;
  /** Category or kind, shown like institution in Education */
  kind: string;
  date: string;
  location?: string;
  description?: string;
  link?: string;
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string;
  date: string;
  description: string;
  courses?: string[];
  gpa?: string;
  link?: string;
}

export default function AchievementsEducation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const achievements: Achievement[] = [
    {
      id: 1,
      name: "IELTS 6.5",
      kind: "Certificate",
      date: "2021",
      description: "Listening: 6.5, Reading: 7.0, Writing: 6.5, Speaking: 6.0",
      link: "https://drive.google.com/file/d/1m3rz9qUZdFxPD7MYmEFx_HEqLR6824_9/view?usp=drive_link",
    },
  ];

  const education: Education[] = [
    {
      id: 1,
      degree: "Bachelor of Science in Information Technology",
      institution: "University of Science",
      location: "Ho Chi Minh City, Vietnam",
      date: "2018 - 2022",
      description:
        "Specialized in Information Technology with focus on Software Engineering.",
      link: "https://drive.google.com/file/d/1reZ42azOGlqAPzu2GRjEnvagBKlnVl_a/view?usp=drive_link",
      gpa: "3.51/4.0",
    },
  ];

  return (
    <div ref={ref} className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      {/* Structured Data for Achievements and Education */}
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Achievements & Education
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Academic background and notable accomplishments throughout my
            professional journey
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Achievements Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 flex items-center">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Achievements
              </span>
              <div className="h-px flex-grow bg-gradient-to-r from-purple-500/50 to-transparent ml-4"></div>
            </h3>

            <div className="space-y-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-5 sm:p-6 hover:border-purple-400/40 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg sm:text-xl font-bold text-white">
                      {achievement.name}
                    </h4>
                    <span className="px-2 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-300 text-xs font-semibold shrink-0 ml-2">
                      {achievement.date}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3">
                    <p className="text-purple-300 font-medium">
                      {achievement.kind}
                    </p>
                    {achievement.location && (
                      <>
                        <span className="text-gray-500">•</span>
                        <p className="text-gray-400">{achievement.location}</p>
                      </>
                    )}
                  </div>
                  {achievement.description && (
                    <p className="text-sm sm:text-base text-gray-300 mb-4">
                      {achievement.description}
                    </p>
                  )}

                  {achievement.link && (
                    <Link
                      href={achievement.link}
                      className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>View certificate</span>
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 flex items-center">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                Education
              </span>
              <div className="h-px flex-grow bg-gradient-to-r from-blue-500/50 to-transparent ml-4"></div>
            </h3>

            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  className="bg-white/5 backdrop-blur-sm border border-blue-500/20 rounded-xl p-5 sm:p-6 hover:border-blue-400/40 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg sm:text-xl font-bold text-white">
                      {edu.degree}
                    </h4>
                    <span className="px-2 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-xs font-semibold">
                      {edu.date}
                    </span>
                  </div>
                  <div className="flex items-center mb-3">
                    <p className="text-blue-300 font-medium">
                      {edu.institution}
                    </p>
                    <span className="mx-2 text-gray-500">•</span>
                    <p className="text-gray-400">{edu.location}</p>
                    {edu.gpa && (
                      <>
                        <span className="mx-2 text-gray-500">•</span>
                        <p className="text-cyan-400 font-medium">
                          GPA: {edu.gpa}
                        </p>
                      </>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-gray-300 mb-4">
                    {edu.description}
                  </p>

                  {edu.link && (
                    <Link
                      href={edu.link}
                      className="inline-flex items-center text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>View certificate</span>
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
