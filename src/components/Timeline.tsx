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
  isLeft: boolean;
}

function TimelineItemComponent({
  item,
  index,
  isLeft,
}: TimelineItemComponentProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={`relative flex items-center mb-16 ${
        isLeft ? "justify-start" : "justify-end"
      }`}
      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
      animate={
        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -100 : 100 }
      }
      transition={{ duration: 0.8, delay: isInView ? index * 0.2 : 0 }}
    >
      {/* Timeline Node */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full border-4 border-black z-10"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: isInView ? index * 0.2 + 0.3 : 0 }}
      />

      {/* Content Card */}
      <motion.div
        className={`w-5/12 ${isLeft ? "mr-auto pr-8" : "ml-auto pl-8"}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/40 transition-all duration-300">
          {/* Year Badge */}
          <motion.div
            className="inline-block px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-full text-cyan-300 text-sm font-semibold mb-4"
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
            className={`inline-block ml-2 px-2 py-1 rounded-full text-xs font-medium ${
              item.type === "experience"
                ? "bg-green-500/20 text-green-300 border border-green-400/30"
                : "bg-purple-500/20 text-purple-300 border border-purple-400/30"
            }`}
          >
            {item.type === "experience" ? "💼 Experience" : "🚀 Project"}
          </div>

          {/* Title and Company */}
          <h3 className="text-xl font-bold text-white mt-3 mb-2">
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
          <p className="text-gray-300 mb-4 leading-relaxed">
            {item.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {item.technologies.map((tech, techIndex) => (
              <motion.span
                key={tech}
                className="px-2 py-1 bg-blue-500/10 border border-blue-400/20 rounded text-xs text-blue-300"
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
              <h4 className="text-sm font-semibold text-gray-300">
                Key Achievements:
              </h4>
              <ul className="space-y-1">
                {item.achievements.map((achievement, achIndex) => (
                  <motion.li
                    key={achIndex}
                    className="text-sm text-gray-400 flex items-start"
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
      year: "2023 - Current",
      title: "Frontend Engineer",
      company: "Fullerton Health Vietnam",
      companyUrl: "https://www.linkedin.com/company/fullerton-health/",
      type: "experience",
      description:
        "Developing and maintaining web applications using modern frontend technologies, focusing on user experience and performance.",
      technologies: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Shadcn UI",
        "Zustand",
        "React Query",
        "Storybook",
        "Tanstack Router",
        "React Query",
      ],
      achievements: [
        "Developed and maintained web applications using modern frontend technologies, focusing on user experience and performance.",
        "Built a scalable and maintainable Frontend architecture for a large-scale web application.",
        "Implemented a robust testing strategy to ensure the reliability and maintainability of the codebase.",
        "Collaborated with cross-functional teams to deliver high-quality software solutions.",
        "Optimized frontend performance to improve user experience and reduce load times.",
        "Built design system with storybook",
      ],
    },
    {
      id: 2,
      year: "2021-2022",
      title: "Junior Frontend Developer",
      company: "TAPTAP",
      companyUrl: "https://www.linkedin.com/company/taptapvn/",
      type: "experience",
      description:
        "Started career in frontend development, working on various client projects and learning modern web technologies.",
      technologies: ["HTML5", "CSS3", "JavaScript", "jQuery", "Bootstrap"],
      achievements: [
        "Delivered 20+ client projects",
        "Mastered responsive design principles",
        "Learned React and modern JS frameworks",
      ],
    },
    {
      id: 3,
      year: "2025",
      title: "AI-Powered Portfolio Platform",
      type: "project",
      description:
        "Built an intelligent portfolio platform using Next.js 15, integrating OpenAI APIs for dynamic content generation and user interaction.",
      technologies: ["Python", "OpenAI API", "Hugging Face", "Sendgrid"],
      achievements: [
        "Designed and developed a cutting-edge interactive digital portfolio (using Next.js and Framer Motion) that seamlessly integrates an AI-powered chatbot to provide dynamic, on-demand information",
        "Engineered the backend using Python and OpenAI API, enabling the chatbot to intelligently interpret user questions and extract relevant details directly from my linked PDF portfolio",
        "Implemented robust PDF parsing and data retrieval mechanisms to ensure the chatbot accurately answers queries based on my portfolio's content",
        "Integrated Pushover notifications to receive instant email alerts when users initiate contact through the chatbot, facilitating prompt follow-up",
        "Utilized Framer Motion to create a highly engaging and fluid user experience, enhancing the visual appeal and interactivity of the portfolio itself",
      ],
      link: "https://github.com/pntdai/portfolio",
    },
  ];

  return (
    <div className="min-h-screen py-20 px-6 lg:px-8">
      {/* Structured Data for Experience and Projects */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Dai Phan Professional Experience",
            description:
              "Professional timeline showcasing projects and work experience",
            itemListElement: timelineData.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type":
                  item.type === "experience"
                    ? "WorkExperience"
                    : "CreativeWork",
                name: item.title,
                description: item.description,
                dateCreated: item.year,
                ...(item.company && {
                  worksFor: { "@type": "Organization", name: item.company },
                }),
                keywords: item.technologies.join(", "),
                ...(item.achievements && { award: item.achievements }),
              },
            })),
          }),
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            My professional evolution through projects and experiences in the
            world of technology
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto mt-6"></div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-500/50 to-blue-500/50 rounded-full"></div>

          {timelineData.map((item, index) => (
            <TimelineItemComponent
              key={item.id}
              item={item}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
