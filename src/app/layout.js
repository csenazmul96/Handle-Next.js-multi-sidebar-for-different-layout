import "./globals.css";

export default async function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className="">
        {children}
        </body>
        </html>
    );
}
