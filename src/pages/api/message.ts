import type { NextApiRequest, NextApiResponse } from "next";
import firebaseAdmin from "firebase-admin";

const serviceAccount = require("../../serviceAccountKey.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, sender } = req.body;

  try {
    const messagesRef = firebaseAdmin.firestore().collection("messages");
    const newMessage = {
      message,
      sender,
      createdAt: Date.now(),
    };
    const docRef = await messagesRef.add(newMessage);
    res.status(200).json({ success: true, data: docRef.id });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create message" });
  }
}
