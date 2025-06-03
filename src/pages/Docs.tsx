
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, FileText, Users, Settings, Instagram, Twitter } from 'lucide-react';

const Docs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Documentation - Coming Soon</title>
        <meta name="description" content="Documentation for our upcoming platform" />
      </Helmet>
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link 
                to="/" 
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
            </div>
            <div className="flex items-center">
              <BookOpen className="h-6 w-6 text-blue-600 mr-2" />
              <h1 className="text-xl font-semibold text-gray-900">Documentation</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <nav className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contents</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#getting-started" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                    <FileText className="h-4 w-4 mr-2" />
                    Getting Started
                  </a>
                </li>
                <li>
                  <a href="#features" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                    <Settings className="h-4 w-4 mr-2" />
                    Features
                  </a>
                </li>
                <li>
                  <a href="#community" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                    <Users className="h-4 w-4 mr-2" />
                    Community
                  </a>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="prose max-w-none">
                <h1 id="getting-started" className="text-3xl font-bold text-gray-900 mb-6">
                  Welcome to Our Documentation
                </h1>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold text-blue-900 mb-2">🚧 Coming Soon</h2>
                  <p className="text-blue-800">
                    Our comprehensive documentation is currently being prepared. Check back soon for detailed guides, 
                    API references, and tutorials to help you get the most out of our platform.
                  </p>
                </div>

                <section id="features" className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">What to Expect</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Start Guide</h3>
                      <p className="text-gray-600">
                        Step-by-step instructions to get you up and running in minutes.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">API Reference</h3>
                      <p className="text-gray-600">
                        Complete API documentation with examples and code snippets.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Tutorials</h3>
                      <p className="text-gray-600">
                        In-depth tutorials covering common use cases and best practices.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Examples</h3>
                      <p className="text-gray-600">
                        Real-world examples and sample code to jumpstart your projects.
                      </p>
                    </div>
                  </div>
                </section>

                <section id="community" className="mb-16">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Stay Connected</h2>
                  <p className="text-gray-600 mb-4">
                    While we're preparing our documentation, stay updated with our progress through our social channels.
                  </p>
                </section>
              </div>
            </div>
          </main>
        </div>
        
        {/* Social buttons centered at bottom third */}
        <div className="flex justify-center mt-16 pt-8">
          <div className="flex gap-4">
            <a 
              href="https://instagram.com/fandotsite" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:scale-110 transition-transform duration-200 shadow-lg"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="h-6 w-6" />
            </a>
            
            <a 
              href="https://x.com/fandotsite" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-black text-white hover:scale-110 transition-transform duration-200 shadow-lg"
              aria-label="Follow us on X (Twitter)"
            >
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;
