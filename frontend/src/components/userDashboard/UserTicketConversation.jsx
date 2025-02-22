import React from "react";
import { DialogContent } from "../ui/dialog";

function UserTicketConversation({noteList}) {
  console.log("500", noteList);

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
    </DialogContent>
  );
}

export default UserTicketConversation;
