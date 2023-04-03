import { auth } from "@/firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

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

  return (
    <main className="container">
      <h1>Chat App</h1>

      <button className="btn btn-primary" onClick={() => handleLogout()}>
        Logout
      </button>
    </main>
  );
}
