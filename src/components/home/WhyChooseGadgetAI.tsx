import { Bot, ShieldCheck, Truck, Headphones, Sparkles } from "lucide-react";

export default function WhyChooseGadgetAI() {
  const features = [
    {
      icon: <Bot className="w-7 h-7 text-primary" />,
      title: "Smart AI Curation",
      description:
        "Every gadget is evaluated by our recommendation engine for compatibility, build quality, and real-world performance.",
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-secondary" />,
      title: "Verified Hardware Warranty",
      description:
        "Direct manufacturer warranties and 100% authentic hardware certification on all smart electronics.",
    },
    {
      icon: <Truck className="w-7 h-7 text-warning" />,
      title: "Express Global Shipping",
      description:
        "Real-time order tracking with priority fulfillment from automated fulfillment hubs worldwide.",
    },
    {
      icon: <Headphones className="w-7 h-7 text-success" />,
      title: "24/7 Expert Tech Support",
      description:
        "Dedicated hardware engineers available around the clock for setup assistance and troubleshooting.",
    },
  ];

  return (
    <section className="py-20 bg-base-100 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-2">
            <Sparkles className="w-4 h-4" />
            <span>The Marketplace Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-base-content">
            Why Shop With <span className="gradient-title">GadgetAI</span>
          </h2>
          <p className="text-xs sm:text-sm text-base-content/60 mt-2">
            We combine high-performance tech hardware with modern digital shopping standards.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-base-200 border border-base-300 hover:border-primary/40 hover:shadow-xl transition duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-base-100 border border-base-300 flex items-center justify-center mb-5 group-hover:scale-110 transition duration-300 shadow-sm">
                {item.icon}
              </div>
              <h3 className="font-bold text-lg text-base-content mb-2 group-hover:text-primary transition">
                {item.title}
              </h3>
              <p className="text-xs text-base-content/70 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
