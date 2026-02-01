import React from 'react';
import { Heart, Target, CheckCircle, Leaf, Users, Award, Globe, Lightbulb } from 'lucide-react';

const AboutStory: React.FC = () => {
  const missionPillars = [
    {
      icon: CheckCircle,
      title: "Quality First",
      description: "We use only 100% natural latex, ensuring durability, breathability, and superior support. Each mattress is carefully crafted to deliver restful, uninterrupted sleep."
    },
    {
      icon: Lightbulb,
      title: "Sleep Tech Innovation",
      description: "We integrate cutting-edge sleep technologies that adapt to your body and sleep style. Our advanced foam layers, responsive latex, and ergonomic designs ensure optimal comfort."
    },
    {
      icon: Leaf,
      title: "Green Commitment",
      description: "Sleeponix is committed to sustainable manufacturing. Our mattresses are made using renewable resources and environmentally friendly processes, reducing carbon impact."
    },
    {
      icon: Heart,
      title: "Customer-Centered Approach",
      description: "From easy mattress selection to post-sale care, we prioritize customer satisfaction with personalized solutions, responsive support, and a hassle-free buying experience."
    }
  ];

  const benefits = [
    {
      icon: Leaf,
      title: "100% Natural Latex Comfort",
      description: "Our latex is sustainably harvested from rubber trees, delivering plush comfort while being hypoallergenic, breathable, and naturally resilient. Say goodbye to synthetic foam and hello to nature-powered sleep."
    },
    {
      icon: Globe,
      title: "Eco-Friendly and Sustainable",
      description: "From sourcing to packaging, our process is designed to protect the planet. Choosing Sleeponix means supporting green living without compromising on luxury."
    },
    {
      icon: Users,
      title: "Tailored Sleep for Every Body",
      description: "Whether you're a back sleeper, side sleeper, or need orthopedic support, we have a mattress that suits your needs. Explore Hevea Heaven, Ortho, and SpineRelax—each designed for unique comfort profiles."
    },
    {
      icon: Heart,
      title: "Health-Focused Engineering",
      description: "Enjoy improved posture, joint relief, and allergy-free sleep. Our latex and foam layers are engineered to offer natural spinal alignment and are resistant to dust mites, mold, and bacteria."
    },
    {
      icon: Lightbulb,
      title: "Smart Sleep Technology",
      description: "We blend traditional comfort with modern mattress innovation—multi-layered designs, responsive surfaces, and cooling technologies ensure you wake up refreshed every day."
    },
    {
      icon: Award,
      title: "Built to Last",
      description: "Our mattresses come with exceptional longevity, maintaining shape and comfort for over a decade. With Sleeponix, you're investing in years of healthy sleep."
    }
  ];

  return (
    <section id="story" className="pt-24 sm:pt-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Introduction */}
        <div className="text-center mb-20">
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-slate-gray leading-relaxed mb-6">
              Welcome to Sleeponix, a premium mattress brand revolutionizing the way the world sleeps. 
              Founded by <span className="font-semibold text-deep-indigo">C.R. Vigneshwaran</span>, 
              Sleeponix blends luxury, comfort, and sustainability to deliver exceptional natural latex 
              mattresses that promote deep, healthy sleep.
            </p>
            <p className="text-xl text-slate-gray leading-relaxed mb-6">
              At Sleeponix, we believe that a great day starts with a great night's sleep. Our mission 
              is simple — to craft mattresses using 100% natural materials, designed with advanced sleep 
              technology to provide unmatched comfort, spinal support, and long-lasting durability.
            </p>
            <p className="text-xl text-slate-gray leading-relaxed">
              Whether you're seeking better rest, pain-free mornings, or an eco-conscious lifestyle, 
              Sleeponix is your trusted sleep partner. Experience the future of sleep with our flagship 
              models like <span className="font-semibold text-gold-champagne">Hevea Heaven</span>, 
              <span className="font-semibold text-gold-champagne"> Ortho</span>, and 
              <span className="font-semibold text-gold-champagne"> SpineRelax</span>.
            </p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="mb-20">
          <div
            className="rounded-2xl p-12"
            style={{ backgroundColor: '#F4EDE1' }}
          >
            <div className="text-center mb-8">
              <Globe className="text-deep-indigo mx-auto mb-4" size={48} />
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-deep-indigo">
                Our Vision: A Healthier World Through Better Sleep
              </h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-slate-gray leading-relaxed mb-6">
                At Sleeponix, our vision is to become a global leader in sustainable sleep solutions. 
                We aim to inspire a world where every individual enjoys the rejuvenating power of 
                quality sleep—leading to better health, improved productivity, and overall well-being.
              </p>
              <p className="text-xl text-slate-gray leading-relaxed">
                We envision a future where mattresses aren't just products, but life-enhancing investments 
                that support the planet and people alike. By raising awareness of sleep health and sustainable 
                practices, we're building a better tomorrow—one restful night at a time.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <Target className="text-gold-champagne mx-auto mb-4" size={48} />
            <h2 className="text-3xl md:text-4xl font-serif font-bold gradient-text mb-6">
              Our Mission: Sleep That's Natural, Smart, and Sustainable
            </h2>
            <p className="text-xl text-slate-gray max-w-3xl mx-auto">
              We are on a mission to revolutionize sleep by creating eco-conscious, tech-enabled 
              mattresses that redefine comfort and care. Our core mission pillars include:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {missionPillars.map((pillar, index) => (
              <div 
                key={pillar.title}
                className={`bg-ivory p-8 rounded-2xl shadow-lg hover-lift fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gold-champagne/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <pillar.icon className="text-gold-champagne" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-deep-indigo mb-3">
                      {index + 1}. {pillar.title}
                    </h3>
                    <p className="text-slate-gray leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Sleeponix */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold gradient-text mb-6">
              Why Choose Sleeponix?
            </h2>
            <p className="text-2xl font-serif text-forest-green mb-4">
              Sleep Better. Live Better. Love the Earth.
            </p>
            <p className="text-xl text-slate-gray max-w-3xl mx-auto">
              If you're wondering what makes Sleeponix different from other mattress brands, 
              here's why thousands are switching to our eco-luxury sleep systems:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={benefit.title}
                className={`bg-white border border-gray-200 p-8 rounded-2xl shadow-lg hover-lift fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gold-champagne/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="text-gold-champagne" size={32} />
                </div>
                <h3 className="text-xl font-serif font-bold text-deep-indigo mb-4 text-center">
                  {benefit.title}
                </h3>
                <p className="text-slate-gray leading-relaxed text-center">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Statement */}
        <div className="text-center">
          <div className="p-12 rounded-2xl shadow-lg" style={{ backgroundColor: '#F4EDE1' }}>
            <h2 className="text-3xl font-serif font-bold text-deep-indigo mb-6">
              Sleeponix: Because You Deserve Natural Sleep and a Better Planet
            </h2>
            <p className="text-xl text-slate-gray mb-8 max-w-3xl mx-auto">
              At Sleeponix, we care about your comfort and our Earth. Every product is designed 
              with you in mind—whether it's back support, luxury feel, or sustainable living.
            </p>
            <p className="text-2xl font-serif text-deep-indigo mb-8">
              Sleep better, breathe easier, and live fully — with Sleeponix.
            </p>
            <button className="bg-white text-deep-indigo px-8 py-4 rounded-full font-semibold text-lg hover:bg-ivory transition-colors duration-300">
              Begin Your Sleep Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;