"use client";
import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import app from "@/lib/firebase/firebase";
import Card from "../components/Card/card";
import Navbar from "../components/Navbar/nav";
import SearchBar from "../components/SearchBar/search-bar";
import Button from "../components/Button/button";

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

export default function Questions() {
  // Renamed component to Questions for better clarity
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <div className="w-8 h-8 border-4 border-black border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredQuestions = questions.filter((question) =>
    question.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="w-full bg-[#fafafa]">
        <div className="mx-auto w-full max-w-7xl format format-sm sm:format-base lg:format-lg py-4 lg:py-8 px-4 md:px-0">
          <div className="flex justify-between items-center mb-4">
            <Button href="/question/add" rounded="lg" width="fit">
              Add New Question
            </Button>
            <SearchBar onSearchChange={handleSearchChange} />
          </div>
          {filteredQuestions.map((question) => {
            const date = question.timestamp
              ? new Date(question.timestamp.seconds * 1000)
              : null;
            return (
              <Card
                key={question.id}
                rounded="md"
                href={`/question/${question.id}`}
              >
                <div className="flex items-center gap-x-2 mb-2">
                  <img
                    src={question.photoURL}
                    alt={question.displayName}
                    className="rounded-full w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
                  />
                  <h1 className="font-semibold text-sm md:text-base">
                    {question.displayName}
                  </h1>
                </div>
                <p className="text-lg font-semibold text-slate-900 mb-2 hover:underline cursor-pointer">
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
