"use client";

import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

interface TimelineItem {
  id: number;
  year: string;
  title: string;
  company?: string;
  companyUrl?: string;
  type: "experience" | "project";
  description: string;
  technologies: string[];
  achievements?: string[];
  link?: string;
}

interface TimelineItemComponentProps {
  item: TimelineItem;
  index: number;
}

function TimelineItemComponent({ item, index }: TimelineItemComponentProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="relative w-full min-w-0"
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{ duration: 0.7, delay: isInView ? index * 0.12 : 0 }}
    >
      <motion.div
        className="w-full"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4 md:p-6 hover:border-cyan-400/40 transition-all duration-300">
          {/* Year Badge */}
          <motion.div
            className="inline-block px-2 py-1 md:px-3 md:py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-full text-cyan-300 text-xs md:text-sm font-semibold mb-3 md:mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{
              duration: 0.5,
              delay: isInView ? index * 0.2 + 0.4 : 0,
            }}
          >
            {item.year}
          </motion.div>

          {/* Type Badge */}
          <div
            className={`inline-block ml-2 px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-xs font-medium ${
              item.type === "experience"
                ? "bg-green-500/20 text-green-300 border border-green-400/30"
                : "bg-purple-500/20 text-purple-300 border border-purple-400/30"
            }`}
          >
            {item.type === "experience" ? "💼 Experience" : "🚀 Project"}
          </div>

          {/* Title and Company */}
          <h3 className="text-lg md:text-xl font-bold text-white mt-3 mb-2">
            {item.title}
          </h3>
          {item.company && (
            <Link
              href={item.companyUrl || ""}
              className="text-cyan-400 font-medium mb-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              @ {item.company}
            </Link>
          )}

          {/* Description */}
          <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4 leading-relaxed">
            {item.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {item.technologies.map((tech, techIndex) => (
              <motion.span
                key={techIndex}
                className="px-1.5 py-0.5 md:px-2 md:py-1 bg-blue-500/10 border border-blue-400/20 rounded text-xs text-blue-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{
                  duration: 0.3,
                  delay: isInView ? index * 0.2 + 0.5 + techIndex * 0.05 : 0,
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Achievements */}
          {item.achievements && (
            <div className="space-y-2">
              <h4 className="text-xs md:text-sm font-semibold text-gray-300">
                Key Achievements:
              </h4>
              <ul className="space-y-1">
                {item.achievements.map((achievement, achIndex) => (
                  <motion.li
                    key={achIndex}
                    className="text-xs md:text-sm text-gray-400 flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                    }
                    transition={{
                      duration: 0.4,
                      delay: isInView ? index * 0.2 + 0.6 + achIndex * 0.1 : 0,
                    }}
                  >
                    <span className="text-cyan-400 mr-2">▸</span>
                    {achievement}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {item.link && (
            <Link
              href={item.link}
              className="text-cyan-400 font-medium mb-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project
            </Link>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Timeline() {
  const timelineData: TimelineItem[] = [
    {
      id: 1,
      year: "June 2023 - Present",
      title: "Frontend Engineering",
      company: "Fullerton Health Group - Insurance & TPA Solutions",
      companyUrl: "https://www.fullertonhealth.com",
      type: "experience",
      description:
        "Fullerton Health Group's Insurance & TPA Solutions arm builds digital insurance and third-party administration products for regional markets",
      technologies: [
        "React",
        "TypeScript",
        "Ant Design",
        "Tailwind",
        "Zustand",
        "Zod",
        "Vite",
        "Vitest",
        "TanStack Router",
        "React Query",
        "i18next",
        "Micro Frontend",
      ],
      achievements: [
        "Built a multi-regional insurance portal (Vietnam & Singapore) with React/TypeScript; standardized UI and cut design debt ~40%.",
        "Design system on Ant Design + Storybook + theme tokens, with visual regression; ~90% component reuse across enterprise modules.",
        "Separated server cache (React Query) from client state (Zustand), trimming redundant API work and keeping the UI synchronized.",
        "TanStack Router + i18next for routing and localization; RBAC across regional markets.",
        "Code-splitting, lazy loading, and caching improved TTI by 28–35% on low-end devices.",
        "Zod + React Hook Form for API/forms; ~45% fewer validation bugs and cleaner backend handoffs.",
        "Migrated Webpack → Vite; ~30% faster builds and quicker release cycles.",
        "Vitest unit/integration tests to lock in business logic and cut production regressions.",
        "Led a 4-person frontend squad: sprint planning, code review, releases, and cross-functional coordination.",
      ],
    },
    {
      id: 2,
      year: "2022 - 2023",
      title: "Fullstack developer",
      company: "TAPTAP Digital",
      companyUrl: "https://taptap.com.vn/",
      type: "experience",
      description:
        "TAPTAP Digital — Customer Loyalty & Rewards Platform. District 1, Ho Chi Minh City.",
      technologies: [
        "React",
        "NestJS",
        "TypeScript",
        "MongoDB",
        "Redis",
        "Ant Design",
        "Tailwind",
        "Recoil",
        "Micro Frontend",
      ],
      achievements: [
        "Engineered full-stack features for a high-traffic loyalty and rewards platform utilizing React, NestJS, and MongoDB, ensuring secure and robust synchronization of user transaction data.",
        "Spearheaded the migration from a monolithic codebase to a Micro-frontend architecture utilizing Webpack Module Federation, decoupling independent teams and accelerating feature time-to-market.",
        "Architected and optimized RESTful APIs for core business logic, implementing Redis caching to reduce backend response latency and handle high-concurrency traffic during peak reward campaigns.",
        "Designed efficient MongoDB aggregation pipelines to process complex user point calculations, significantly improving data retrieval speeds for customer analytics dashboards.",
        "Standardized frontend development by building a library of reusable TypeScript and Ant Design components, drastically reducing UI code duplication across the system.",
        "Implemented Recoil for highly dynamic global state management, optimizing React re-renders for data-heavy dashboard views.",
      ],
    },
  ];

  return (
    <div className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      {/* Structured Data for Experience and Projects */}

      <div className="max-w-6xl mx-auto">
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
              Journey
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            My professional evolution through projects and experiences in the
            world of technology
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto mt-6"></div>
        </motion.div>

        {/* Timeline — single column, chronological (top → bottom) */}
        <div className="relative max-w-4xl mx-auto">
          <div
            className="absolute left-5 top-2 bottom-2 w-0.5 sm:w-1 -translate-x-1/2 bg-gradient-to-b from-cyan-500/50 to-blue-500/50 rounded-full"
            aria-hidden
          />

          {timelineData.map((item, index) => (
            <div
              key={item.id}
              className="relative pb-12 sm:pb-16 last:pb-0 pl-11 sm:pl-14"
            >
              <motion.div
                className="absolute left-5 top-8 sm:top-10 z-10 w-3 h-3 sm:w-4 sm:h-4 -translate-x-1/2 rounded-full border-2 sm:border-4 border-black bg-gradient-to-r from-cyan-500 to-blue-500"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              />
              <TimelineItemComponent item={item} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
