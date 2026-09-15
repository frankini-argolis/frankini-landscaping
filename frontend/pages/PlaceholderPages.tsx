import React, { useState, useEffect, useRef } from 'react';
import { Page } from '../types';
import { companyInfo, servicesData } from '../data';
import { Icon } from '../components/Icons';
import { GoogleGenAI, Type, FunctionDeclaration, Chat } from '@google/genai';

interface PageProps {
  setPage: (page: Page) => void;
}

export const AboutPage: React.FC<PageProps> = () => {
  return (
    <div className="w-full pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-slate mb-8 text-center">The Frankini Story</h1>
        <img src="https://picsum.photos/seed/startup/1200/600" alt="Our Team" className="w-full h-64 object-cover rounded-sm mb-12 shadow-md" />
        <div className="prose prose-lg max-w-none text-gray-600">
          <p className="mb-6 font-medium text-xl text-brand-slate">
            We looked at the landscaping industry and realized it was broken. So we decided to fix it.
          </p>
          <p className="mb-6">
            Frankini Landscaping is a brand new company born out of frustration. As homeowners, we were tired of calling three different landscapers just to get one call back. We were tired of vague estimates, confusing contracts, and crews that showed up whenever they felt like it.
          </p>
          <p className="mb-6">
            We realized that property care shouldn't be a hassle. It should be as easy as ordering a ride or booking a flight. That's why we built Frankini Landscaping around technology and transparency.
          </p>
          <h3 className="text-2xl font-serif font-bold text-brand-slate mt-10 mb-4">Our Disruptive Approach</h3>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li><strong>Instant Quotes:</strong> No waiting. Our automated system gives you a price immediately.</li>
            <li><strong>Total Flexibility:</strong> Need a one-time cut? Great. Want to put your lawn on autopilot for a monthly discount? Even better. You choose.</li>
            <li><strong>Seamless Experience:</strong> Book online, pay online, and get updates when the job is done.</li>
          </ul>
          <p>
            We are proud to serve Rockville Centre and the surrounding communities. We might be the new kids on the block, but we're here to set a completely new standard for what you should expect from your landscaper.
          </p>
        </div>
      </div>
    </div>
  );
};

