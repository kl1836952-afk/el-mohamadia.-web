import dotenv from 'dotenv';
dotenv.config({ path: '.env' });


const groq_api = process.env.GROQ_API_KEY



export { groq_api }