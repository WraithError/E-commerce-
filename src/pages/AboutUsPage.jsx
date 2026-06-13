import React from "react";
import { Link } from "react-router-dom";
import { Users, Target, Award, Heart, Zap, Globe, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const TEAM = [
  {
    name: "Sarah Johnson",
    role: "CEO & Co-founder",
    bio: "10+ years in e-commerce. Previously led product at Amazon.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Marcus Chen",
    role: "CTO",
    bio: "Former Google engineer. Passionate about scalable systems.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "Emily Davis",
    role: "Head of Design",
    bio: "Award-winning designer with a love for clean, intuitive UX.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
  },
  {
    name: "James Wilson",
    role: "Head of Operations",
    bio: "Supply chain expert ensuring every order arrives perfectly.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
  },
];

const VALUES = [
  { icon: Heart, title: "Customer First", desc: "Every decision starts with one question: what's best for our customers?", color: "text-rose-500 bg-rose-50 dark:bg-rose-950" },
  { icon: Award, title: "Quality Always", desc: "We rigorously vet every product to meet our high standards.", color: "text-amber-500 bg-amber-50 dark:bg-amber-950" },
  { icon: Zap, title: "Innovation", desc: "We embrace new technologies to continuously improve your experience.", color: "text-blue-500 bg-blue-50 dark:bg-blue-950" },
  { icon: Globe, title: "Sustainability", desc: "We're committed to eco-friendly practices and reducing our footprint.", color: "text-green-500 bg-green-50 dark:bg-green-950" },
];

const STATS = [
  { value: "50K+", label: "Happy Customers" },
  { value: "10K+", label: "Products Listed" },
  { value: "99.2%", label: "Satisfaction Rate" },
  { value: "48hr", label: "Average Delivery" },
];

export default function AboutUsPage() {
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-24 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-purple-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6 border border-white/20">
            <Users className="w-4 h-4" />
            Our Story
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            We're on a mission to<br />
            <span className="text-blue-400">change the way you shop</span>
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            InvenTrack was founded in 2020 with a simple belief: shopping should be effortless, enjoyable, and trustworthy. Today, we serve thousands of customers worldwide.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-12">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-5">How it all started</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            InvenTrack began as a small side project in a cramped apartment in New York City. Our founders, frustrated with the complexity of existing e-commerce tools, decided to build something better.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Within months, what started as a weekend project became a full-fledged platform. We moved into our first office, hired our first team members, and processed our first 1,000 orders.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            Today, InvenTrack is trusted by businesses and consumers alike across 40+ countries. We haven't stopped building, and we're just getting started.
          </p>
          <div className="space-y-2">
            {["Founded in 2020 in New York City", "Serving 40+ countries worldwide", "Certified B-Corporation since 2022"].map(item => (
              <div key={item} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=450&fit=crop"
            alt="Team working"
            className="rounded-3xl shadow-2xl object-cover w-full"
          />
          <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-xl border border-gray-100 dark:border-gray-800">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">4 Years</div>
            <div className="text-xs text-gray-500">of delivering excellence</div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Core Values</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">These principles guide every decision we make, from product curation to customer support.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(val => (
              <div key={val.title} className="bg-white dark:bg-gray-950 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 rounded-2xl ${val.color} flex items-center justify-center mb-4`}>
                  <val.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2" style={{fontFamily:'Inter,sans-serif'}}>{val.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Meet the Team</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">A passionate group of builders, designers, and operators united by a common vision.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map(member => (
            <div key={member.name} className="group text-center">
              <div className="relative mb-4 inline-block">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 rounded-2xl object-cover mx-auto shadow-lg group-hover:shadow-xl transition-shadow"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white" style={{fontFamily:'Inter,sans-serif'}}>{member.name}</h3>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">{member.role}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 px-4 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to start shopping?</h2>
        <p className="text-blue-100 mb-8 max-w-md mx-auto">Explore thousands of curated products and experience the InvenTrack difference.</p>
        <Link to="/store">
          <Button className="bg-white text-blue-700 hover:bg-blue-50 font-semibold rounded-xl px-8 py-3 gap-2 shadow-lg">
            Shop Now
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </section>
    </div>
  );
}