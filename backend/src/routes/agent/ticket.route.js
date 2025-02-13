import {Router} from "express"
import { getAllTickets, updateTicketStatus } from "../../controllers/agent/ticket.controller.js";

const router = Router()

// router.route("/create").post(createTicket)
// router.route("/get/:userId").get(getTicketsByUser)
// router.route("/addNote/:ticketId").put(addNote)
// router.route("/getNote/:senderId").get(getNotesForUser)

router.route("/get").get(getAllTickets)
router.route("/update/:id").put(updateTicketStatus)

export default router;