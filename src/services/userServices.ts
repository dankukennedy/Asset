import jwt from 'jsonwebtoken'
import 'dotenv/config'; 
import  transporter from '../catalyst/gmail'
import prisma from '../catalyst/prisma';
import CryptoJS from 'crypto-js';
import { createUserSchemaInput } from '../model/userDataTypes';

// Function for token generation
const generateToken = (): string => {
    const randomString = Math.random().toString(36).substring(2); // Random alphanumeric string
    const timestamp = Date.now().toString(); // Current timestamp
    const uniqueString = `${randomString}-${timestamp}`; // Combine random string and timestamp

    // Hash the unique string using SHA-256
    return CryptoJS.SHA256(uniqueString).toString(CryptoJS.enc.Hex);
};
// Function to hash password using crypto
const hashPassword = (password: string): string => {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
};

//Function to Generate JWT token
const generateAuthToken = (userId:string):string => {
    return jwt.sign({id:userId},process.env.JWT_SECRET!, {expiresIn:'1h'});
}

/**
 ************************************************************
 * FUNCTION TO CREATE USER OR USERS
 * **********************************************************
 **/
//Send User Mail Function
const sendUserMail = async (email:string,token:string,link:string,username:string, name:string):Promise<void>  => {
    try {
      const mailOptions = {
        from:`"CTVET SOFTWARE DEV" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'CTVET Account Creation  ✍️ ✅' ,
        html: ` <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #1a5276;">Account Activation Required</h2>
          <p>Dear ${name},</p>
          <p>Thank you for registering with the Commission for Technical and Vocational Educational and Training.</p>
          <p>Please activate your account by clicking the link below:</p>
          <p>
            <a href="${link}${token}"
               style="display: inline-block; padding: 10px 20px; background: #1a5276; color: white; text-decoration: none; border-radius: 5px;">
              Activate Account
            </a>
          </p>
          <p style="font-weight: bold;"> Use <b style="color: #1a5276;font-family: Arial, sans-serif">${username} </b> to as your <b style="color:#d17e11;font-family: Arial, sans-serif">username</b> to login </p>
          <p>This link will expire in 7 days.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <p>Best regards,<br/>CTVET Team</p>
        </div>`,
      };
     await transporter.sendMail(mailOptions);
      console.log(`Activation email sent to ${email}`);
    } catch (error) {
     console.error('Failed to send activation email:', error);
     throw new Error('Failed to send activation email');
  }
}

//Create User Function
export const  createUser = async(input:createUserSchemaInput) =>{
  try {
    //Check if user existed with the email
    const emailUser = await prisma.user.findUnique({
        where:{ email:input.email}
    })

    if(emailUser) throw new Error('email already existed');

    const  userContact = await prisma.user.findFirst({
        where:{contact:input.contact}
    })

    if(userContact) throw new Error('user with contact already existed');

    const  userUserName = await prisma.user.findFirst({
        where:{username:input.username}
    })

    if(userUserName) throw new Error('user with username already existed');

    //Hash password
    const hashedPassword = hashPassword(input.password);

    //Generate activation token ad set expiration
    const token  = generateToken();
    const tokenExp = new Date();
    tokenExp.setDate(tokenExp.getDate() + 7);

    //Create user
    const user = await prisma.user.create({
        data:{
            ...input,
            password:hashedPassword,
            token,
            tokenExp,
        }
    })

    // Send activation email
    const link = `${process.env.CLIENT_URL}/activate/`;
    await sendUserMail(user.email,token,link,user.name, user.username);

    return {success:true,   message:'User account have successfully created', user};

  } catch (error) {
    console.error('Create User Error',error);
    throw error
  }
}