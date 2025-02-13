import { Ticket } from "../../models/user/ticket.model.js";

const getAllTickets = async (req, res) => {
  try {

    // Find all tickets for the given user
    const tickets = await Ticket.find({})

    // If no tickets are found, return a 404 response
    if (tickets.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tickets found for this user",
      });
    }

    // Return the list of tickets
    res.status(200).json({
      success: true,
      data: tickets,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateTicketStatus = async (req,res) => {
  try {

    console.log("hello");
    
    const { id } = req.params;
    const { status } = req.body;

    console.log(id,status);
    
    
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "ticket not found!",
      });
    }

    ticket.status = status;
    await ticket.save(); // Save the updated order to the database

    res.status(200).json({
      success: true,
      message: "ticket status updated",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
}

export {getAllTickets,updateTicketStatus}