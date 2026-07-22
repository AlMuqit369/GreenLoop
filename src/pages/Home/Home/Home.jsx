import React from "react";
import {
  FaRecycle,
  FaTruck,
  FaChartLine,
  FaLeaf,
  FaUsers,
  FaBuilding,
  FaArrowRight,
  FaCheckCircle,
  FaAward,
  FaGlobe,
} from "react-icons/fa";

const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 text-white py-32 px-6 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
            🌱 Join 50,000+ eco-conscious users
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Smart Recycling Starts with{" "}
            <span className="text-yellow-300 inline-block animate-bounce">
              GreenLoop
            </span>
            <span className="text-6xl ml-2">♻️</span>
          </h1>
          
          <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-10 text-green-50 leading-relaxed">
            Connect households, collectors, and businesses in one powerful
            recycling marketplace. Earn rewards, track impact, and build a
            greener future together.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button className="group bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 hover:text-green-800 transition-all duration-300 shadow-2xl hover:shadow-yellow-300/50 hover:scale-105 flex items-center justify-center gap-2">
              Get Started Free
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-green-600 transition-all duration-300 backdrop-blur-sm">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            <StatCard number="50K+" label="Active Users" />
            <StatCard number="2.5M+" label="Kg Recycled" />
            <StatCard number="150+" label="Partner Companies" />
            <StatCard number="98%" label="Satisfaction Rate" />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              ✨ PLATFORM FEATURES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Everything You Need to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                Recycle Smarter
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful tools designed to make recycling effortless and rewarding
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaRecycle size={44} />}
              title="Waste Marketplace"
              description="List recyclable materials and receive competitive offers from verified collectors in real-time."
              gradient="from-green-500 to-emerald-500"
            />

            <FeatureCard
              icon={<FaTruck size={44} />}
              title="Smart Pickup Scheduling"
              description="Schedule and track pickups with live GPS tracking and instant notifications."
              gradient="from-blue-500 to-cyan-500"
            />

            <FeatureCard
              icon={<FaChartLine size={44} />}
              title="Market Price Dashboard"
              description="Access real-time recycling market analytics and price trends to maximize your returns."
              gradient="from-purple-500 to-pink-500"
            />

            <FeatureCard
              icon={<FaLeaf size={44} />}
              title="EcoPoints Rewards"
              description="Earn points for every recycling action and redeem for exclusive rewards and discounts."
              gradient="from-yellow-500 to-orange-500"
            />

            <FeatureCard
              icon={<FaUsers size={44} />}
              title="Community Campaigns"
              description="Join local sustainability drives, compete on leaderboards, and make a collective impact."
              gradient="from-red-500 to-rose-500"
            />

            <FeatureCard
              icon={<FaBuilding size={44} />}
              title="Business Solutions"
              description="Enterprise-grade tools for bulk recycling with compliance certificates and reporting."
              gradient="from-indigo-500 to-violet-500"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
              🚀 SIMPLE PROCESS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              How GreenLoop Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <StepCard
              number="01"
              title="Sign Up"
              description="Create your free account in under 2 minutes"
              icon={<FaUsers />}
            />
            <StepCard
              number="02"
              title="List Items"
              description="Post your recyclable materials with photos"
              icon={<FaRecycle />}
            />
            <StepCard
              number="03"
              title="Get Offers"
              description="Receive competitive bids from collectors"
              icon={<FaChartLine />}
            />
            <StepCard
              number="04"
              title="Earn Rewards"
              description="Get paid and earn EcoPoints instantly"
              icon={<FaAward />}
            />
          </div>
        </div>
      </section>

      {/* ROLES SECTION */}
      <section className="py-24 px-6 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              👥 FOR EVERYONE
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Built for Every Stakeholder
            </h2>
            <p className="text-xl text-gray-600">
              Tailored solutions for each role in the recycling ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RoleCard
              emoji="🏠"
              title="Households"
              features={[
                "Easy waste listing",
                "Doorstep pickup",
                "Instant payments",
                "Reward points",
              ]}
              color="from-green-400 to-emerald-500"
            />
            <RoleCard
              emoji="🚛"
              title="Collectors"
              features={[
                "Route optimization",
                "Bulk purchasing",
                "Payment gateway",
                "Customer management",
              ]}
              color="from-blue-400 to-cyan-500"
            />
            <RoleCard
              emoji="🏭"
              title="Recycling Companies"
              features={[
                "Material sourcing",
                "Quality assurance",
                "Analytics dashboard",
                "Supplier network",
              ]}
              color="from-purple-400 to-pink-500"
            />
            <RoleCard
              emoji="🏢"
              title="Businesses"
              features={[
                "CSR compliance",
                "Bulk contracts",
                "Carbon credits",
                "Impact reports",
              ]}
              color="from-orange-400 to-red-500"
            />
          </div>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="py-24 px-6 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Make a Real Environmental Impact 🌍
              </h2>
              <p className="text-xl mb-8 text-green-50">
                Every item you recycle through GreenLoop contributes to a
                healthier planet. Track your personal impact and see the
                difference you're making.
              </p>
              <div className="space-y-4">
                <ImpactItem
                  icon={<FaCheckCircle />}
                  text="Reduce landfill waste by up to 80%"
                />
                <ImpactItem
                  icon={<FaCheckCircle />}
                  text="Lower carbon emissions significantly"
                />
                <ImpactItem
                  icon={<FaCheckCircle />}
                  text="Support circular economy initiatives"
                />
                <ImpactItem
                  icon={<FaCheckCircle />}
                  text="Earn while protecting the environment"
                />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">
                Your Potential Monthly Impact
              </h3>
              <div className="space-y-6">
                <ImpactMetric label="CO₂ Saved" value="125 kg" />
                <ImpactMetric label="Trees Equivalent" value="6 trees" />
                <ImpactMetric label="Water Saved" value="3,500 L" />
                <ImpactMetric label="EcoPoints Earned" value="850 pts" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-block mb-4 px-4 py-2 bg-yellow-400 text-gray-900 rounded-full text-sm font-bold">
            🎉 LIMITED TIME OFFER
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
            Join the Green Revolution Today! 🌍
          </h2>
          <p className="mb-10 text-xl text-gray-300 max-w-2xl mx-auto">
            Start recycling smarter, earn rewards, and become part of a
            community committed to sustainable living.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-10 py-5 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-orange-500/50 flex items-center justify-center gap-2">
              Create Free Account
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white hover:text-green-900 transition-all duration-300">
              Schedule a Demo
            </button>
          </div>
          <p className="mt-6 text-sm text-gray-400">
            ✓ No credit card required ✓ 500 EcoPoints welcome bonus ✓ Cancel
            anytime
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                <FaRecycle className="text-green-500" />
                GreenLoop
              </h3>
              <p className="text-sm">
                Making recycling accessible, rewarding, and impactful for
                everyone.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-green-400 transition">
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition">
                    Features
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-green-400 transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-green-400 transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>
              © {new Date().getFullYear()} GreenLoop. All rights reserved. |
              Made with 💚 for a sustainable future
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// COMPONENT: StatCard
const StatCard = ({ number, label }) => (
  <div className="text-center backdrop-blur-sm bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
    <div className="text-3xl md:text-4xl font-extrabold text-yellow-300 mb-1">
      {number}
    </div>
    <div className="text-sm text-green-50">{label}</div>
  </div>
);

