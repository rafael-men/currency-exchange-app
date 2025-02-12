export const metadata = {
  title: 'Exchange Converter',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Money.png" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Text&display=swap" rel="stylesheet"/>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
