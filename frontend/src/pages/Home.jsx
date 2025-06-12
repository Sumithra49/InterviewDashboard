import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Users, Clock, CheckCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-7xl font-bold mb-6 leading-tight">
            Connect Talent with 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              Opportunity
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            Experience instant interview requests with real-time notifications. 
            No more waiting, no more missed opportunities. Connect instantly and land your dream job.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              to="/apply" 
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
            >
              <span>Apply for Jobs</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/recruiter" 
              className="group bg-white text-gray-700 px-8 py-4 rounded-2xl font-semibold border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              Recruiter Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose JobConnect?</h2>
          <p className="text-gray-600 text-lg">Built for the modern hiring process</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Instant Requests</h3>
            <p className="text-gray-600 leading-relaxed">
              Submit interview requests instantly and get immediate confirmations.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Real-time Updates</h3>
            <p className="text-gray-600 leading-relaxed">
              Recruiters see new applications instantly without refreshing.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Fast Response</h3>
            <p className="text-gray-600 leading-relaxed">
              Get responses from recruiters within minutes, not days.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Easy Process</h3>
            <p className="text-gray-600 leading-relaxed">
              Simple, streamlined application process that saves time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who trust JobConnect for their career growth.
          </p>
          <Link 
            to="/apply" 
            className="inline-flex items-center space-x-2 bg-white text-purple-600 px-8 py-4 rounded-2xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <span>Start Your Application</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;