// COMPONENT: FeatureCard
const FeatureCard = ({ icon, title, description, gradient }) => (
  <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 hover:-translate-y-2">
    <div
      className={`inline-block p-4 rounded-xl bg-gradient-to-br ${gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
    >
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-3 text-gray-900">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

// COMPONENT: StepCard
const StepCard = ({ number, title, description, icon }) => (
  <div className="relative text-center group">
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl font-black text-green-100 group-hover:text-green-200 transition-colors">
      {number}
    </div>
    <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-green-300">
      <div className="text-4xl text-green-600 mb-4 relative z-10">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

// COMPONENT: RoleCard
const RoleCard = ({ emoji, title, features, color }) => (
  <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-transparent hover:-translate-y-2 overflow-hidden relative">
    <div
      className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
    ></div>
    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
      {emoji}
    </div>
    <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2 text-gray-700">
          <FaCheckCircle className="text-green-500 flex-shrink-0" />
          <span className="text-sm">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

// COMPONENT: ImpactItem
const ImpactItem = ({ icon, text }) => (
  <div className="flex items-center gap-3">
    <div className="text-yellow-300 text-xl flex-shrink-0">{icon}</div>
    <p className="text-lg">{text}</p>
  </div>
);

// COMPONENT: ImpactMetric
const ImpactMetric = ({ label, value }) => (
  <div className="flex justify-between items-center pb-4 border-b border-white/20">
    <span className="text-green-100">{label}</span>
    <span className="text-2xl font-bold text-yellow-300">{value}</span>
  </div>
);

export default Home;