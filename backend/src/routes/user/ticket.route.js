import {Router} from "express"
import { addNote, createTicket, getNotesForUser, getTicketDetailByTicketId, getTicketsByUser } from "../../controllers/user/ticket.contoller.js";

const router = Router()

router.route("/create").post(createTicket)
router.route("/get/:userId").get(getTicketsByUser)
router.route("/addNote/:ticketId").put(addNote)
router.route("/getNote/:ticketItemId").get(getNotesForUser)
router.route("/getTicketDetail/:ticketId").get(getTicketDetailByTicketId)

export default router;