import { GoogleOAuthProvider } from "@react-oauth/google";
import HomePage from "./pages/Home/HomePage";

const App = () => {
  return (
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
    >
      <HomePage />
    </GoogleOAuthProvider>
  );
};

export default App;