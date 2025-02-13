import React from "react";
import { DialogContent } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { addNote } from "@/store/user/ticket-slice";

function AgentTicketConversation({ noteList, ticketDetail }) {
  const { register, handleSubmit, reset } = useForm();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    const messageData = {
      senderId: user._id,
      text: data.reply,
    };

    dispatch(addNote({ ticketId: ticketDetail._id, messageData })).then(
      (res) => {
        if (res?.payload?.success) {
          toast({
            title: res?.payload?.message,
            description: "Reply added successfully!",
          });
          reset();
        }
      }
    );
  };

  return (
    <DialogContent className="p-4">
      <h2 className="text-lg font-semibold mb-3">Ticket Notes</h2>
      {noteList.length === 0 ? (
        <p className="text-gray-500">No notes available.</p>
      ) : (
        <ul className="space-y-3">
          {noteList.map((note, index) => (
            <li
              key={index}
              className={`p-3 rounded-lg shadow-sm border ${
                note.sender.role === "agent"
                  ? "bg-blue-100 border-blue-300"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              <p className="text-sm text-gray-700">
                <span className="font-semibold">
                  {note.sender.role === "agent" ? "Agent" : "User"} :
                </span>{" "}
                {note.text}
              </p>
              <span className="text-xs text-gray-500 block mt-1">
                📅 {note.timestamp.split("T")[0]}
              </span>
            </li>
          ))}
        </ul>
      )}
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
          <Input
            type="text"
            placeholder="Give your reply"
            {...register("reply", { required: true })}
            className="flex-1"
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </DialogContent>
  );
}

export default AgentTicketConversation;
