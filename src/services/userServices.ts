import jwt from 'jsonwebtoken'
import 'dotenv/config';
import  transporter from '../catalyst/gmail'
import prisma from '../catalyst/prisma';
import CryptoJS from 'crypto-js';
import { createUserSchemaInput, loginUserSchemaInput, tokenUserSchemaInput } from '../model/userDataTypes';
import { SafeUser } from '../types/types';

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
 * FUNCTION TO CREATE USERS
 * **********************************************************
 **/
//Send User Mail Function
const sendUserMail = async (email:string,token:string,link:string,username:string, fullname:string):Promise<void>  => {
    try {
      const mailOptions = {
        from:`"CTVET SOFTWARE DEV" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'CTVET Account Creation  ✍️ ✅' ,
        html: ` <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #1a5276;">Account Activation Required</h2>
          <p>Dear ${fullname},</p>
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


//FUNCTION TO  CREATE USERS
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
    await sendUserMail(user.email,token,link,user.fullname, user.username);

    return {success:true,   message:'User account have successfully created', user};

  } catch (error) {
    console.error('Create User Error',error);
    throw error
  }
}

/**
 ************************************************************
 * FUNCTION TO LOGIN USERS
 * **********************************************************
 **/


//LOGIN USER FUNCTION
export const loginUser = async(input:loginUserSchemaInput) =>{
    try {
         const emailUser =  await prisma.user.findUnique({
            where:{email:input.email}
         })

         if(!emailUser) throw new Error('A user with this email does not exist');

         // Verify password
         const hashedPassword = hashPassword(input.password);
                // Check if the account is activated
         if (hashedPassword !== emailUser.password)  throw new Error( 'Invalid email or password');

         // Check if the account is activated
        if (!emailUser.isActive)  throw new Error('Account not activated. Please check your email for the activation link');
        // Generate JWT token
        const token = generateAuthToken(emailUser.id);
        // Return user data and token (excluding sensitive information)
        const user: SafeUser = {
            id: emailUser.id,
            email:emailUser.email,
            fullname: emailUser.fullname,
            username: emailUser.username,
            contact: emailUser.contact,
            department: emailUser.department,
            isActive:emailUser.isActive,
            createdAt: emailUser.createdAt,
            updatedAt: emailUser.updatedAt,
            // Note: We're not including password, token, tokenExp here
            token // Only including the new JWT token
        };

        return {message: 'Login successful',success: true, token,user };

    } catch (error) {
        console.log('Error Login',error);
        throw error
    }
}

/**
 ************************************************************
 * FUNCTION TO ACTIVATE TOKEN FOR USERS
 * **********************************************************
 **/
//SEND ACTIVATION EMAIL
const sendActivationMail = async (email: string, fullname: string):Promise<void> => {
    const mailOptions = {
        from: `"CTVET SOFTWARE DEV" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Account Activated Successfully ✅',
        html: `
        <div style="
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        ">
            <h2 style="color: #1a5276; text-align: center;">Account Activated</h2>
            <p>Dear ${fullname},</p>
            <p>Your CTVET account has been successfully activated!</p>
            <p style="margin-top: 30px;">
                You can now access all system features using your credentials.
            </p>
            <p style="color: #666; font-size: 14px;">
                If you didn't activate this account, please contact our support team immediately.
            </p>
            <p style="margin-top: 30px;">
                Best regards,<br/>
                <strong>CTVET Support Team</strong>
            </p>
        </div>
        `,
    };
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Failed to send Activating Token', error);
        throw error;
    }
};

//ACTIVATION TOKEN FUNCTION
export const activateToken = async(input:tokenUserSchemaInput) => {
   try {
      const userToken = await prisma.user.findUnique({
        where :{token:input.token}
      })

      if(!userToken) throw new Error('Token does no exist on any user');
       // Handle the case where tokenExp is null
      if(userToken.tokenExp === null) throw new Error('Token expiration date is not set');
       // Handle the case where isActive  is true
      if(userToken.isActive === true) throw new Error('Your Account is already activated');

      //Checking the Date
      const today = new Date();
      if(today > userToken.tokenExp) throw new Error('Token expires');

      //Activating User Account
      const user  = await prisma.user.update({
        where:{id:userToken.id},
        data:{
            isActive:true,
            token:null,
            tokenExp:null
        }
      })

      await sendActivationMail(user.email, user.fullname)
      console.log('Account activated successfully',user)
      return  {success:true, message:'Account activated successfully',user}

   } catch (error) {
    console.log('Error Activating user',error);
    throw error
   }
}