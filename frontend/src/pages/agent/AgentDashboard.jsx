import { getListOfTicketsForAllUsers } from "@/store/agent/ticket-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import AgentTicketConversation from "@/components/agentDashboard/AgentTicketConversation";
import {
  getListOfNotes,
  getTicketDetailByTicketId,
} from "@/store/user/ticket-slice";
import UpdateTicketStatus from "./UpdateTicketStatus";


function AgentDashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListOfTicketsForAllUsers());
  }, [dispatch]);

  const { ticketListofAllUser } = useSelector((state) => state.agentTicket);
  const { user } = useSelector((state) => state.auth);
  console.log(ticketListofAllUser);

  const [openNoteDialog, setOpenNoteDialog] = useState(false);

  function handleFetchNotes(id) {
    dispatch(getListOfNotes({ ticketItemId: id }));
  }

  const { ticketDetail,noteList } = useSelector((state) => state.ticket);


  const [openUpdateTicketDialog, setOpenUpdateTicketDialog] = useState(false);

  function handleFetchTicketDetail(id) {
    dispatch(getTicketDetailByTicketId({ ticketId: id }));
  }

  const [isUpdate,setIsUpdate] = useState(true)

  useEffect(() => {
    if (ticketDetail !== null && isUpdate) setOpenUpdateTicketDialog(true);
  }, [ticketDetail]);

  useEffect(() => {
    if (noteList.length !== 0) setOpenNoteDialog(true);
  }, [noteList]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent tickets.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Ticket ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated On</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ticketListofAllUser &&
            ticketListofAllUser.map((ticketItem) => (
              <TableRow>
                <TableCell>{ticketItem.customerId._id}</TableCell>
                <TableCell>{ticketItem.title}</TableCell>
                <TableCell>
                  {ticketItem.status}
                  <Dialog
                    open={openUpdateTicketDialog}
                    onOpenChange={() => {
                      setOpenUpdateTicketDialog(false);
                    }}
                  >
                    <Button
                      onClick={() => {
                        // setOpenUpdateTicketDialog(true)
                        handleFetchTicketDetail(ticketItem._id);
                      }}
                    >
                      update
                    </Button>
                    <UpdateTicketStatus ticketDetail={ticketDetail} setOpenUpdateTicketDialog={setOpenUpdateTicketDialog}/>
                  </Dialog>
                </TableCell>
                {/* <TableCell>{ticketItem.customerName}</TableCell> */}
                <TableCell>{ticketItem.updatedAt.split("T")[0]}</TableCell>
                <TableCell>
                    <Dialog
                      open={openNoteDialog}
                      onOpenChange={() => {
                        setOpenNoteDialog(false);
                        // dispatch(resetTicketDetails());
                      }}
                    >
                      <Button
                        onClick={() =>{
                          handleFetchNotes(ticketItem?._id)
                          setIsUpdate(false)
                          handleFetchTicketDetail(ticketItem?._id)
                        }}
                        
                      >
                        reply
                      </Button>
                      <AgentTicketConversation noteList={noteList} ticketDetail={ticketDetail} />
                      
                    </Dialog>
                  </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AgentDashboard;
