// Email capture utilities and API integration
import { generateChecklistPDF, generateInterviewQuestionsPDF } from './pdfGenerator';

export interface EmailCaptureData {
  email: string;
  guide: 'advisor-checklist' | 'interview-questions';
  source?: string;
}

export interface EmailCaptureResponse {
  success: boolean;
  message: string;
  downloadUrl?: string;
}

// ConvertKit API integration
const CONVERTKIT_API_URL = 'https://api.convertkit.com/v3';
const CONVERTKIT_API_KEY = import.meta.env.VITE_CONVERTKIT_API_KEY;
const CONVERTKIT_FORM_IDS = {
  'advisor-checklist': import.meta.env.VITE_CONVERTKIT_CHECKLIST_FORM_ID,
  'interview-questions': import.meta.env.VITE_CONVERTKIT_QUESTIONS_FORM_ID,
};

export async function captureEmail(data: EmailCaptureData): Promise<EmailCaptureResponse> {
  try {
    // For now, we'll use a simple approach without backend
    // In production, this would go to your backend API
    
    // Simulate API call with ConvertKit
    const formId = CONVERTKIT_FORM_IDS[data.guide];
    
    if (!CONVERTKIT_API_KEY || !formId) {
      // Fallback: store locally and show success
      console.log('Email capture (development):', data);
      
      // Store in localStorage for development
      const captures = JSON.parse(localStorage.getItem('emailCaptures') || '[]');
      captures.push({
        ...data,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('emailCaptures', JSON.stringify(captures));
      
      return {
        success: true,
        message: 'Thanks! Your guide is being prepared and will be sent to your email shortly.',
        downloadUrl: getDownloadUrl(data.guide)
      };
    }

    // Real ConvertKit integration
    const response = await fetch(`${CONVERTKIT_API_URL}/forms/${formId}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: CONVERTKIT_API_KEY,
        email: data.email,
        tags: [`lead-magnet-${data.guide}`, data.source || 'website'].filter(Boolean),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to subscribe email');
    }

    const result = await response.json();

    return {
      success: true,
      message: 'Thanks! Check your email for the download link.',
      downloadUrl: getDownloadUrl(data.guide)
    };

  } catch (error) {
    console.error('Email capture error:', error);
    return {
      success: false,
      message: 'Sorry, there was an error. Please try again or contact support.',
    };
  }
}

function getDownloadUrl(guide: string): string {
  // In development, return direct PDF links
  // In production, these would be secured download URLs
  const pdfUrls = {
    'advisor-checklist': '/pdfs/financial-advisor-selection-checklist.pdf',
    'interview-questions': '/pdfs/financial-advisor-interview-questions.pdf',
  };
  
  return pdfUrls[guide as keyof typeof pdfUrls] || '#';
}

// Helper function to trigger PDF download
export function downloadPDF(guide: string) {
  let blob: Blob;
  let filename: string;

  switch (guide) {
    case 'advisor-checklist':
      blob = generateChecklistPDF();
      filename = 'financial-advisor-selection-checklist.txt';
      break;
    case 'interview-questions':
      blob = generateInterviewQuestionsPDF();
      filename = 'financial-advisor-interview-questions.txt';
      break;
    default:
      console.error('Unknown guide type:', guide);
      return;
  }

  // Create download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL object
  setTimeout(() => URL.revokeObjectURL(url), 100);
}