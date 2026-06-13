import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, CheckCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const FAQS = [
  { q: "How long does shipping take?", a: "Standard shipping takes 3-5 business days. Express options are available at checkout." },
  { q: "What is your return policy?", a: "We offer a 30-day hassle-free return policy. Just reach out and we'll guide you through the process." },
  { q: "Do you ship internationally?", a: "Yes! We ship to 40+ countries. Shipping costs and times vary by location." },
  { q: "How can I track my order?", a: "Once your order ships, you'll receive a tracking number via email." },
];

const CONTACT_INFO = [
  { icon: Phone, title: "Phone", value: "+1 (555) 123-4567", sub: "Mon–Fri, 9am–6pm EST", color: "text-blue-500 bg-blue-50 dark:bg-blue-950" },
  { icon: Mail, title: "Email", value: "support@inventrack.com", sub: "We reply within 24 hours", color: "text-purple-500 bg-purple-50 dark:bg-purple-950" },
  { icon: MapPin, title: "Office", value: "123 Commerce Street", sub: "New York, NY 10001", color: "text-rose-500 bg-rose-50 dark:bg-rose-950" },
  { icon: Clock, title: "Hours", value: "Mon–Fri: 9am–6pm", sub: "Sat: 10am–4pm EST", color: "text-amber-500 bg-amber-50 dark:bg-amber-950" },
];

export default function ContactUsPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-purple-400 rounded-full blur-3xl" />
        </div>
        <div className="relative">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            Have a question, feedback, or just want to say hello? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTACT_INFO.map(info => (
            <div key={info.title} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-lg shadow-gray-100/50 dark:shadow-none">
              <div className={`w-10 h-10 rounded-xl ${info.color} flex items-center justify-center mb-3`}>
                <info.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-0.5" style={{fontFamily:'Inter,sans-serif'}}>{info.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">{info.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{info.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form + Map area */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Send us a message</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Fill out the form and our team will get back to you within 24 hours.</p>

          {sent ? (
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Message sent!</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">We'll get back to you at <strong>{form.email}</strong> within 24 hours.</p>
              <Button variant="outline" onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }} className="rounded-xl">
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name *</Label>
                  <Input
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="John Doe"
                    className="h-11 rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address *</Label>
                  <Input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="john@example.com"
                    className="h-11 rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject *</Label>
                <Input
                  required
                  value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  placeholder="How can we help?"
                  className="h-11 rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message *</Label>
                <Textarea
                  required
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us more about your question or feedback..."
                  className="rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 min-h-[130px] resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold gap-2 shadow-lg shadow-blue-200 dark:shadow-none transition-all"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          )}
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Frequently Asked</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Quick answers to common questions.</p>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-semibold text-sm text-gray-900 dark:text-white">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="mt-8 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=280&fit=crop"
              alt="New York City"
              className="w-full h-48 object-cover"
            />
            <div className="bg-white dark:bg-gray-900 px-4 py-3 flex items-center gap-3">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">InvenTrack HQ</p>
                <p className="text-xs text-gray-500">123 Commerce Street, New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}