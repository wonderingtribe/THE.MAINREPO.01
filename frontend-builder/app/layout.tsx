import "./globals.css";
import "./wonderland.css"; // 🪄 Wonderland theme styles
import { AppContextProvider } from "@/contexts/AppContext";
import { BuilderContextProvider } from "@/contexts/BuilderContext";
import { UserContextProvider } from "@/contexts/UserContext";

export const metadata = {
  title: "Frontend Builder",
  description: "AI-driven website and SaaS builder platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="wonderland-bg wonderland-fade-in min-h-screen">
        <UserContextProvider>
          <AppContextProvider>
            <BuilderContextProvider>
              <div className="wonderland-container p-6">{children}</div>
            </BuilderContextProvider>
          </AppContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
