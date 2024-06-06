"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import app from "@/lib/firebase/firebase";
import Navbar from "@/app/components/Navbar/nav";
import Card from "@/app/components/Card/card";

interface Question {
  text: string;
  displayName: string;
  photoURL: string;
}

export default function QuestionDetail({ params }: { params: { id: string } }) {
  const { id } = params; // Get the question ID from the URL
  const [question, setQuestion] = useState<Question | null>(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      if (id) {
        try {
          const firestore = getFirestore(app);
          const docRef = doc(firestore, "question", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setQuestion(docSnap.data() as Question);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching question:", error);
        }
      }
    };

    fetchQuestion();
  }, [id]);

  if (!question) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <div className="w-8 h-8 border-4 border-black border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="mx-auto w-full max-w-7xl format format-sm sm:format-base lg:format-lg py-4 lg:py-8 px-4">
        <Card rounded="md">
          <div className="flex items-center gap-x-2 mb-4">
            <img
              src={question.photoURL}
              alt={question.displayName}
              className="rounded-full w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
            />
            <h1 className="font-semibold text-sm md:text-base">
              {question.displayName}
            </h1>
          </div>
          <p>{question.text}</p>
        </Card>
      </div>
    </>
  );
}
