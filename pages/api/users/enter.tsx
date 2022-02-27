import mail from "@sendgrid/mail";
import twilio from "twilio";
import withHandler, {ResponseType} from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

mail.setApiKey(process.env.SENDGRID_KEY!);

const twilioClient = twilio(process.env.TWILIO_ACCSID, process.env.TWILIO_TOKEN);

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const {phone, email} = req.body;
    const user = phone ? {phone: +phone} : {email};
    const payload = Math.floor(100000 + Math.random() * 900000) + "";
    const token = await client.token.create({
        data: {
            payload,
            user: {
                connectOrCreate: {
                    where: {
                        ...user,
                    },
                    create: {
                        name:"Anonymous",
                        ...user,
                    },
                },
            },
        },
    }); 

    // if(email) {
    //     user = await client.user.findUnique({
    //         where: {
    //             // email: email
    //             email,
    //         },
    //     });
    //     if(user) console.log("user found")
    //     if(!user) {
    //         console.log("create user");
    //         user = await client.user.create({
    //             data: {
    //                 name: "Anonymous",
    //                 email,
    //             },
    //         });
    //     }
    //     console.log(user);
    // }
    // if(phone) {
    //     user = await client.user.findUnique({
    //         where: {
    //             phone: +phone,
    //         },
    //     });
    //     if(user) console.log("user found")
    //     if(!user) {
    //         console.log("create user");
    //         user = await client.user.create({
    //             data: {
    //                 name: "Anonymous",
    //                 phone: +phone,
    //             },
    //         });
    //     }
    //     console.log(user);
    // }
    
    if(phone) {
        const message = await twilioClient.messages.create({
            messagingServiceSid: process.env.TWILIO_MSID,
            to: process.env.MY_PHONE!,
            body: `Your login token: ${payload}.`,
        })
        console.log(message);
    } else if(email) {
        const email = await mail.send({
            from: "rlaguswo3408@gmail.com",
            to: "drbird1@naver.com",
            subject: "Verify your email",
            text: `Your token is ${payload}`,
            html: `<strong> Your token is ${payload}</strong>`,
        })
        console.log(email);
    }
    return res.json({
        ok: true,
    });
}

export default withHandler("POST", handler);