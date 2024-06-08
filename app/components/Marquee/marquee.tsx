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
      <div className="relative flex overflow-x-hidden">
        <div className="py-12 animate-marquee whitespace-nowrap flex gap-x-4">
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
        <div className="absolute top-0 py-12 animate-marquee2 whitespace-nowrap flex gap-x-4 ml-4">
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
      </div>
    </>
  );
}
