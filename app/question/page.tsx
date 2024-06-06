"use client";
import React, { useState } from "react";
import Card from "../components/Card/card";
import Navbar from "../components/Navbar/nav";
import SearchBar from "../components/SearchBar/search-bar";

const questions = [
  {
    id: 1,
    date: "5/30/2024, 11:34:33 PM",
    title: "Bagaimana caranya bisa menjadi Software Engineer?",
  },
  {
    id: 2,
    date: "5/30/2024, 11:47:38 PM",
    title: "Semangat terus ges! aku capek :p",
  },
];

export default function Question() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="mx-auto w-full max-w-3xl format format-sm sm:format-base lg:format-lg py-4 lg:py-8 px-4 md:px-0">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-xl">Cari Pertanyaan</h1>
          <SearchBar onSearchChange={handleSearchChange} />
        </div>
        {filteredQuestions.map((question) => (
          <Card key={question.id} rounded="md">
            <p className="text-xs text-gray-500 mb-2">{question.date}</p>
            <p className="text-base font-semibold text-slate-900">
              {question.title}
            </p>
          </Card>
        ))}
      </div>
    </>
  );
}
