import { DialogContent } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useToast } from "@/hooks/use-toast";
import {
  getListOfTicketsForAllUsers,
  updateTicketStatus,
} from "@/store/agent/ticket-slice";

function UpdateTicketStatus({ ticketDetail,setOpenUpdateTicketDialog }) {
  const { toast } = useToast();

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { handleSubmit, control, reset } = useForm();

  const defaultValues = {
    status: "",
  };

  function onSubmit(data) {
    console.log(data.status);

    dispatch(
      updateTicketStatus({ id: ticketDetail._id, status: data.status })
    ).then((res) => {
      if (res?.payload?.success) {
        dispatch(getListOfTicketsForAllUsers());
        reset(defaultValues);
        toast({
          title: 'status updated successfully',
        });
        setOpenUpdateTicketDialog(false)
      }
    });
  }

  return (
    <DialogContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label>Ticket Status</Label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value} // Dynamically set value
              onValueChange={field.onChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <Button type="submit">update ticket status</Button>
      </form>
    </DialogContent>
  );
}

export default UpdateTicketStatus;
