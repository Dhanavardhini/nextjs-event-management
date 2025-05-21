
"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";
import { FormTextarea } from "./FormTextarea";

const participantsOptions = ["John", "Jane", "Doe", "Alice", "Bob"];
const eventTypes = ["Workshop", "Seminar", "Conference"];

export default function CreateEvent() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    eventType: "",
    participants: [] as string[],
    eventDate: "",
    description: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [minDate, setMinDate] = useState("");

  // Set today's date for minDate
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const nameRegex = /^[a-zA-Z0-9 ]+$/;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    else if (form.name.trim().length < 3)
      newErrors.name = "Name must be at least 3 characters";
    else if (!nameRegex.test(form.name.trim()))
      newErrors.name = "Name cannot contain special characters";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      newErrors.email = "Email is invalid";

    if (!form.eventType) newErrors.eventType = "Please select an event type";

    if (!form.participants.length)
      newErrors.participants = "Please select at least one participant";

    if (!form.eventDate) newErrors.eventDate = "Event date is required";

    if (form.description.length > 500)
      newErrors.description = "Description cannot exceed 500 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleParticipants = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions).map((o) => o.value);
    setForm((prev) => ({ ...prev, participants: selected }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await axios.post("/api/events", form);
      console.log(res);

      setSuccess("Event created successfully!");
      setForm({
        name: "",
        email: "",
        eventType: "",
        participants: [],
        eventDate: "",
        description: "",
      });
      setErrors({});
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div
        className="mx-auto bg-white p-4 p-md-4 rounded shadow"
        style={{ maxWidth: "700px" }}
      >
        <h2 className="mb-4 text-center">Create Event</h2>
        <form onSubmit={handleSubmit} noValidate>
          <FormInput
            id="name"
            label="Name"
            name="name"
            value={form.name}
            placeholder="Enter name"
            required
            minLength={3}
            error={errors.name}
            onChange={handleChange}
          />

          <FormInput
            id="email"
            label="Email"
            name="email"
            type="email"
            value={form.email}
            placeholder="Enter email"
            required
            error={errors.email}
            onChange={handleChange}
          />

          <FormSelect
            id="eventType"
            label="Event Type"
            name="eventType"
            value={form.eventType}
            options={eventTypes}
            required
            error={errors.eventType}
            onChange={handleChange}
          />

          <FormSelect
            id="participants"
            label="Participants"
            name="participants"
            value={form.participants}
            options={participantsOptions}
            multiple
            required
            error={errors.participants}
            onChange={handleParticipants}
          />

          <FormInput
            id="eventDate"
            label="Event Date"
            name="eventDate"
            type="date"
            value={form.eventDate}
            required
            error={errors.eventDate}
            onChange={handleChange}
            min={minDate}
          />

          <FormTextarea
            id="description"
            label="Description"
            name="description"
            value={form.description}
            maxLength={500}
            error={errors.description}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="btn btn-primary w-100 mb-2"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>

          {success && (
            <div className="alert alert-success text-center" role="alert">
              {success}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
