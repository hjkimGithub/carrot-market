import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const {
        query: {id},
        session: {user},
    } = req;
    const alreadyExists = await client?.fav?.findFirst({
        where: {
            productId: +id.toString(),
            userId: user?.id,
        },
    });
    if(alreadyExists) {
        // delete
        await client?.fav.delete({
            where: {
                id: alreadyExists.id,
            }
        });
    } else {
        // create
        await client?.fav.create({
            data: {
                user: {
                    connect: {
                        id: user?.id,
                    },
                },
                product: {
                    connect: {
                        id: +id.toString(),
                    },
                }   
            }
        })
    }
    res.json({
        ok: true,
    });
}

export default withApiSession(
    withHandler({
        methods: ["POST"],
        handler,
    })
);