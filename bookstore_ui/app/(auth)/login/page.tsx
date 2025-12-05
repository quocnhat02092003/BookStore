"use client";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/service/AuthService";
import { User } from "@/type/UserType";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React from "react";

const page = () => {
  // Change title page
  React.useEffect(() => {
    document.title = "Login | BookStore App";
  }, []);

  //Using router
  const router = useRouter();

  // Form state register (data, loading, error, success, policy,...)
  const [formDataLogin, setFormDataLogin] = React.useState<User>({
    id: "",
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // Handle submit form login
  const handleSubmitFormLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await loginUser(formDataLogin);
      enqueueSnackbar(response.message, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      router.push("/");
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
      <form onSubmit={handleSubmitFormLogin}>
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Email address"
            className="mb-4 px-4 py-2 text-sm border border-black rounded-lg"
            onChange={(e) =>
              setFormDataLogin({ ...formDataLogin, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 px-4 py-2 text-sm border border-black rounded-lg "
            onChange={(e) =>
              setFormDataLogin({ ...formDataLogin, password: e.target.value })
            }
          />
          <Button
            disabled={
              isLoading || !formDataLogin.email || !formDataLogin.password
            }
            type="submit"
            className="w-fit"
          >
            {isLoading ? <Loader2Icon /> : "Login Now"}
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
      <div className="text-sm">
        Don't have an account?{" "}
        <Link href="/register" className=" hover:text-blue-600 duration-300">
          Register
        </Link>
      </div>
    </div>
  );
};

export default page;
