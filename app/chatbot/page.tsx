import { Suspense } from "react";
import { Chatbot } from "@/components/chatbot";
import HeaderMenu from "@/components/ui/header";

export default function ChatbotPage() {
  return (
    <>
      <HeaderMenu />
      <main className="chat-page container" style={{ maxWidth: 1100 }}>
        {/* useSearchParams() inside Chatbot requires a Suspense boundary */}
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
      </main>
    </>
  );
}
