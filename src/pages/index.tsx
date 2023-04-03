import Head from "next/head";
import { useForm } from "react-hook-form";

type FormData = {
  username: string;
  password: string;
};

export default function Home() {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
      <Head>
        <title>Chat App</title>
        <meta name="description" content="Chat Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <form onSubmit={onSubmit}>
          <h1 className="mt-5">Sign Up</h1>
          <label className="form-label mt-3" htmlFor="username">
            Username
          </label>
          <input
            className="form-control"
            type="text"
            {...register("username")}
          />
          <label className="form-label mt-3" htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            type="text"
            {...register("password")}
          />
          <button className="btn btn-primary mt-5">Submit</button>
        </form>
      </main>
    </>
  );
}
