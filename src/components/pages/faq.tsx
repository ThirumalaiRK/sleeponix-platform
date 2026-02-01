import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      question: "What makes a latex mattress different from other mattresses?",
      answer: "Latex mattresses are made from natural latex foam, which is derived from rubber tree sap. They’re known for their durability, comfort, and breathability. Unlike regular foam or spring mattresses, latex naturally adjusts to your body shape, providing great support and pressure relief.",
        },
    {
      question: "Is a natural latex mattress good for back pain?",
      answer:
        "Yes. Latex mattresses provide excellent spinal alignment and support. The natural elasticity of latex helps reduce pressure points, making it a great choice for people with back or joint pain.", },
    {
      question: "How long does a latex mattress last?",
      answer:
        "A high-quality latex mattress can last 15 - 20 years, which is much longer compared to most traditional mattresses.",
    },
    {
        question: "Are organic latex mattresses worth it?",
        answer: "Yes. Organic latex mattresses are made without harmful chemicals, making them safer for your health and better for the environment. They also last longer and provide consistent comfort.",
    },
    {
        question: "Which is the best latex mattress for overall comfort?",
        answer: "The best latex mattress depends on your sleep style. Medium-firm latex is ideal for most sleepers because it offers a balance of support and cushioning. Side sleepers may prefer softer latex, while back and stomach sleepers benefit from firmer options.",
    },
    {
        question: "Will a latex mattress get hot while sleeping?",
        answer: "Not at all. Latex has an open-cell structure that allows air to flow freely, keeping the mattress cool and comfortable throughout the night. Perfect if you’re someone who tends to sleep hot.",
    },
    {
        question: "What’s the best organic latex mattress for side sleepers?",
        answer: "Side sleepers need extra cushioning around the shoulders and hips. A medium or medium-soft organic latex mattress works best, offering comfort without sacrificing support.",
    },
    {
        question: "Latex mattress vs memory foam — which should I choose?",
        answer: "Both are popular, but latex mattresses are more durable, eco-friendly, and breathable. Memory foam molds more deeply to your body, but it can trap heat. If you want a cooler and longer-lasting option, latex is usually the better choice.",
    },
    {
        question: "Where can I buy a latex mattress?",
        answer: "You can shop our latex mattress collection online anywhere in India from our website. W also provide fast delivery and doorstep setup.",
    },
    {
        question: "Do you provide warranty?",
        answer: "Yes, our latex mattresses come with a 15 years of warranty against manufacturing defects."
    }

  ];

 
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-2xl shadow-md p-4 cursor-pointer bg-white hover:shadow-lg transition"
            onClick={() => toggleFAQ(index)}
          >
            <h3 className="text-lg font-semibold flex justify-between items-center">
              {faq.question}
              <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
            </h3>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="mt-3 text-gray-700">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* FAQ Schema for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        })}
      </script>
    </div>
  );
};

export default FAQ;
