import { auth, db } from "@/firebase-config";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import {
  onSnapshot,
  collection,
  query,
  limit,
  orderBy,
} from "firebase/firestore";

type FormData = {
  message: string;
};

type Message = {
  createdAt: number;
  message: string;
  sender: string;
};

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

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

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      limit(3),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      const messages: Message[] = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data() as Message);
      });
      setMessages(messages.reverse());
    });

    return () => unsub();
  }, []);

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
      <div className="d-flex gap-4 align-items-center mt-5">
        <h1>Chat App</h1>
        <button
          className="btn btn-danger d-block"
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      </div>

      <div className="mt-5 d-flex flex-column gap-3">
        {messages.length > 0 &&
          messages.map((message, index) => (
            <div
              key={index}
              className="d-inline-flex flex-column p-3 border shadow-sm"
            >
              <p>Sender: {message.sender}</p>
              <p>Message: {message.message}</p>
            </div>
          ))}
      </div>

      <form onSubmit={handleCreateMessage}>
        <textarea
          className="form-control mt-5"
          {...register("message")}
          placeholder="Enter a message"
        />
        <button className="btn btn-primary mt-4">Send</button>
      </form>
    </main>
  );
}
