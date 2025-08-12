import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [ticketName, setTicketName] = useState("");
  const [qty, setQty] = useState(1);
  const [email, setEmail] = useState("");

  useEffect(() => {
    api.get(`/events/${id}`).then((r) => setEvent(r.data));
  }, [id]);

  async function buy() {
    try {
      const res = await api.post("/bookings", {
        eventId: id,
        ticketName,
        qty,
        buyerEmail: email
      });
      alert("Booking success! ID: " + res.data._id);
      setTicketName("");
      setQty(1);
      setEmail("");
    } catch (e) {
      alert(e.response?.data?.msg || "Error booking ticket");
    }
  }

  if (!event) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">{event.title}</h1>
      <p>{event.description}</p>
      <p className="text-sm text-gray-600">
        {new Date(event.date).toLocaleString()} — {event.location}
      </p>

      <div className="p-4 bg-white rounded shadow space-y-3">
        <div>
          <label className="block">Select Ticket</label>
          <select
            value={ticketName}
            onChange={(e) => setTicketName(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">-- choose --</option>
            {event.tickets.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name} — ₹{t.price} ({t.qty} left)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block">Quantity</label>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block">Your Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <button
          onClick={buy}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Buy Ticket
        </button>
      </div>
    </div>
  );
}
