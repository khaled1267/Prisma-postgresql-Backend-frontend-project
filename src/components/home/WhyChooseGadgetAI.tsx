import { Bot, SearchCheck, Boxes, SlidersHorizontal, Sparkles } from "lucide-react";

export default function WhyChooseGadgetAI() {
  const features = [
    {
      icon: <SearchCheck className="w-7 h-7 text-primary" />,
      title: "Search the real catalog",
      description:
        "Find products by title or description, then narrow the results by category and stock availability.",
    },
    {
      icon: <Boxes className="w-7 h-7 text-secondary" />,
      title: "Clear product details",
      description:
        "Review each listing's description, category, current price, and inventory before adding it to your cart.",
    },
    {
      icon: <SlidersHorizontal className="w-7 h-7 text-warning" />,
      title: "Shop your way",
      description:
        "Browse specialist categories, adjust your budget, and keep track of the products you choose.",
    },
    {
      icon: <Bot className="w-7 h-7 text-success" />,
      title: "GadgetAI Copilot",
      description:
        "Ask the connected AI assistant to help you explore products and compare options from the marketplace.",
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
