'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface HeroImage {
    url: string
    alt: string
    credit?: string
}

interface HeroProps {
    heroImages?: HeroImage[]
}

export default function Hero({ heroImages = [] }: HeroProps) {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (heroImages.length <= 1) return
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % heroImages.length)
        }, 6000)
        return () => clearInterval(timer)
    }, [heroImages.length])

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {heroImages.length > 0 ? (
                heroImages.map((img, i) => (
                    <div
                        key={i}
                        className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img
                            src={img.url}
                            alt={img.alt}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                ))
            ) : (
                <div className="absolute inset-0 bg-slate-900" />
            )}

            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/50 to-slate-900/70" />

            <div className="relative z-10 container mx-auto px-4 md:px-8 py-24 text-center text-white max-w-4xl">
                <span className="inline-block text-teal-300 font-medium text-sm tracking-widest uppercase mb-6">
                    Real-World Evidence for Coastal Communities
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                    Advancing coastal health through population, clinical, and translational research
                </h1>
                <p className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-4 leading-relaxed">
                    We study health across interconnected dimensions to understand how local conditions shape disease, access, vulnerability, and resilience.
                </p>
                <p className="text-base text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
                    Our work translates field observations into community knowledge, policy insight, and responsible action.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                    <a href="#approach" className="bg-white text-slate-900 px-8 py-3.5 rounded-md font-semibold hover:bg-white/90 transition text-center">
                        Learn About Our Approach
                    </a>
                    <Link href="/research" className="border border-white/50 text-white px-8 py-3.5 rounded-md font-medium hover:bg-white/10 transition text-center">
                        Explore Our Research
                    </Link>
                </div>
                <span className="text-sm text-white/40 italic">Starting small. Designed for broader relevance.</span>
            </div>

            {heroImages.length > 1 && (
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
                    {heroImages.map((_, i) => (
                        <button key={i} onClick={() => setCurrent(i)}
                            className={`h-2 rounded-full transition-all ${i === current ? 'bg-white w-6' : 'bg-white/40 w-2'}`}
                        />
                    ))}
                </div>
            )}

            {heroImages[current]?.credit && (
                <p className="absolute bottom-4 right-4 text-xs text-white/40 z-10">{heroImages[current].credit}</p>
            )}
        </section>
    )
}