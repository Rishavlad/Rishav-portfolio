import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

type FormData = {
  name: string;
  email: string;
  message: string;
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const Contact = () => {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setFormStatus('submitting');
      
      const response = await emailjs.send(
        'service_12kvigr', // Replace with your EmailJS service ID
        'template_ttdtsb7', // Replace with your EmailJS template ID
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
          to_email: 'rishav@rishavs.com.np',
          timestamp: new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Kathmandu'
          })
        },
        'DdNfHT2FHbDXmq4H1' // Replace with your EmailJS public key
      );
      
      if (response.status === 200) {
        setFormStatus('success');
        reset();
        
        setTimeout(() => {
          setFormStatus('idle');
        }, 5000);
      } else {
        throw new Error('Failed to send email');
      }
      
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
      
      setTimeout(() => {
        setFormStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a project in mind? We'd love to hear from you. Send us a message
            and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="shadow-custom bg-white p-8 rounded-lg"
          >
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-gray-600" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">Email</h3>
                  <p className="text-gray-600">rishav@rishavs.com.np</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-gray-600" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">Phone</h3>
                  <p className="text-gray-600">+977 9702154240</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-gray-600" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">Location</h3>
                  <p className="text-gray-600">
                   Ekanthakuna,Nakku<br />
                    Kathmandu, Nepal
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="shadow-custom bg-white p-8 rounded-lg"
          >
            {formStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-green-600 mb-2">Message Sent!</h3>
                <p className="text-gray-600 text-center">
                  Thank you for reaching out. We'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {formStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Failed to send message</p>
                      <p className="text-sm">{errorMessage || 'Please try again later.'}</p>
                    </div>
                  </div>
                )}
                
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: true })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={formStatus === 'submitting'}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">Name is required</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={formStatus === 'submitting'}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      Please enter a valid email address
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register('message', { required: true })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={formStatus === 'submitting'}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">Message is required</p>
                  )}
                </div>

                <button 
                  type="submit" 
                  className={`btn btn-primary w-full flex justify-center items-center ${
                    formStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;