
import React from "react";

type EventType = {
  id: number;
  name: string;
  email: string;
  eventType: string;
  participants: string | string[];
  eventDate: string;
  description?: string;
};

interface TableProps {
  events: EventType[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

function parseParticipants(participants: string | string[]): string[] {
  if (Array.isArray(participants)) return participants;
  try {
    return JSON.parse(participants);
  } catch {
    return [];
  }
}

export function EventsTable({ events, onEdit, onDelete }: TableProps) {
  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Event Type</th>
            <th>Participants</th>
            <th>Event Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => {
            const participantsArray = parseParticipants(event.participants);
            return (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td>{event.email}</td>
                <td>{event.eventType}</td>
                <td>{participantsArray.join(", ")}</td>
                <td>{event.eventDate}</td>
                <td>{event.description}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => onEdit(event.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(event.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
