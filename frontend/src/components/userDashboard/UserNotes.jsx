import { useForm } from "react-hook-form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input"; // Ensure Input is imported from your UI library
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "@/store/user/ticket-slice";
import { useToast } from "@/hooks/use-toast";

function UserNotes({ ticketDetail }) {
  console.log("302", ticketDetail);

  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  // Handle message submission
  const onSubmit = (data) => {
    if (!data.note.trim()) return;

    console.log("User Message:", data.note); // You can handle it as needed
    console.log("02:", ticketDetail._id); // You can handle it as needed

    const messageData = {
      senderId: user._id,
      text: data.note,
    };

    dispatch(addNote({ ticketId: ticketDetail._id, messageData })).then((res) => {
      if (res?.payload?.success) {
        toast({
          title: res?.payload?.message,
          description: "Note added successfully!",
        });
        reset(); // Clear input after submission
      }
    });
  };

  return (
    <DialogContent className="flex flex-col p-4">
      <Label className="text-lg font-semibold mb-2">Add Ticket</Label>

      <Separator className="my-2" />

      {/* Input Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
        <Input
          type="text"
          placeholder="Type your message..."
          {...register("note", { required: true })}
          className="flex-1"
        />
        <Button type="submit">Send</Button>
      </form>
    </DialogContent>
  );
}

export default UserNotes;
