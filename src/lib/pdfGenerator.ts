// Simple PDF generation utility
// In a real app, you'd use a service like jsPDF or a backend service

export function generateChecklistPDF(): Blob {
  const content = `
Financial Advisor Selection Checklist
Netfin - Your Guide to Finding the Perfect Financial Advisor

CREDENTIALS & QUALIFICATIONS
☐ FCA registered and authorized
☐ Relevant professional qualifications (CFP, CFA, Chartered Financial Planner)
☐ Professional Indemnity Insurance confirmed
☐ Clean regulatory record (no disciplinary actions)  
☐ Member of professional bodies (Personal Finance Society, etc.)

FEE STRUCTURE & TRANSPARENCY
☐ Clear explanation of how they're compensated
☐ Written fee disclosure provided
☐ No hidden fees or commission conflicts
☐ Annual management fees clearly stated
☐ Initial consultation and ongoing service costs outlined

FIDUCIARY STANDARDS
☐ Confirms they act as fiduciary 100% of the time
☐ Written investment policy statement provided
☐ Regular portfolio reviews scheduled
☐ Conflicts of interest disclosed
☐ Client agreement clearly defines relationship

EXPERIENCE & SPECIALIZATION
☐ Relevant experience with your asset level
☐ Specialization matches your needs
☐ Client references available
☐ Track record of client retention
☐ Examples of similar client situations handled

COMMUNICATION & SERVICE
☐ Clear communication schedule established
☐ Multiple contact methods available
☐ Response time expectations set
☐ Technology platform demonstrated
☐ Support team and backup coverage explained

INVESTMENT PHILOSOPHY & APPROACH
☐ Investment philosophy clearly articulated
☐ Risk assessment process explained
☐ Asset allocation methodology shared
☐ Rebalancing strategy outlined
☐ Performance reporting format shown

HOW TO USE THIS CHECKLIST:

1. BEFORE THE MEETING
   - Review and select the most relevant questions for your situation
   - Print this guide and bring it to your meeting
   - Prepare follow-up questions based on your specific needs
   - Research the advisor's background and credentials first

2. DURING THE INTERVIEW  
   - Take notes on their responses for later comparison
   - Ask for written documentation of key claims
   - Pay attention to how they explain complex concepts
   - Notice red flags like evasive answers or pressure tactics

3. AFTER THE MEETING
   - Compare responses across different advisors
   - Verify any credentials or claims made
   - Check references if provided
   - Trust your instincts about the relationship fit

RED FLAGS TO WATCH FOR:
• Guarantees specific investment returns
• Pressure to invest immediately
• Unwillingness to provide fee transparency
• No written investment policy
• Evasive about their compensation structure
• No regulatory registration or credentials
• Poor communication or unprofessional behavior

QUESTIONS TO ASK:
• "Are you a fiduciary 100% of the time?"
• "How exactly are you compensated?"
• "Can you provide client references?"
• "What happens if you're unavailable?"
• "How often will we review my portfolio?"

Remember: Take your time, ask questions, and choose an advisor you trust completely with your financial future.

---
© 2025 Netfin - Find Your Perfect Financial Advisor
Visit us at: https://wealthmaster.co.uk
  `;

  return new Blob([content], { type: 'text/plain;charset=utf-8' });
}

export function generateInterviewQuestionsPDF(): Blob {
  const content = `
50 Essential Financial Advisor Interview Questions
Netfin - Your Guide to Choosing the Right Financial Advisor

ESSENTIAL OPENING QUESTIONS
1. Are you a fiduciary 100% of the time when providing advice?
2. How are you compensated for your services?
3. What are your qualifications and credentials?
4. Are you registered with the Financial Conduct Authority?
5. Do you carry Professional Indemnity Insurance?

FEE STRUCTURE & COSTS
6. What is your annual management fee percentage?
7. Are there any hidden fees or additional charges?
8. How do you bill for financial planning services?
9. What is the minimum investment requirement?
10. Do you receive any commissions from product sales?
11. Can you provide a written fee disclosure?
12. How do your fees compare to other advisors?
13. What services are included in your annual fee?
14. Are there charges for additional meetings?
15. How do you handle fee increases?

INVESTMENT PHILOSOPHY
16. What is your investment philosophy and approach?
17. How do you determine asset allocation for clients?
18. How often do you rebalance portfolios?
19. What investment platforms do you use?
20. How do you handle market volatility?
21. Do you use actively managed or passive investments?
22. How do you select individual investments?
23. What's your approach to risk management?
24. Do you invest in alternative investments?
25. How do you incorporate ESG factors?

CLIENT SERVICE & COMMUNICATION
26. How often will we meet to review my portfolio?
27. What is your typical response time to client inquiries?
28. Who will I work with day-to-day?
29. How do you report on portfolio performance?
30. What happens if you're unavailable?
31. Do you have backup advisors?
32. What technology platforms do you use?
33. How do you communicate market updates?
34. Can I contact you outside business hours?
35. How do you handle client complaints?

EXPERIENCE & TRACK RECORD
36. How many clients do you currently serve?
37. What is your typical client profile?
38. How long have you been providing financial advice?
39. Can you provide client references?
40. What is your client retention rate?
41. Have you worked with clients in my situation before?
42. What's your experience with my age group?
43. Do you specialize in particular areas?
44. What professional development do you undertake?
45. Are you planning any major changes to your practice?

RED FLAG QUESTIONS
46. Have you ever been subject to regulatory discipline?
47. Do you guarantee investment returns?
48. Why are you better than other advisors?
49. What is your worst client experience?
50. Why did your last clients leave?

HOW TO USE THESE QUESTIONS:

PREPARATION
• Select 15-20 most relevant questions for each advisor
• Prepare follow-up questions specific to your needs
• Research the advisor beforehand
• Bring this list to every advisor meeting

DURING THE INTERVIEW
• Take detailed notes on responses
• Ask for written documentation of key claims
• Notice communication style and professionalism
• Trust your instincts about the relationship

EVALUATION
• Compare answers across different advisors
• Verify credentials and regulatory status
• Check references if provided
• Consider both technical expertise and personal fit

RED FLAGS TO WATCH FOR:
• Evasive or unclear answers
• Pressure to make immediate decisions
• Reluctance to provide fee transparency
• No written investment policy
• Guarantees about returns
• Poor communication skills
• No regulatory registration

GOOD SIGNS:
• Clear, detailed answers
• Transparent fee structure
• Professional credentials
• Strong client references
• Fiduciary commitment
• Good communication skills
• Regulatory compliance

Remember: The right advisor should welcome your questions and provide clear, honest answers. If they seem bothered by your due diligence, find someone else.

---
© 2025 Netfin - Find Your Perfect Financial Advisor
Visit us at: https://wealthmaster.co.uk
  `;

  return new Blob([content], { type: 'text/plain;charset=utf-8' });
}