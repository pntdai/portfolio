"use client";

import emailjs from "@emailjs/browser";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const myEmail = process.env.NEXT_PUBLIC_MY_EMAIL!;
  const myPhone = process.env.NEXT_PUBLIC_MY_PHONE!;
  const myEmailJsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
  const myEmailJsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
  const myEmailJsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(myEmailJsPublicKey);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await emailjs.send(
        myEmailJsServiceId,
        myEmailJsTemplateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: myEmail,
        },
      );

      console.log("Email sent successfully:", result);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: myEmail,
      href: `mailto:${myEmail}`,
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: myPhone,
      href: `tel:${myPhone}`,
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: "Ho Chi Minh City, Vietnam",
    },
  ];

  return (
    <div ref={ref} className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let&apos;s discuss how we can
            work together to create something amazing.
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto mt-6"></div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-8"
        >
          {/* Contact Details */}
          <div className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
              Contact Information
            </h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  className="flex items-center space-x-4 text-gray-300 hover:text-cyan-400 transition-colors group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-lg flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-400">
                      {info.label}
                    </p>
                    <p className="text-base sm:text-lg font-semibold">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
