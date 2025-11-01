import Link from "next/link";
import { FiCode, FiLayout, FiZap, FiGlobe, FiBarChart, FiCpu, FiArrowRight } from "react-icons/fi";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { GlassCard } from "@/components/dashboard/GlassCard";

export default function Home() {
  const features = [
    {
      icon: <FiLayout size={32} />,
      title: "Drag & Drop Builder",
      description: "Intuitive visual editor for building websites without code",
    },
    {
      icon: <FiCode size={32} />,
      title: "Code Export",
      description: "Export clean React/HTML code for your projects",
    },
    {
      icon: <FiZap size={32} />,
      title: "Multi-Page Support",
      description: "Create complex websites with multiple pages",
    },
    {
      icon: <FiCpu size={32} />,
      title: "AI Integration",
      description: "AI-powered component generation and content creation",
    },
    {
      icon: <FiGlobe size={32} />,
      title: "Domain Management",
      description: "Connect custom domains with SSL support",
    },
    {
      icon: <FiBarChart size={32} />,
      title: "Analytics",
      description: "Track visitor behavior and page performance",
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Welcome to
            <br />
            <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
              AI-WONDERLAND
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md">
            A powerful React/Next.js SaaS website and app builder with drag-and-drop UI,
            code export, AI integration, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/builder"
              className="btn-primary inline-flex items-center gap-2 justify-center"
            >
              Start Building <FiArrowRight />
            </Link>
            <Link
              href="/dashboard"
              className="btn-secondary inline-flex items-center gap-2 justify-center"
            >
              View Dashboard
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {features.map((feature, index) => (
            <GlassCard key={index} className="p-6">
              <div className="icon-container text-white mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </GlassCard>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 glass-card p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of developers building amazing websites
          </p>
          <Link
            href="/builder"
            className="btn-primary inline-flex items-center gap-2"
          >
            Launch Builder <FiArrowRight />
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
