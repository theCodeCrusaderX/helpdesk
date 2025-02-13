import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { createTicket } from "@/store/user/ticket-slice";

function UserCreateTicket({ onClose }) {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { user } = useSelector((state) => state.auth);
  console.log("333", user);

  function onSubmit(data) {
    console.log(data);

    dispatch(createTicket({ title: data.question, customerId: user._id })).then(
      (res) => {
        if (res.payload.success) {
          toast({
            title: res?.payload?.message,
            description: "Your ticket created successfully!",
          });
        }
      }
    );

    // toast({ description: "Ticket Created Successfully!" });
    reset();
    onClose();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Label htmlFor="question">Enter your question</Label>
      <Input
        id="question"
        type="text"
        placeholder="Enter Your Question"
        {...register("question", { required: true })}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}

export default UserCreateTicket;
