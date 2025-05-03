import jwt from 'jsonwebtoken'
import 'dotenv/config';
import  transporter from '../catalyst/gmail'
import prisma from '../catalyst/prisma';
import CryptoJS from 'crypto-js';
import { createUserSchemaInput, emailUserSchemaInput, loginUserSchemaInput, resetPassUserSchemaInput, tokenUserSchemaInput, UpdateUserSchemaInput } from '../model/userDataTypes';
import { SafeUser } from '../types/types';
import { uploadImage } from '../utilities/fileUploads'
import client from '../catalyst/sms';

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
            profile: emailUser.profile,
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

      return  {success:true, message:'Account activated successfully',user}

   } catch (error) {
    console.log('Error Activating user',error);
    throw error
   }
   
}

/**
 ************************************************************
 * RESET ACTIVATION TOKEN
 * **********************************************************
 **/

 // Mail function sending reset activation token
 const sendResetActivationToken = async(email: string, token: string, link: string, fullname: string):Promise<void>  => {
    const mailOptions = {
        from: `"CTVET SOFTWARE DEV" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Account Reset Activation Token ✍️',
        html: `
         <div style="
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
         ">
          <h2 style="color: #1a5276; text-align: center;">Account Reset Activation Token</h2>
          <p>Dear ${fullname},</p>
          <p>Please click the button below to reset your password:</p>

          <div style="text-align: center; margin: 20px 0;">
            <a href="${link}${token}"
               style="
                  display: inline-block;
                  padding: 12px 24px;
                  background: #1a5276;
                  color: white;
                  text-decoration: none;
                  border-radius: 5px;
                  font-weight: bold;
               ">
               Reset Token
            </a>
          </div>

          <p style="color: #e74c3c;">
            ⚠️ This link will expire in 7 days. Do not share it with anyone.
          </p>

          <p>If you didn't request this, please ignore this email or contact support immediately.</p>

          <p style="margin-top: 30px;">
            Best regards,<br/>
            <strong>CTVET Team</strong>
          </p>
         </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Failed to send reset email:', error);
        throw error;
    }
};

 //RESET ACTIVATION FUNCTION
 export const resetActivationToken = async(input:emailUserSchemaInput)=>{
     try {
         const emailUser =  await prisma.user.findUnique({
            where:{email:input.email}
         })

         if(!emailUser) throw new Error('No User is Associated with this email');

         //Generating new token
         const token = generateToken();
         const tokenExp = new Date();
         tokenExp.setDate(tokenExp.getDate() + 7);

         const user = await prisma.user.update({
            where:{id:emailUser.id},
             data:{
                token,
                tokenExp,
             }
         })

         const link = `${process.env.CLIENT_URL}user/activate/`;
         // Send activation token email
         await sendResetActivationToken(user.email,token, link, user.fullname);

         return { success:true, message:'Activation Link with Token Successfully Sent',user }

     } catch (error) {
        console.log('Resetting Activation Fails',error);
        throw error;
     }
 }

 /**
 ************************************************************
 * FUNCTION TO RESET PASSWORD BY OTP
 * **********************************************************
 **/ 
