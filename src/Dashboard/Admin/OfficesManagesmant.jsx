import React, { useState } from "react";
import { motion } from "framer-motion";

// Frontend-only data (replace with your real data/images)
const MEMBERS = [
  {
    id: 1,
    name: "Professor Dr. Dipok Kumar Sunyal",
    title: "Chairman",
    description:
      "Leads day-to-day operations, coordinates teams, and ensures smooth office workflows.",
    image:
      "https://res.cloudinary.com/dc7pvezza/image/upload/v1756187568/holylabhospital/o0mq2vsdoptgb24xujwc.jpg",
  },
  {
    id: 2,
    name: "Hamidul Islam",
    title: "CEO",
    description:
      "Handles recruitment, onboarding, and employee relations with a people-first mindset.",
    image:
      "https://res.cloudinary.com/dc7pvezza/image/upload/v1756187078/holylabhospital/ihkzlvs4vwxprto19ive.jpg",
  },
  {
    id: 3,
    name: "Md Shahin Bhuiyan",
    title: "Director",
    description:
      "Manages budgets, payments, and financial reporting with accuracy and transparency.",
    image:
      "https://res.cloudinary.com/dc7pvezza/image/upload/v1756187435/holylabhospital/ohzwvdxyi2kh3rbba0ut.jpg",
  },
  {
    id: 4,
    name: "Md Azizul Islam",
    title: "Director",
    description:
      "Greets visitors, manages calls, and keeps schedules organized for the whole office.",
    image:
      "https://images.unsplash.com/photo-1541216970279-affbfdd55aa1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Khaled Saifullah Shamim",
    title: "Generl Manager (GM)",
    description:
      "Solves tech issues, maintains devices, and secures the office network & tools.",
    image:
      "https://res.cloudinary.com/dc7pvezza/image/upload/v1755927797/holylabhospital/waizzlbk71hhtcvgfjs2.jpg",
  },
];

const Card = ({ member, isExpanded, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35 }}
      className={`group relative flex flex-col rounded-2xl bg-gradient-to-br from-white to-gray-50 p-4 shadow-sm ring-1 ring-gray-200/50 transition-all duration-300 hover:shadow-xl dark:from-gray-900 dark:to-gray-800 dark:ring-gray-700/50 ${
        isExpanded ? "col-span-2 row-span-2" : ""
      }`}
      onClick={onClick}
    >
      <div className="overflow-hidden rounded-xl">
        <motion.img
          layout
          src={member.image}
          alt={member.name}
          className={`w-full object-cover transition duration-300 group-hover:scale-[1.03] ${
            isExpanded ? "h-60" : "h-44"
          }`}
          loading="lazy"
        />
      </div>

      <motion.div 
        layout
        className="mt-4 space-y-2"
      >
        <h3 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          {member.name}
        </h3>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 px-3 py-1 text-xs font-medium text-blue-700 dark:from-blue-900/30 dark:to-cyan-900/30 dark:text-blue-200">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          {member.title}
        </span>
        <motion.p 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? "auto" : 0 }}
          className="text-sm leading-6 text-gray-600 dark:text-gray-300 overflow-hidden"
        >
          {member.description}
        </motion.p>
      </motion.div>
      
      {/* Decorative elements */}
      <div className="absolute -top-2 -right-2 h-16 w-16 rounded-bl-full bg-blue-500/10 dark:bg-blue-400/10"></div>
      <div className="absolute -bottom-2 -left-2 h-12 w-12 rounded-tr-full bg-cyan-500/10 dark:bg-cyan-400/10"></div>
    </motion.div>
  );
};

export default function OfficesManagement() {
  const [expandedCard, setExpandedCard] = useState(null);
  
  const handleCardClick = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.header 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-600 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Office Management
          </h1>
          <p className="mt-4 text-lg text-red-400 max-w-2xl mx-auto">
            Meet our dedicated team that keeps our office running smoothly and efficiently every day.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {MEMBERS.map((m) => (
            <Card 
              key={m.id} 
              member={m} 
              isExpanded={expandedCard === m.id}
              onClick={() => handleCardClick(m.id)}
            />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400"
        >
          <p>Click on any team member to learn more about their role</p>
        </motion.div>
      </div>
    </div>
  );
}