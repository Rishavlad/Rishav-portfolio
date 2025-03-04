import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-routes',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url?.startsWith('/api/')) {
            // Parse the API route path
            const apiPath = req.url.replace('/api/', '');
            
            // Handle email sending endpoint
            if (apiPath === 'send-email' && req.method === 'POST') {
              try {
                // Get request body
                const chunks = [];
                for await (const chunk of req) {
                  chunks.push(chunk);
                }
                const body = JSON.parse(Buffer.concat(chunks).toString());
                
                const { name, email, message, recipient, subject } = body;
                
                // Validate required fields
                if (!name || !email || !message || !recipient) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ message: 'Missing required fields' }));
                  return;
                }
                
                // Create a timestamp
                const timestamp = new Date().toLocaleString('en-US', {
                  timeZone: 'Asia/Kathmandu' // Nepal timezone
                });
                
                // In development, we'll just log the email instead of sending it
                console.log('==== EMAIL WOULD BE SENT IN PRODUCTION ====');
                console.log(`To: ${recipient}`);
                console.log(`Subject: ${subject || 'New Contact Form Submission'}`);
                console.log(`From: ${name} <${email}>`);
                console.log(`Timestamp: ${timestamp}`);
                console.log(`Message: ${message}`);
                console.log('=========================================');
                
                // Return success response for development
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ 
                  message: 'Email logged successfully (would be sent in production)',
                  success: true
                }));
                
              } catch (error) {
                console.error('Error processing email request:', error);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ 
                  message: 'Failed to process email request', 
                  error: error.message 
                }));
              }
              return;
            }
            
            // If no matching API route is found
            res.statusCode = 404;
            res.end(JSON.stringify({ message: 'API route not found' }));
            return;
          }
          
          next();
        });
      }
    }
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});