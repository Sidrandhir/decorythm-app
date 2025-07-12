// File: app/pricing/page.tsx
import Link from 'next/link';

const plans = [
    { name: 'Starter', price: '$10', tokens: '100 Tokens', features: ['Standard Generations', 'Personal Use License', 'Email Support'] },
    { name: 'Pro', price: '$25', tokens: '500 Tokens', features: ['HD Generations', 'Commercial Use License', 'Priority Support'], popular: true },
    { name: 'Studio', price: '$50', tokens: '1500 Tokens', features: ['4K Generations', 'API Access', 'Dedicated Support'] },
];

export default function PricingPage() {
    return (
        <div className="bg-gray-50 py-12 sm:py-16">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h1>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Plans for Every Creator
                    </p>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
                    Choose the plan that fits your creative needs. More tokens, higher resolutions, and commercial rights.
                </p>
                <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl lg:grid-cols-3">
                    {plans.map((plan) => (
                        <div key={plan.name} className={`rounded-3xl p-8 ring-1 ${plan.popular ? 'ring-2 ring-indigo-600' : 'ring-gray-200'} bg-white shadow-lg`}>
                            <h2 className="text-lg font-semibold leading-8 text-gray-900">{plan.name}</h2>
                            <p className="mt-4 text-sm leading-6 text-gray-600">{plan.tokens}</p>
                            <p className="mt-6 flex items-baseline gap-x-2">
                                <span className="text-4xl font-bold tracking-tight text-gray-900">{plan.price}</span>
                                <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                            </p>
                            <Link href="#" className={`mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 ${plan.popular ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500' : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300'}`}>
                                Choose Plan (Coming Soon)
                            </Link>
                            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                        ✓ {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}