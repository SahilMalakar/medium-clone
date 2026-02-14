import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "./Inputs";
import Button from "./Buttons";
import type { SignInTypes } from "../schemas";
import axios from "axios";
import { BACKEND_URL } from "../config";

function AuthSignIn() {
  const [postInputs, setPostInputs] = useState<SignInTypes>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/users/signin`,
        postInputs,
      );
      console.log(`response : ${JSON.stringify(response)}`);

      const token = response.data.token;
      localStorage.setItem("Token", token);
      console.log(`jwt : ${JSON.stringify(token)}`);

      navigate("/blog");
    } catch (error) {
      console.log(error);
      alert(`error while signin`);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6">
      <div className="w-full max-w-sm">
        <h2 className="text-2xl text-center font-bold text-slate-800">
          Welcome Back
        </h2>

        <p className="text-sm text-slate-500 mt-1 text-center">
          Login to continue writing blogs.
        </p>

        <div className="mt-6 space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              setPostInputs((c) => ({
                ...c,
                email: e.target.value,
              }));
            }}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            onChange={(e) => {
              setPostInputs((c) => ({
                ...c,
                password: e.target.value,
              }));
            }}
          />

          <Button text="Sign In" onClick={sendRequest} />
        </div>

        <p className="text-xs text-slate-500 mt-4 text-center">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>

        <p className="text-sm text-slate-500 mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-slate-800 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthSignIn;
