import { MessageItem } from "@/lib/assistant";
import React from "react";
import ReactMarkdown from "react-markdown";

interface MessageProps {
  message: MessageItem;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className="text-sm">
      {message.role === "user" ? (
        <div className="flex justify-end">
          <div>
            <div className="ml-4 rounded-[16px] px-4 py-2 md:ml-24 bg-accent dark:bg-accent text-accent-foreground dark:text-accent-foreground font-light">
              <div>
                <div>
                  <ReactMarkdown>
                    {message.content[0].text as string}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex">
            <div className="mr-4 rounded-[16px] px-4 py-2 md:mr-24 bg-primary dark:bg-primary text-primary-foreground dark:text-primary-foreground font-light">
              <div>
                <ReactMarkdown>
                  {message.content[0].text as string}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
