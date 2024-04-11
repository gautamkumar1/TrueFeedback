/*
//* ALOGO
Code should effectively handles both scenarios of registering a new user a updating an existing but unverfied user account with a new password and verfication code. 

IF existingUserByEmail EXISTS THEN 
    IF existingUserByEmail.isVerfied THEN
              success: false;
    ELSE
    /// Save the updated user
    END IF;
*/

import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);
