import ChatBubble from "../molecules/ChatBubble";

type ClassDiscussionProps = {
  course: string;
};

interface Discussion {
  name: string;
  time: Date;
  message: string;
}

const discussions: Discussion[] = [
  {
    message:
      "Hi, I will like to further ask the biblical references of the Trinity. I know there is one God, but I’m trying to understand how there are three personalities of Godhead: the Father, the Son and the Holy Spirit",
    name: "Esther Busari",
    time: new Date(),
  },
  {
    message:
      "Thank you for your comment. There is only one God as you rightly stated, but the Father God in His unsearchable wisdom has two more persons (beings) - they are the Lord Jesus and the Holy Spirit.",
    name: "John Ade",
    time: new Date(),
  },
];

export default function ClassDiscussion({ course }: ClassDiscussionProps) {
  //fetch discussion based on course id

  const data = discussions;

  const dataIsValid = Array?.isArray(data);

  return (
    <div>
      {/* Loaders */}

      {/* Chats */}
      {dataIsValid &&
        data?.map(({ name: userName, ...others }, i) => {
          const isRecipient = i % 2 !== 0;
          const props = {
            userName,
            isRecipient,
            ...others,
          };

          return (
            <li key={`${userName}${i}`}>
              <ChatBubble {...props} />
            </li>
          );
        })}
    </div>
  );
}
