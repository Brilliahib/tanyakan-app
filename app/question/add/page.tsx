import Button from "@/app/components/Button/button";
import Card from "@/app/components/Card/card";
import Navbar from "@/app/components/Navbar/nav";

export default function AddQuestion() {
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
              name="question"
              id="question"
              className="flex w-full rounded-md border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 anim min-h-24 resize-none border mb-4"
              placeholder="Write a question"
            ></textarea>
            <Button bgColor="black" rounded="lg">
              Submit
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
