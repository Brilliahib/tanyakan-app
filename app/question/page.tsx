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

interface Question {
  id: string;
  text: string;
  user: {
    uid: string;
    displayName: string;
    photoURL: string;
  };
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
    const questionCollection = collection(firestore, "question"); // Corrected collection name to "questions"
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
    return <p>Loading...</p>;
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
      <div className="mx-auto w-full max-w-3xl format format-sm sm:format-base lg:format-lg py-4 lg:py-8 px-4 md:px-0">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-xl">Cari Pertanyaan</h1>
          <SearchBar onSearchChange={handleSearchChange} />
        </div>
        {filteredQuestions.map((question) => {
          const date = question.timestamp
            ? new Date(question.timestamp.seconds * 1000)
            : null;
          return (
            <Card key={question.id} rounded="md">
              <p className="text-lg font-semibold text-slate-900 mb-2">
                {question.text}
              </p>
              {date && (
                <p className="text-xs text-gray-500">{date.toLocaleString()}</p>
              )}
            </Card>
          );
        })}
      </div>
    </>
  );
}
