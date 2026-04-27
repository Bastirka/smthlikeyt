import React from 'react';
import { premiumPlans } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { formatCurrency } from '../utils/formatters';

const PremiumPage: React.FC = () => {
  const { darkMode } = useTheme();
  const { user } = useAuth();

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">⭐ StreamHub Pro Premium</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Unlock exclusive features and support your favorite creators with premium membership
        </p>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {premiumPlans.map(plan => (
          <div
            key={plan.id}
            className={`rounded-lg p-8 relative transition transform hover:scale-105 ${
              plan.popular
                ? darkMode ? 'bg-gradient-to-b from-blue-600 to-blue-800 ring-2 ring-blue-500' : 'bg-gradient-to-b from-blue-500 to-blue-700 ring-2 ring-blue-400'
                : darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
            )}

            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
            <p className={`text-4xl font-bold mb-1 ${plan.popular ? 'text-white' : darkMode ? 'text-white' : 'text-gray-900'}`}>
              {formatCurrency(plan.price)}
              <span className="text-lg text-gray-400">/month</span>
            </p>
            <p className={`text-sm mb-6 ${plan.popular ? 'text-gray-100' : 'text-gray-500'}`}>
              Billed monthly
            </p>

            <button
              className={`w-full py-3 rounded-lg font-bold mb-6 transition ${
                plan.popular
                  ? 'bg-white text-blue-600 hover:bg-gray-100'
                  : darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {user?.isPremium ? 'Current Plan' : 'Subscribe'}
            </button>

            <div className="space-y-3">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className={plan.popular ? 'text-white' : 'text-green-500'}>✓</span>
                  <span className={plan.popular ? 'text-white text-sm' : 'text-sm'}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Benefits */}
      <div className={`p-8 rounded-lg mb-12 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <h3 className="text-2xl font-bold mb-6">Premium Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { emoji: '📺', title: '4K Streaming', description: 'Watch videos in crystal clear 4K quality' },
            { emoji: '📥', title: 'Offline Downloads', description: 'Download videos to watch anywhere' },
            { emoji: '🚫', title: 'Ad-Free Experience', description: 'Enjoy content without interruptions' },
            { emoji: '⏪', title: 'Early Access', description: 'Get early access to new features' },
            { emoji: '🎁', title: 'Exclusive Content', description: 'Access premium-only content' },
            { emoji: '👨‍👩‍👧‍👦', title: 'Family Sharing', description: 'Share with up to 4 family members' },
          ].map((benefit, idx) => (
            <div key={idx} className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
              <div className="text-4xl mb-3">{benefit.emoji}</div>
              <h4 className="font-bold mb-2">{benefit.title}</h4>
              <p className="text-sm text-gray-500">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {[
            {
              q: 'Can I cancel anytime?',
              a: 'Yes, you can cancel your subscription at any time with no penalties.',
            },
            {
              q: 'Do I get a free trial?',
              a: '7-day free trial available for new subscribers.',
            },
            {
              q: 'Can I upgrade or downgrade?',
              a: 'Yes, you can change your plan at any time.',
            },
            {
              q: 'Is my data secure?',
              a: 'We use industry-leading encryption to protect your data.',
            },
          ].map((faq, idx) => (
            <details key={idx} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} cursor-pointer`}>
              <summary className="font-bold hover:text-blue-600">{faq.q}</summary>
              <p className="mt-3 text-gray-500">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;
