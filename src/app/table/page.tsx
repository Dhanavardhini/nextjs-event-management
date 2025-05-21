"use client";

import React, { useEffect, useState } from "react";
import { EventsTable } from "../components/EventForm/Table";

type EventType = {
  id: number;
  name: string;
  email: string;
  eventType: string;
  participants: string | string[];
  eventDate: string;
  description?: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingEvent, setEditingEvent] = useState<EventType | null>(null);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      const data = await res.json();
      if (data.success) {
        setEvents(data.events);
      } else {
        console.error("Failed to load events");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEdit = (id: number) => {
    const eventToEdit = events.find((ev) => ev.id === id);
    if (eventToEdit) {
      setEditingEvent(eventToEdit);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setEvents(events.filter((event) => event.id !== id));
      } else {
        alert("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleUpdateEvent = async (updatedEvent: EventType) => {
    try {
      const res = await fetch(`/api/events/${updatedEvent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvent),
      });
      const data = await res.json();
      if (data.success) {
        setEvents((prev) =>
          prev.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev))
        );
        setEditingEvent(null); // Close edit form
      } else {
        alert("Failed to update event");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h1>Events List</h1>
      <EventsTable events={events} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Show edit form modal if editingEvent is set */}
      {editingEvent && (
        <EditEventForm
          event={editingEvent}
          onCancel={() => setEditingEvent(null)}
          onSave={handleUpdateEvent}
        />
      )}
    </div>
  );
}

function EditEventForm({
  event,
  onCancel,
  onSave,
}: {
  event: EventType;
  onCancel: () => void;
  onSave: (updatedEvent: EventType) => void;
}) {
  const [form, setForm] = useState<EventType>(event);

  
  const participantsArray =
    typeof form.participants === "string"
      ? JSON.parse(form.participants || "[]")
      : form.participants;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleParticipantsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions).map((o) => o.value);
    setForm((prev) => ({ ...prev, participants: selected }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate here if needed
    onSave(form);
  };

  return (
    <div className="modal show d-block" tabIndex={-1} role="dialog" style={{backgroundColor: "rgba(0,0,0,0.5)"}}>
      <div className="modal-dialog" role="document">
        <form className="modal-content p-3" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">Edit Event</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-control"
                required
                minLength={3}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="eventType" className="form-label">
                Event Type
              </label>
              <select
                id="eventType"
                name="eventType"
                value={form.eventType}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select event type</option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Conference">Conference</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="participants" className="form-label">
                Participants
              </label>
              <select
                id="participants"
                name="participants"
                multiple
                value={participantsArray}
                onChange={handleParticipantsChange}
                className="form-select"
                required
              >
                {["John", "Jane", "Doe", "Alice", "Bob"].map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="eventDate" className="form-label">
                Event Date
              </label>
              <input
                id="eventDate"
                name="eventDate"
                type="date"
                value={form.eventDate}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description || ""}
                onChange={handleChange}
                className="form-control"
                maxLength={500}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
