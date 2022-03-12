import Document, { Head, Html, Main, NextScript} from "next/document";

class CustomDocument extends Document {
    render(): JSX.Element {
        // console.log("DOCUMENT IS RUNNING");
        return (
            <Html lang="ko">
                {/* 
                    font should be google font,
                    next js font optimize base on google font
                */}
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default CustomDocument;