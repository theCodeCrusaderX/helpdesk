import { getListOfNotes, getListOfTickets, getTicketDetailByTicketId } from "@/store/user/ticket-slice";
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
import { Button } from "@/components/ui/button";

import { Dialog } from "@/components/ui/dialog";
import UserNotes from "@/components/userDashboard/UserNotes";
import { resetTicketDetails } from "@/store/user/ticket-slice";
import UserTicketConversation from "@/components/userDashboard/UserTicketConversation";

function ViewTickets() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {ticketList,ticketDetail,noteList} = useSelector((state) => state.ticket) 

  console.log('4040',ticketList);
  
  useEffect(() => {
    dispatch(getListOfTickets({ userId: user._id })).then((res) =>
      console.log(res)
    );
  }, [dispatch]);

  const [openAddNoteDialog,setOpenAddNoteDialog] = useState(false)
  const [openTicketConversationDialog,setOpenTicketConversationDialog] = useState(false)

  function handleFetchTicketDetails(id) {
    // dispatch(getListOfTickets({userId : user._id}))
    dispatch(getTicketDetailByTicketId({ticketId : id}))
  }

  function handleFetchNotes(id) {
    dispatch(getListOfNotes({ticketItemId : id}))
  }

  useEffect(() => {
    if (ticketDetail !== null) setOpenAddNoteDialog(true);
  }, [ticketDetail]);

  useEffect(() => {
    if (noteList.length !== 0) setOpenTicketConversationDialog(true);
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
            <TableHead>Ticket Conversation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {ticketList &&
              ticketList.map((ticketItem) => (
                <TableRow>
                  <TableCell>{ticketItem._id}</TableCell>
                  <TableCell>{ticketItem.title}</TableCell>
                  <TableCell>{ticketItem.status}</TableCell>
                  <TableCell>{ticketItem.updatedAt.split("T")[0]}</TableCell>
                  <TableCell>
                    <Dialog
                      open={openAddNoteDialog}
                      onOpenChange={() => {
                        setOpenAddNoteDialog(false);
                        dispatch(resetTicketDetails());
                      }}
                    >
                      <Button
                        onClick={() =>{
                          handleFetchTicketDetails(ticketItem?._id)
                        }}
                        
                      >
                        Add Notes
                      </Button>
                      <UserNotes ticketDetail={ticketDetail} isOpen={() => setOpenAddNoteDialog(false)} />
                      
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <Dialog
                      open={openTicketConversationDialog}
                      onOpenChange={() => {
                        setOpenTicketConversationDialog(false);
                        dispatch(resetTicketDetails());
                      }}
                    >
                      <Button
                        onClick={() => {
                          handleFetchNotes(ticketItem?._id)
                        }}
                        
                      >
                        conversation
                      </Button>
                      <UserTicketConversation noteList={noteList} />
                      
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
      </Table>
    </div>
  );
}

export default ViewTickets;
