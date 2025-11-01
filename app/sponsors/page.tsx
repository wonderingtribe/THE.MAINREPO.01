'use client';

import React from 'react';
import Link from 'next/link';
import { FiDollarSign, FiTrendingUp, FiUsers, FiAward, FiTarget, FiHeart } from 'react-icons/fi';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { GlassCard } from '@/components/dashboard/GlassCard';

export default function SponsorsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">Investor & Sponsor Program</h1>
          <p className="text-white/90 text-xl max-w-3xl mx-auto">
            Connect with investors to fund your project and accelerate your business growth
          </p>
        </div>

        {/* Hero Section - Tie-Dye Themed */}
        <div className="mb-12">
          <GlassCard className="p-10 tie-dye-gradient border-2 border-white/30">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                  <FiDollarSign className="w-12 h-12 text-white" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Get Funding for Your Project</h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Whether you're launching a startup or scaling an existing business, our investor network 
                can provide the capital and mentorship you need to succeed.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
                  <FiTarget className="w-6 h-6" />
                  Apply for Funding
                </button>
                <button className="btn-secondary inline-flex items-center gap-2 text-lg px-8 py-4">
                  <FiUsers className="w-6 h-6" />
                  Become an Investor
                </button>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Investment Tiers */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow-md">Investment Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Seed Stage */}
            <GlassCard className="p-8 hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-400/30 flex items-center justify-center">
                  <FiTrendingUp className="w-6 h-6 text-green-300" />
                </div>
                <h3 className="text-2xl font-bold text-white">Seed Stage</h3>
              </div>
              <div className="mb-4">
                <div className="text-3xl font-bold text-white mb-2">$10K - $100K</div>
                <p className="text-white/70">Early-stage funding for MVPs and prototypes</p>
              </div>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-300 mt-1">✓</span>
                  <span>Initial product development</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-300 mt-1">✓</span>
                  <span>Market validation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-300 mt-1">✓</span>
                  <span>Mentorship from founders</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-300 mt-1">✓</span>
                  <span>Access to co-working space</span>
                </li>
              </ul>
              <button className="btn-secondary w-full mt-6">Learn More</button>
            </GlassCard>

            {/* Growth Stage */}
            <GlassCard className="p-8 border-2 border-yellow-400/50 hover:scale-105 transition-transform relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 font-bold px-4 py-1 rounded-full text-sm">
                  POPULAR
                </span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-400/30 flex items-center justify-center">
                  <FiAward className="w-6 h-6 text-blue-300" />
                </div>
                <h3 className="text-2xl font-bold text-white">Growth Stage</h3>
              </div>
              <div className="mb-4">
                <div className="text-3xl font-bold text-white mb-2">$100K - $1M</div>
                <p className="text-white/70">Scale your business to the next level</p>
              </div>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-blue-300 mt-1">✓</span>
                  <span>Product-market fit optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-300 mt-1">✓</span>
                  <span>Team expansion support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-300 mt-1">✓</span>
                  <span>Marketing & sales acceleration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-300 mt-1">✓</span>
                  <span>Strategic partnerships</span>
                </li>
              </ul>
              <button className="btn-primary w-full mt-6">Apply Now</button>
            </GlassCard>

            {/* Series A+ */}
            <GlassCard className="p-8 hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-400/30 flex items-center justify-center">
                  <FiHeart className="w-6 h-6 text-purple-300" />
                </div>
                <h3 className="text-2xl font-bold text-white">Series A+</h3>
              </div>
              <div className="mb-4">
                <div className="text-3xl font-bold text-white mb-2">$1M+</div>
                <p className="text-white/70">Enterprise-scale funding for established businesses</p>
              </div>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-purple-300 mt-1">✓</span>
                  <span>International expansion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-300 mt-1">✓</span>
                  <span>Advanced infrastructure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-300 mt-1">✓</span>
                  <span>Executive recruitment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-300 mt-1">✓</span>
                  <span>IPO preparation support</span>
                </li>
              </ul>
              <button className="btn-secondary w-full mt-6">Contact Us</button>
            </GlassCard>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow-md">Why Choose Our Program</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-400/30 flex items-center justify-center flex-shrink-0">
                  <FiUsers className="w-6 h-6 text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Vetted Investor Network</h3>
                  <p className="text-white/80">
                    Access to a curated network of experienced investors and venture capitalists 
                    who understand the tech industry and can provide strategic value beyond capital.
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-pink-400/30 flex items-center justify-center flex-shrink-0">
                  <FiTrendingUp className="w-6 h-6 text-pink-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Growth Mentorship</h3>
                  <p className="text-white/80">
                    Work with seasoned entrepreneurs who have successfully scaled businesses. 
                    Get personalized guidance on product development, go-to-market strategy, and fundraising.
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-400/30 flex items-center justify-center flex-shrink-0">
                  <FiAward className="w-6 h-6 text-yellow-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Exclusive Resources</h3>
                  <p className="text-white/80">
                    Gain access to exclusive tools, platforms, and services at discounted rates. 
                    Leverage our partnerships to reduce operational costs and accelerate development.
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-400/30 flex items-center justify-center flex-shrink-0">
                  <FiTarget className="w-6 h-6 text-green-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Success-Focused Support</h3>
                  <p className="text-white/80">
                    We're invested in your success. From pitch deck reviews to term sheet negotiations, 
                    our team supports you throughout the entire funding journey.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mb-8">
          <GlassCard className="p-10 bg-gradient-to-r from-purple-400/30 via-pink-400/30 to-cyan-400/30">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Accelerate Your Growth?</h2>
              <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                Join hundreds of successful companies that have raised funding through our platform.
              </p>
              <button className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
                <FiDollarSign className="w-6 h-6" />
                Start Your Application
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
