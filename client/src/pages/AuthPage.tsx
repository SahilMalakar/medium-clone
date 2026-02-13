import AuthSignUp from "../components/AuthSignUp";
import AuthSignIn from "../components/AuthSignIn";
import Quotes from "../components/Quotes";

function AuthPage({ type }: { type: "signup" | "signin" }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen overflow-hidden">
      {type === "signup" ? <AuthSignUp /> : <AuthSignIn />}

      <div className="hidden md:block">
        <Quotes />
      </div>
    </div>
  );
}

export default AuthPage;
