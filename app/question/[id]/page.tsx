"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  doc,
  getDoc,
  collection,
  getFirestore,
  query,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import app from "@/lib/firebase/firebase";
import Navbar from "@/app/components/Navbar/nav";
import Card from "@/app/components/Card/card";
import Button from "@/app/components/Button/button";
import { getAuth } from "firebase/auth";

interface Question {
  text: string;
  displayName: string;
  photoURL: string;
}

interface Reply {
  text: string;
  displayName: string;
  photoURL: string;
  timestamp: any;
}

export default function QuestionDetail({ params }: { params: { id: string } }) {
  const { id } = params; // Get the question ID from the URL
  const [question, setQuestion] = useState<Question | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [newReply, setNewReply] = useState<string>("");

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

    const fetchReplies = () => {
      if (id) {
        try {
          const firestore = getFirestore(app);
          const repliesRef = collection(firestore, "question", id, "replies");
          const q = query(repliesRef);
          onSnapshot(q, (querySnapshot) => {
            const repliesData: Reply[] = [];
            querySnapshot.forEach((doc) => {
              repliesData.push(doc.data() as Reply);
            });
            setReplies(repliesData);
          });
        } catch (error) {
          console.error("Error fetching replies:", error);
        }
      }
    };

    fetchQuestion();
    fetchReplies();
  }, [id]);

  const handleReplySubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (newReply.trim()) {
      try {
        const firestore = getFirestore(app);
        const repliesRef = collection(firestore, "question", id, "replies");
        const auth = getAuth(app);
        const user = auth.currentUser;

        if (!user) {
          throw new Error("User not authenticated");
        }

        const { displayName, photoURL } = user;

        await addDoc(repliesRef, {
          text: newReply,
          displayName: displayName,
          photoURL: photoURL,
          timestamp: new Date(),
        });
        setNewReply("");
      } catch (error) {
        console.error("Error adding reply:", error);
      }
    }
  };

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
        <div className="mt-4">
          <div className="head-replies mb-6">
            <h1 className="text-lg font-semibold">Replies</h1>
          </div>
          <div
            className="main-replies mb-4 h-[53vh] space-y-6 overflow-y-auto scroll-smooth md:h-[51vh]"
            style={{ scrollbarWidth: "none" }}
          >
            {replies.map((reply, index) => (
              <div key={index} className="flex items-start gap-x-4">
                <img
                  src={reply.photoURL}
                  alt={reply.displayName}
                  className="rounded-full w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
                />
                <div>
                  <h2 className="font-semibold text-sm md:text-base mb-2">
                    {reply.displayName}
                  </h2>
                  <div className="rounded-xl rounded-tl-none bg-neutral-100 px-3 py-2">
                    <p>{reply.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-x-4 mt-12">
            <textarea
              name="reply"
              id="reply"
              className="flex w-full rounded-md border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none border"
              placeholder="Type your message..."
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
            ></textarea>
            <button
              onClick={handleReplySubmit}
              className="p-4 bg-black rounded-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#fff"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
