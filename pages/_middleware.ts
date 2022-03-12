import { NextRequest, NextFetchEvent, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    if(req.ua?.isBot) {
        return new Response("bot not allowed", {status: 403});
    }
    // console.log(req.cookies);
    // console.log(req.url);
    if(!req.url.includes("/api")) {
        if(!req.url.includes("/enter") && !req.cookies.carrotsession) {
            return NextResponse.redirect("/enter");
        }
    }
    // return NextResponse.json({ok: true});
}