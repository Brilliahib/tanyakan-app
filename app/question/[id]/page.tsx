"use client";
import { useEffect, useState } from "react";
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
import { useAuth } from "@/app/context/AuthContext";
import { getAuth } from "firebase/auth";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { googleProvider, auth } from "@/lib/firebase/firebase";

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
  const { user } = useAuth();

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

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error logging in with Google:", error);
      // Handle error (e.g., show an error message)
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
      <div className="mx-auto w-full max-w-7xl format format-sm sm:format-base lg:format-lg py-4 lg:py-6 px-4">
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
            className="main-replies h-[50vh] space-y-6 overflow-y-auto scroll-smooth"
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
          <div className="mt-6 border-t">
            {user ? (
              <div className="mt-4 flex w-full gap-x-4 items-ends">
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
            ) : (
              <div className="text-center mt-2 flex justify-center">
                <div>
                  <p className="text-md text-gray-500 mb-4">
                    Please signin to chat
                  </p>
                  <button
                    onClick={handleGoogleLogin}
                    className="px-4 py-2 justify-center flex gap-x-2 items-center font-medium text-center rounded-md bg-white border text-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="30"
                      height="30"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      ></path>
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      ></path>
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                    </svg>
                    <span>Sign In with Google</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
