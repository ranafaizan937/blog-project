import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../common/Button';

export function CTA() {
  return (
    <section className="relative py-20">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Voorkom Kostbare Schade
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Laat uw houtwerk tijdig inspecteren door onze experts
          </p>
          <Link to="/contact">
            <Button variant="primary" showArrow>
              Vraag een Inspectie Aan
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}