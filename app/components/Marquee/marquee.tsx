import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import app from "@/lib/firebase/firebase";
import Card from "../Card/card";

interface Question {
  id: string;
  text: string;
  uid: string;
  displayName: string;
  photoURL: string;
  timestamp?: {
    seconds: number;
    nanoseconds: number;
  };
}

export default function Marquee() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const firestore = getFirestore(app);
    const questionCollection = collection(firestore, "question");
    const questionQuery = query(
      questionCollection,
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(questionQuery, (snapshot) => {
      const questionData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Question[];
      setQuestions(questionData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="relative flex max-w-full flex-row overflow-hidden py-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex shrink-0 animate-marquee items-center justify-around gap-x-4 ml-4"
          >
            {questions.map((question) => {
              const date = question.timestamp
                ? new Date(question.timestamp.seconds * 1000)
                : null;
              return (
                <Card
                  key={question.id}
                  rounded="md"
                  href={`/question/${question.id}`}
                  width="base"
                >
                  <div className="flex items-center gap-x-2 mb-2">
                    <img
                      src={question.photoURL}
                      alt={question.displayName}
                      className="rounded-full w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
                    />
                    <div>
                      <h1 className="font-semibold text-sm md:text-base">
                        {question.displayName}
                      </h1>
                    </div>
                  </div>
                  <p className="text-md text-slate-900 mb-2 hover:underline cursor-pointer line-clamp-2">
                    {question.text}
                  </p>
                  {date && (
                    <p className="text-xs text-gray-500">
                      {date.toLocaleString()}
                    </p>
                  )}
                </Card>
              );
            })}
          </div>
        ))}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-1/4 bg-gradient-to-r from-white dark:from-background" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-1/4 bg-gradient-to-l from-white dark:from-background" />
      </div>
    </>
  );
}
