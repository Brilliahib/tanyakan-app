"use client";
import Button from "@/app/components/Button/button";
import { useRouter } from "next/navigation";
import Card from "@/app/components/Card/card";
import Navbar from "@/app/components/Navbar/nav";
import app from "@/lib/firebase/firebase";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { useState } from "react";
import { getAuth } from "firebase/auth";

export default function AddQuestion() {
  const router = useRouter();
  const [newQuestion, setNewQuestion] = useState<string>("");
  const sendQuestion = async () => {
    if (newQuestion.trim() === "") {
      return;
    }

    try {
      const firestore = getFirestore(app);
      const QuestionCollection = collection(firestore, "question");
      const auth = getAuth(app);
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User not authenticated");
      }

      const { displayName, photoURL } = user;

      const docRef = await addDoc(QuestionCollection, {
        text: newQuestion,
        timestamp: serverTimestamp(),
        displayName: displayName || "Anonymous",
        photoURL: photoURL,
      });

      setNewQuestion("");
      router.push(`/question/${docRef.id}`);
    } catch (error) {
      console.error("Error adding question: ", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto w-full max-w-3xl format format-sm sm:format-base lg:format-lg py-4 lg:py-8 px-4">
        <Card rounded="md">
          <h1 className="font-bold text-base mb-4">
            Ask a question about your assignment
          </h1>
          <div>
            <textarea
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              name="question"
              id="question"
              className="flex w-full rounded-md border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 anim min-h-24 resize-none border mb-4"
              placeholder="Write a question"
            ></textarea>
            <button
              onClick={sendQuestion}
              className="bg-black w-full rounded-md text-white py-2 font-semibold"
            >
              Submit
            </button>
          </div>
        </Card>
      </div>
    </>
  );
}
