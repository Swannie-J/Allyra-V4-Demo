import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ChatProvider } from "./components/chat-context";

export default function App() {
  return (
    <ChatProvider>
      <RouterProvider router={router} />
    </ChatProvider>
  );
}