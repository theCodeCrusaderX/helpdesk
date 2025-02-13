import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import UserCreateTicket from "@/components/userDashboard/userCreateTicket";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [openTicketDialog, setOpenTicketDialog] = useState(false);
  const navigate = useNavigate()

  return (
    <div className="flex gap-4">
      {/* Create Ticket Button */}
      <Dialog open={openTicketDialog} onOpenChange={setOpenTicketDialog}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpenTicketDialog(true)}>Create Ticket</Button>
        </DialogTrigger>
        <DialogContent>
          <UserCreateTicket onClose={() => setOpenTicketDialog(false)} />
        </DialogContent>
      </Dialog>

      {/* View Ticket Button (Functionality can be added later) */}
      <Button variant="outline" onClick={() => navigate('/view/tickets')}>View Ticket</Button>
    </div>
  );
}

export default Dashboard;
