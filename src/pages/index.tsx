import { auth } from "@/firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";

type FormData = {
  message: string;
};

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FormData>();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log(user.email);
      } else {
        router.push("/sign-in");
      }
    });
  }, [router]);

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/sign-in");
  };

  const handleCreateMessage = handleSubmit(async (data) => {
    try {
      await axios.post("/api/message", {
        message: data.message,
        sender: "hello",
      });
      reset();
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    }
  });

  return (
    <main className="container">
      <h1 className="mt-5">Chat App</h1>
      <form onSubmit={handleCreateMessage}>
        <textarea className="form-control mt-5" {...register("message")} />
        <button className="btn btn-primary mt-4">Send</button>
      </form>
      <button
        className="btn btn-primary d-block"
        style={{ marginTop: "100px" }}
        onClick={() => handleLogout()}
      >
        Logout
      </button>
    </main>
  );
}