// Function for token generation
const generateOTP = ():string =>{
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
 }

  // Mail function sending OTP
  const sendOTPEmail = async (email: string, otp: string, fullname: string): Promise<void> => {
    // Basic validation
    if (!email || !otp || !fullname) {
        throw new Error('Missing required parameters for OTP email');
    }

    const mailOptions = {
        from: `"CTVET SOFTWARE DEV" <${process.env.EMAIL_USER}>`, // More professional sender format
        to: email,
        subject: 'Password Reset OTP - CTVET System ✍️',
        html: `
        <div style="
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #e1e1e1;
            border-radius: 8px;
            background-color: #f9f9f9;
        ">
            <h2 style="
                color: #1a5276;
                text-align: center;
                margin-bottom: 20px;
            ">Password Reset Verification</h2>

            <p>Dear ${fullname},</p>
            <p>Your one-time password (OTP) for account recovery is:</p>
            <div style="
                background-color: #f0f8ff;
                padding: 15px;
                margin: 20px 0;
                text-align: center;
                border-radius: 5px;
                border: 1px dashed #1a5276;
                font-size: 24px;
                font-weight: bold;
                letter-spacing: 2px;
                color: #1a5276;
            ">${otp}</div>
            <p style="color: #e74c3c; font-weight: bold;">
                ⚠️ This OTP is valid for 3 hours. Do not share it with anyone.
            </p>

            <p>If you didn't request this password reset, please ignore this email or contact our support team immediately.</p>
            <hr style="border: none; border-top: 1px solid #e1e1e1; margin: 20px 0;">
            <p style="font-size: 14px; color: #666;">
                Best regards,<br>
                <strong>CTVET Support Team</strong>
            </p>
        </div>
        `,
        // Add high priority headers
        headers: {
            'X-Priority': '1',
            'Importance': 'high'
        }
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent successfully to ${email}`);
    } catch (error) {
        console.error('Failed to send OTP email:', error);
        throw new Error('Failed to send OTP email. Please try again later.');
    }
};

// SMS Function
interface SMSConfig {
    recipientName?: string;
    priority?: 'high' | 'normal' | 'low';
    callbackUrl?: string;
}

// const sendSMS = async ( to: string, body: string, config?: SMSConfig): Promise<void> => {

//     const smsOptions = {
//         body: config?.recipientName
//             ? `Dear ${config.recipientName},\n\n${body}`
//             : body,
//         from: process.env.TWILIO_PHONE_NUMBER,
//         to,
//         statusCallback: config?.callbackUrl,
//     };

//     try {
//         const sms = await client.messages.create(smsOptions);

//      } catch (error) {
    
//         throw new Error('SMS delivery failed');
//     }
// };

// RESET PASSWORD FUNCTION


export const resetPasswordWithOTP = async (input: emailUserSchemaInput) => {
    try {
        const emailUser = await prisma.user.findUnique({
            where: { email: input.email }
        });

        if (!emailUser) throw new Error('User does not exist with this email');

        // Generate OTP
        const otp = generateOTP();
        const tokenExp = new Date();
        tokenExp.setMinutes(tokenExp.getMinutes() + 10);

        const user = await prisma.user.update({
            where: { id: emailUser.id },
            data: {
                token: otp,
                tokenExp,
            }
        });
        
        // Send activation OTP email
        await sendOTPEmail(user.email, otp, user.fullname);
        // Send SMS - Corrected parameter order
        // await sendSMS(
        //    // user.contact,  // to (phone number)
        //    '+233203760941',
        //     `Your security code is ${otp}. Valid for 10 minutes.`,  // body
        //     {
        //         recipientName: user.fullname,
        //         priority: 'high',
        //         callbackUrl: 'https://yourdomain.com/sms-callback'
        //     }
        // );

        console.log('OTP sent successfully', user);
        return { message: 'OTP sent successfully', success: true, user };
    } catch (error) {
        console.log('Error resetting password with OTP:', error);
        throw error;
    }
};

/**
 ************************************************************
 * RESET PASSWORD
 * **********************************************************
 **/

 const sendResetPasswordMail = async(email: string, fullname: string):Promise<void>  => {

    const mailOptions = {
        from: `"CTVET SOFTWARE DEV" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Password Successfully Reset ✅',
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a5276;">Password Update Confirmation</h2>
            <p>Dear ${fullname},</p>
            <p>Your CTVET account password was successfully changed.</p>
            <p style="color: #e74c3c; font-weight: bold; ">
                ⚠️ If you didn't make this change, please contact our support team immediately.
            </p>
            <p>Thank you for your cooperation.</p>
            <p style="margin-top: 20px;">
                Best regards,<br/>
                <strong>CTVET Security Team</strong>
            </p>
        </div>
        `,
    };
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Failed to send Resetting password', error);
        throw error;
    }
};


//RESET PASSWORD FUNCTION
export const resetPassword = async(input:resetPassUserSchemaInput)=>{
   try {
    const user = await prisma.user.findUnique({
        where:{token:input.token}
       })

       if(!user) throw new Error('Cannot find OTP associated with your account');
       const token = input.token
       if(token!== user.token)  throw new Error( 'OTP provided is wrong or do not matched');
        // Handle the case where tokenExp is null
       if (user.tokenExp === null)   throw new Error( 'Token expiration time is not set');

       if(new Date() > user.tokenExp)  throw new Error( 'User OTP has expired');
       // Hash password
       const hashedPassword = hashPassword(input.password);

      const  updateUser = await prisma.user.update({
         where:{id:user.id},
         data:{
            token:null,
            tokenExp:null,
            password: hashedPassword
         },
      })

      await sendResetPasswordMail(user.email,user.fullname);
      return {message:'Password reset successfully',success:true,updateUser};

   } catch (error) {
    console.error(' Reset password fail', error);
     throw error
   }
}


// Update User Details
export const updateUser = async (input: UpdateUserSchemaInput & {pic?: Express.Multer.File}) => {
    try {
      let imageUrl: string | undefined;
      let localImageUrl: string | undefined;

      if (input.pic) {
        const { cloudinaryUrl, localUrl } = await uploadImage(input.pic.path, input.id);
        imageUrl = cloudinaryUrl;
        localImageUrl = localUrl;
      }

      const user = await prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          ...(input.email && { email: input.email }),
          ...(input.contact && { contact: input.contact }),
          ...(input.fullname && { fullname: input.fullname }),
          ...(input.department && { department: input.department }),

          // You can choose which URL to store in the database
          // Here we're storing both, adjust as needed
          ...(imageUrl && { pic: imageUrl }),
          ...(localImageUrl && { localPicPath: localImageUrl })
        }
      });
  
      if (!user) throw new Error('User Details cannot be updated');
  
      return {success: true, message: 'User Details successfully updated',user};
  
    } catch(error) {
      console.error('User Updating error:', error);
      throw error;
    }
  }
