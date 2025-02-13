import { Ticket } from "../../models/user/ticket.model.js";

const createTicket = async (req, res) => {
  try {
    const { title, customerId } = req.body;

    console.log(title, customerId);

    if (!title || !customerId) {
      return res.status(400).json({
        success: false,
        message: "please provide all details",
      });
    }

    const newlyCreatedTicket = new Ticket({
      title,
      customerId,
    });

    await newlyCreatedTicket.save();

    res.status(201).json({
      success: true,
      data: newlyCreatedTicket,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const getTicketsByUser = async (req, res) => {
  try {
    const { userId } = req.params; // Assuming userId is passed as a URL parameter

    // Validate userId
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Find all tickets for the given user
    const tickets = await Ticket.find({ customerId: userId }).populate(
      "customerId",
      "name email" // Include user's name and email in the response
    );

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

const addNote = async (req, res) => {
  try {
    const { ticketId } = req.params; // Ticket ID from URL
    const { senderId, text } = req.body; // Sender (customer/agent) and note text

    // Validate input
    if (!ticketId || !senderId || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Ticket ID, sender ID, and note text are required",
      });
    }

    // Find the ticket by ID
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }


    // Add the new note
    const newNote = {
      sender: senderId,
      text: text.trim(),
      timestamp: new Date(),
    };

    ticket.note.push(newNote);
    ticket.lastUpdatedOn = new Date(); // Update last updated timestamp

    // Save the updated ticket
    await ticket.save();

    res.status(200).json({
      success: true,
      message: "Note added successfully",
      data: ticket,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getNotesForUser = async (req, res) => {
  try {
    const { ticketItemId } = req.params; // Sender ID from URL
    console.log(ticketItemId);
    
    

    // Validate input
    if (!ticketItemId) {
      return res.status(400).json({
        success: false,
        message: "ticketItemId is required",
      });
    }

    // Find all tickets that have notes from the specified sender
    const ticket = await Ticket.findById(ticketItemId).populate({
      path: 'note.sender',
      select: 'name role', // Select only the name and role fields from the User model
    });    

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "ticket not found",
      });
    }


    res.status(200).json({
      success: true,
      message: "Notes retrieved successfully",
      data: ticket.note,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


const getTicketDetailByTicketId = async (req, res) => {
  const { ticketId } = req.params; // Extract ticketId from the request parameters

  if (!ticketId) {
    return res.status(400).json({
      success: false,
      message: "Ticket ID is required.",
    });
  }

  try {
    // Fetch the ticket details from the database using the ticketId
    const ticket = await Ticket.findById(ticketId)

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found.",
      });
    }

    // Return the ticket details in the response
    res.status(200).json({
      success: true,
      message: "Ticket details fetched successfully.",
      data: ticket,
    });
  } catch (error) {
    console.error("Error fetching ticket details:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching ticket details.",
      error: error.message,
    });
  }
};




export { createTicket,getTicketsByUser,addNote,getNotesForUser,getTicketDetailByTicketId };
