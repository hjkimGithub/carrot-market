import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {phone, email} = req.body;
    const payload = phone ? {phone: +phone} : {email};
    const token = await client.token.create({
        data: {
            payload: "12345",
            user: {
                connectOrCreate: {
                    where: {
                        ...payload,
                    },
                    create: {
                        name:"Anonymous",
                        ...payload,
                    },
                },
            },
        },
    }); 
    console.log(token);
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
    return res.status(200).end();
}

export default withHandler("POST", handler);