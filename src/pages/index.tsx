import { auth } from "@/firebase-config";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

type FormData = {
  message: string;
};

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
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
        sender: user?.email,
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
        className="btn btn-danger d-block"
        style={{ marginTop: "100px" }}
        onClick={() => handleLogout()}
      >
        Logout
      </button>
    </main>
  );
}