// Interactive Chatbot UI for the Contact/Quote page powered by Gemini
export const ContactPage: React.FC<PageProps> = () => {
  const [messages, setMessages] = useState<{sender: 'bot' | 'user', text: string, emailData?: any}[]>([
    { sender: 'bot', text: "Hi there! 👋 I'm the Frankini Quote Bot. I can get you a price and get you scheduled in under a minute. What kind of service are you looking for today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<Chat | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    // Add user message to UI
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Initialize the Gemini Chat session if it doesn't exist
      if (!chatRef.current) {
        const ai = new GoogleGenAI({apiKey: process.env.API_KEY, vertexai: true});
        
        // =====================================================================
        // UPDATE YOUR AGENT INSTRUCTIONS HERE
        // =====================================================================
        const SYSTEM_INSTRUCTION = `
        You are Frankini Bot, the official AI assistant for Frankini Landscaping.
        Your goal is to help customers get a quote and prepare an inquiry.
        
        We offer the following services:
        1. One-Time Grass Cutting (Estimate: $59)
        2. Monthly Autopilot (Estimate: $149/mo)
        3. Fall Leaf Clean Up (Estimate: Starts at $99)
        4. Winter Snow & Ice Melting (Estimate: Starts at $79)

        Personality: Friendly, concise, and disruptive (we are a modern, fast company). Keep responses short.

        Instructions:
        1. Ask the user which service they need if they haven't specified.
        2. Ask for their name and property address to provide an accurate quote.
        3. Once you have their name, address, and desired service, give them the estimated quote.
        4. IMMEDIATELY after giving the quote, call the \`prepare_inquiry\` function to generate the email draft. Do not ask them to email us manually, the function will handle it.
        `;

        const prepareInquiryTool: FunctionDeclaration = {
          name: 'prepare_inquiry',
          description: 'Prepares an email inquiry to send to frankinihousing@gmail.com. Call this ONLY after you have collected the customerName, address, and serviceRequested.',
          parameters: {
            type: Type.OBJECT,
            properties: {
              customerName: { type: Type.STRING, description: 'Name of the customer' },
              address: { type: Type.STRING, description: 'Property address' },
              serviceRequested: { type: Type.STRING, description: 'The service they want (e.g., One-Time Grass Cutting)' },
              estimatedQuote: { type: Type.STRING, description: 'The estimated price you quoted them' }
            },
            required: ['customerName', 'address', 'serviceRequested', 'estimatedQuote']
          }
        };

        chatRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            tools: [{ functionDeclarations: [prepareInquiryTool] }]
          }
        });
      }

      // Send message to Gemini
      const response = await chatRef.current.sendMessage({ message: text });
      
      // Check if the model decided to call our tool
      if (response.functionCalls && response.functionCalls.length > 0) {
        const fc = response.functionCalls[0];
        if (fc.name === 'prepare_inquiry') {
          setMessages(prev => [...prev, { 
            sender: 'bot', 
            text: "I've got all the details! Click the button below to send your inquiry directly to our team.",
            emailData: fc.args
          }]);
        }
      } else {
        // Standard text response
        setMessages(prev => [...prev, { sender: 'bot', text: response.text }]);
      }

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: "Sorry, I'm having trouble connecting right now. Please try again or call us directly." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(inputValue);
  };

  return (
    <div className="w-full pt-24 pb-12 min-h-screen bg-brand-light flex flex-col items-center">
      <div className="text-center mb-8 px-4">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-slate mb-2">Get Your Instant Quote</h1>
        <p className="text-gray-600">Chat with our AI agent to get a price and book instantly.</p>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden flex flex-col h-[600px] border border-gray-100">
        {/* Chat Header */}
        <div className="bg-brand-green text-white p-4 flex items-center">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
            <Icon name="Leaf" className="w-6 h-6 text-brand-green" />
          </div>
          <div>
            <h3 className="font-bold">Frankini Bot</h3>
            <p className="text-xs text-green-200 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span> Online
            </p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-grow p-4 overflow-y-auto bg-gray-50 flex flex-col space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl ${
                msg.sender === 'user' 
                  ? 'bg-brand-slate text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm'
              }`}>
                {msg.text}
                
                {/* Render Email Button if tool was called */}
                {msg.emailData && (
                  <div className="mt-4">
                    <a 
                      href={`mailto:frankinihousing@gmail.com?subject=${encodeURIComponent(`New Inquiry: ${msg.emailData.serviceRequested}`)}&body=${encodeURIComponent(`Name: ${msg.emailData.customerName}\nAddress: ${msg.emailData.address}\nService: ${msg.emailData.serviceRequested}\nQuote: ${msg.emailData.estimatedQuote}\n\nPlease contact me to confirm my booking.`)}`}
                      className="inline-flex items-center bg-brand-accent text-white px-4 py-2 rounded-md font-bold hover:bg-amber-600 transition-colors text-sm shadow-md"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon name="Mail" className="w-4 h-4 mr-2" />
                      Send Inquiry to frankinihousing@gmail.com
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Quick Replies for the very first interaction */}
          {messages.length === 1 && (
            <div className="flex flex-col space-y-2 mt-2 items-end">
              {servicesData.map(service => (
                <button 
                  key={service.id}
                  onClick={() => handleSend(`I'm interested in ${service.title}`)}
                  className="bg-brand-green/10 text-brand-green border border-brand-green/30 px-4 py-2 rounded-full text-sm font-medium hover:bg-brand-green hover:text-white transition-colors text-right"
                >
                  {service.title}
                </button>
              ))}
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 border border-gray-200 p-4 rounded-2xl rounded-tl-none shadow-sm flex space-x-2 items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form onSubmit={handleSubmit} className="flex items-center">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              placeholder="Type your message..."
              className="flex-grow border border-gray-300 rounded-l-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button 
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="bg-brand-green text-white px-6 py-3 rounded-r-full font-medium hover:bg-green-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Prefer to talk to a human? Call us at <span className="font-bold text-brand-slate">{companyInfo.phone}</span></p>
      </div>
    </div>
  );
};
