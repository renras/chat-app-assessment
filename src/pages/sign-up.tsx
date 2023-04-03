import { useForm } from "react-hook-form";
import axios from "axios";

type FormData = {
  email: string;
  password: string;
};

const SignUp = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data;
    try {
      await axios.post("/api/signup", {
        email,
        password,
      });

      alert("signup successful");
    } catch {
      alert("Sign up failed. Make sure password is atleast 6 characters");
    }
  });

  return (
    <main className="container">
      <form onSubmit={onSubmit}>
        <h1 className="mt-5">Sign Up</h1>
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
};

export default SignUp;
