'use client';

import React, { useState } from 'react';
import { FiCheck, FiX, FiZap, FiCpu, FiShield, FiUsers, FiTrendingUp, FiStar } from 'react-icons/fi';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { GlassCard } from '@/components/dashboard/GlassCard';

type BillingCycle = 'monthly' | 'yearly';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  const plans = [
    {
      name: 'Free',
      price: 0,
      yearlyPrice: 0,
      description: 'Perfect for getting started',
      icon: <FiUsers className="w-8 h-8 text-purple-400" />,
      popular: false,
      features: [
        { name: 'Microsoft AI access', included: true },
        { name: 'Custom API integration', included: true },
        { name: '100 AI generations/month', included: true },
        { name: 'Basic analytics', included: true },
        { name: '1 project', included: true },
        { name: 'Community support', included: true },
        { name: 'Premium AI models', included: false },
        { name: 'Priority support', included: false },
        { name: 'Advanced analytics', included: false },
        { name: 'Unlimited projects', included: false },
      ],
      cta: 'Get Started',
      ctaStyle: 'btn-secondary',
    },
    {
      name: 'Pro',
      price: 29,
      yearlyPrice: 290,
      description: 'For professional developers',
      icon: <FiZap className="w-8 h-8 text-yellow-400" />,
      popular: true,
      features: [
        { name: 'All free features', included: true },
        { name: 'ChatGPT 4.0 & 4.5 access', included: true },
        { name: 'Grok AI access', included: true },
        { name: '1,000 AI generations/month', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Unlimited projects', included: true },
        { name: 'Priority support', included: true },
        { name: 'Code export', included: true },
        { name: 'Custom domains', included: true },
        { name: 'Team collaboration (up to 5)', included: true },
      ],
      cta: 'Upgrade to Pro',
      ctaStyle: 'btn-primary',
    },
    {
      name: 'Enterprise',
      price: 99,
      yearlyPrice: 990,
      description: 'For teams and organizations',
      icon: <FiShield className="w-8 h-8 text-blue-400" />,
      popular: false,
      features: [
        { name: 'All Pro features', included: true },
        { name: 'Unlimited AI generations', included: true },
        { name: 'Dedicated AI models', included: true },
        { name: 'SSO & advanced security', included: true },
        { name: 'Unlimited team members', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'Dedicated support', included: true },
        { name: 'SLA guarantee', included: true },
        { name: 'On-premise deployment', included: true },
        { name: 'Custom contracts', included: true },
      ],
      cta: 'Contact Sales',
      ctaStyle: 'btn-secondary',
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Choose Your Plan
          </h1>
          <p className="text-white/80 text-xl mb-8">
            Unlock the full potential of AI-WONDERLAND
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full font-medium transition-all relative ${
                billingCycle === 'yearly'
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Yearly
              <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-0.5 rounded-full whitespace-nowrap">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <GlassCard
              key={plan.name}
              className={`p-8 relative ${
                plan.popular
                  ? 'ring-4 ring-yellow-400/50 bg-gradient-to-br from-purple-500/20 to-pink-500/20 scale-105'
                  : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                    <FiStar className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4">
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-white/70 text-sm mb-4">{plan.description}</p>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-white">
                    ${billingCycle === 'monthly' ? plan.price : plan.yearlyPrice}
                  </span>
                  <span className="text-white/70 text-lg">
                    /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                  </span>
                </div>
                {billingCycle === 'yearly' && plan.price > 0 && (
                  <p className="text-white/60 text-sm">
                    ${(plan.yearlyPrice / 12).toFixed(2)}/month billed annually
                  </p>
                )}
              </div>

              <button className={`w-full ${plan.ctaStyle} mb-6`}>
                {plan.cta}
              </button>

              <div className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    {feature.included ? (
                      <FiCheck className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <FiX className="w-5 h-5 text-white/30 mt-0.5 flex-shrink-0" />
                    )}
                    <span
                      className={`text-sm ${
                        feature.included ? 'text-white' : 'text-white/40'
                      }`}
                    >
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>

        {/* FAQ / Additional Info */}
        <GlassCard className="p-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Can I upgrade or downgrade anytime?
              </h3>
              <p className="text-white/70 text-sm">
                Yes! You can change your plan at any time. Changes take effect at the start of your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-white/70 text-sm">
                We accept all major credit cards, PayPal, and enterprise purchase orders for yearly plans.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Is there a free trial?
              </h3>
              <p className="text-white/70 text-sm">
                The Free plan is available forever. Pro and Enterprise plans offer a 14-day money-back guarantee.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                What happens when I reach my generation limit?
              </h3>
              <p className="text-white/70 text-sm">
                You'll receive a notification. You can upgrade anytime or wait until your limit resets next month.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <GlassCard className="p-8 tie-dye-gradient">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-white/90 mb-6 text-lg">
              Join thousands of developers using AI-WONDERLAND to create incredible projects
            </p>
            <button className="btn-primary text-lg px-8 py-4">
              Start Building Now →
            </button>
          </GlassCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
