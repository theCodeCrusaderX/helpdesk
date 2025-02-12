import React from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

function AuthRegister() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = (data) => {
    console.log(data);

    dispatch(registerUser(data))
      .then((res) => {

        if (res?.payload?.success) {
          toast({
            title: res?.payload?.data,
            description:
              "You have successfully registered. Please log in to continue.",
          });
          navigate("/auth/login");
        } else {
          toast({
            title: "Error",
            description: res?.payload?.data,
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        console.error("Error during registration:", err);
        toast({
          title: "Error",
          description: res?.payload?.data,
          variant: "destructive",
        });
      });
  };
  return (
    <div>
      <div className="flex flex-col mb-2">
        <p>
          already have account <Link to="/auth/login">LogIn</Link>
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label>Enter your name</Label>
          <Input type="text" placeholder="Enter name" {...register("name")} />
          <Label>Enter your email</Label>
          <Input type="text" placeholder="Enter email" {...register("email")} />
          <Label>Enter your password</Label>
          <Input
            type="password"
            placeholder="Enter password"
            {...register("password")}
          />

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default AuthRegister;
