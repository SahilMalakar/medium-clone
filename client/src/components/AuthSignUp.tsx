import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "./Inputs";
import Button from "./Buttons";
import type { SignUpTypes } from "../schemas";
import axios from "axios";
import { BACKEND_URL } from "../config";

function AuthSignUp() {
  const [postInputs, setPostInputs] = useState<SignUpTypes>({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  async function sendRequest() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/users/signup`,postInputs);
      console.log(`response : ${JSON.stringify(response)}`);

      const jwt = response.data;
      console.log(`jwt : ${JSON.stringify(jwt)}`);

      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      console.log(error);
      alert("error while signup");
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6">
      <div className="w-full max-w-sm">
        <h2 className="text-2xl text-center font-bold text-slate-800">
          Create Account
        </h2>

        <p className="text-sm text-slate-500 mt-1 text-center">
          Start writing blogs and share your thoughts with the world.
        </p>

        <div className="mt-6 space-y-4">
          <Input
            label="Username"
            placeholder="Enter username"
            onChange={(e) => {
              setPostInputs((c) => ({
                ...c,
                username: e.target.value,
              }));
            }}
          />

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

          <Button text="Sign Up" onClick={sendRequest} />
        </div>

        <p className="text-xs text-slate-500 mt-4 text-center">
          By signing up, you agree to our Terms and Privacy Policy.
        </p>

        <p className="text-sm text-slate-500 mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-slate-800 font-semibold hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthSignUp;
