import twilio from 'twilio';
// Initialize with TypeScript types
const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
  );

  export default client