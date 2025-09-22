"use client";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/service/AuthService";
import { User } from "@/type/UserType";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React from "react";

const page = () => {
  // Change title page
  React.useEffect(() => {
    document.title = "Register | BookStore App";
  }, []);

  //Using router
  const router = useRouter();

  // Form state register (data, loading, error, success, policy,...)
  const [formDataRegister, setFormDataRegister] = React.useState<User>({
    id: "",
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [checkPolicy, setCheckPolicy] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // Handle submit form register
  const handleSubmitFormRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await registerUser(formDataRegister);
      enqueueSnackbar(response.message, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      router.push("/login");
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  };

  return (
    <div className="flex flex-col items-center h-full justify-center bg-neutral-300 gap-5 px-10 xl:rounded-tl-2xl xl:rounded-bl-2xl max-xl:py-20 max-xl:rounded-2xl max-xl:mx-5">
      <img
        src="https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6c8/671207dc6dd97695b9d61f2a_Logo.png"
        alt="Logo login"
      />
      <form onSubmit={handleSubmitFormRegister}>
        <div className="flex flex-col items-center">
          <input
            type="email"
            required
            placeholder="Email address"
            className="mb-4 px-4 py-2 text-sm border border-black rounded-lg"
            onChange={(e) => {
              setFormDataRegister({
                ...formDataRegister,
                email: e.target.value,
              });
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 px-4 py-2 text-sm border border-black rounded-lg "
            onChange={(e) => {
              setFormDataRegister({
                ...formDataRegister,
                password: e.target.value,
              });
            }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="mb-4 px-4 py-2 text-sm border border-black rounded-lg "
            onChange={(e) => {
              setFormDataRegister({
                ...formDataRegister,
                confirmPassword: e.target.value,
              });
            }}
          />
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="terms"
              checked={checkPolicy}
              onChange={(e) => setCheckPolicy(e.target.checked)}
            />
            <label htmlFor="terms" className="text-sm ml-2">
              I agree to the{" "}
              <Link href="/terms" className="hover:text-blue-600 duration-300">
                Terms and Conditions
              </Link>
            </label>
          </div>
          <Button
            className="w-fit"
            disabled={
              !formDataRegister.email ||
              !formDataRegister.password ||
              !formDataRegister.confirmPassword ||
              !checkPolicy ||
              isLoading
            }
          >
            {isLoading ? <Loader2Icon /> : "Register"}
          </Button>
        </div>
      </form>
      <p className="text-sm">Or</p>
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full border border-black hover:bg-green-700 duration-300 cursor-pointer">
          <img
            width={20}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png"
            alt="google logo"
          />
        </button>
        <button className="p-2 rounded-full border border-black hover:bg-green-700 duration-300 cursor-pointer">
          <img
            width={20}
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
            alt="facebook logo"
          />
        </button>
      </div>
      <p className="text-sm">
        Have an account?{" "}
        <Link href="/login" className=" hover:text-blue-600 duration-300">
          Login
        </Link>
      </p>
    </div>
  );
};

export default page;
