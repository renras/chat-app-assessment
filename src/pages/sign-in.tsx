import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase-config";
import { useRouter } from "next/router";

type FormData = {
  email: string;
  password: string;
};

export default function Home() {
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      router.push("/");
    } catch (error) {
      alert("Failed to sign in");
    }
  });

  return (
    <main className="container">
      <form onSubmit={onSubmit}>
        <h1 className="mt-5">Sign In</h1>
        <label className="form-label mt-3" htmlFor="email">
          Email
        </label>
        <input className="form-control" type="email" {...register("email")} />
        <label className="form-label mt-3" htmlFor="password">
          Password
        </label>
        <input className="form-control" type="text" {...register("password")} />
        <button className="btn btn-primary mt-5">Submit</button>
      </form>
    </main>
  );
}
