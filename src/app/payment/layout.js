import SuspenseBoundary from "@/components/general/SuspenseBoundary"


export const metadata = {
  title: 'PentSpace',
  description: 'PentSapace Payment',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div>
          <SuspenseBoundary>
        {children}
          </SuspenseBoundary>
        </div>
        </body>
    </html>
  )
}
