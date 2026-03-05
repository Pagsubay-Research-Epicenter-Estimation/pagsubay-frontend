"use client";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineUser, HiOutlineLockClosed } from "react-icons/hi2";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { emailChecker, passwordChecker } from "@/lib/zod/emailChecker";
import PhivolcsLogo from "@/components/shared/phivolcslogo";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailResult = emailChecker.safeParse(email);
    const passwordResult = passwordChecker.safeParse(password);
    const nextErrors: { email?: string; password?: string } = {};
    if (!emailResult.success) {
      nextErrors.email = emailResult.error.issues[0]?.message;
    }
    if (!passwordResult.success) {
      nextErrors.password = passwordResult.error.issues[0]?.message;
    }
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;
  };

  return (
    <div className="flex h-screen items-center justify-center bg-linear-to-r from-pagsubay-sky-400 via-pagsubay-sky-500 to-pagsubay-sky-700">
      <div className="flex h-150 w-270 bg-white rounded-4xl shadow-lg overflow-hidden">
        <div className="relative w-1/2 h-full">
          <Image
            src="/loginPage_background.png"
            alt="Login Image"
            fill
            className="object-cover"
          />

          <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-8">
            <p className="text-white/70 text-sm mb-2">Lorem ipsum dolor sit</p>
            <h2 className="text-white text-2xl font-bold leading-tight">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendis
              se semper.
            </h2>
          </div>
        </div>

        <div className="w-1/2 h-full  flex flex-col items-center justify-center bg-pagsubay-slate-100 relative px-12">
          {/* This is the Phivolcs Logo but it is not in the proper location yet */}
          <PhivolcsLogo
            variant="with-text"
            size="h-14"
            className="mb-6 absolute top-8 right-8"
          />
          <h1 className="text-3xl font-bold text-pagsubay-sky-800 text-center uppercase leading-tight">
            Lorem Ipsum Dolor Lorem Ipsum
          </h1>
          <p className="text-pagsubay-sky-700 text-sm mt-2 mb-8">
            lorem ipsum dolor sit amet consectetur
          </p>

          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <div className="flex items-center gap-3 bg-white rounded-sm px-3 py-2 border-2 border-pagsubay-slate-200 shadow-lg">
                <HiOutlineUser className="h-5 w-5 text-pagsubay-slate-600" />
                <input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-pagsubay-slate-700 placeholder-pagsubay-slate-600"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="flex items-center gap-3 bg-white rounded-sm px-3 py-2 border-2 border-pagsubay-slate-200 shadow-lg">
                <HiOutlineLockClosed className="h-5 w-5 text-pagsubay-slate-600" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm text-pagsubay-slate-700 placeholder-pagsubay-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-pagsubay-slate-600 cursor-pointer "
                >
                  {showPassword ? (
                    <HiEyeOff className="h-5 w-5" />
                  ) : (
                    <HiEye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-black">
                <input
                  type="checkbox"
                  className="rounded border-pagsubay-slate-600"
                />
                Remember me
              </label>
              <a href="#" className="text-black hover:text-pagsubay-sky-600">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full mt-8 cursor-pointer bg-pagsubay-sky-700 hover:bg-pagsubay-sky-600 text-white font-semibold py-2 rounded-md transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
