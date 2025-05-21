export default function Home() {
  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Create Event – Task</h1>

      <p>
        Build a responsive <strong>Create Event</strong> form page in this
        project using the provided route.
      </p>

      <h2>Route</h2>
      <p>
        <code>/create-event</code>
      </p>

      <h2>Objective</h2>
      <ul>
        <li>Create an event form with the specified fields</li>
        <li>Connect the form to a backend API for storing data</li>
        <li>Clear the form on submission</li>
        <li>Ensure responsiveness and user-friendly behavior</li>
        <li>Display a success alert after the form is submitted</li>
      </ul>

      <h2>Form Fields</h2>
      <table className="table table-striped">
        <thead><tr><th>Field</th><th>Type</th><th>Validation</th></tr></thead>
        <tbody>
          <tr><td>Name</td><td>Text input</td><td>Required, min 3 chars, no special characters</td></tr>
          <tr><td>Email</td><td>Email input</td><td>Required, valid email</td></tr>
          <tr><td>Event Type</td><td>Single select</td><td>Required (Workshop, Seminar, Conference)</td></tr>
          <tr><td>Participants</td><td>Multi-select</td><td>At least 1 (User1, User2, User3)</td></tr>
          <tr><td>Event Date</td><td>Date input</td><td>Required, future date</td></tr>
          <tr><td>Description</td><td>Textarea</td><td>Optional, max 500 chars</td></tr>
        </tbody>
      </table>

      <h2>Behavior Requirements</h2>
      <ul>
        <li>Form should validate inputs on submit (validation is optional, you can skip it if you&apos;re not familiar with it)</li>
        <li>Form should reset after submission</li>
        <li>Show inline validation errors if validation is implemented</li>
        <li>Make the layout responsive</li>
        <li>Display a success alert after submission</li>
      </ul>

      <h2>UI Expectations</h2>
      <table className="table table-bordered w-auto">
        <tbody>
          <tr><td>Name:</td><td><input type="text" className="form-control" placeholder="Enter name" /></td></tr>
          <tr><td>Email:</td><td><input type="email" className="form-control" placeholder="Enter email" /></td></tr>
          <tr><td>Event Type:</td><td><select className="form-select"><option>Select one</option></select></td></tr>
          <tr><td>Participants:</td><td><select multiple className="form-select"><option>Multi select</option></select></td></tr>
          <tr><td>Event Date:</td><td><input type="date" className="form-control" /></td></tr>
          <tr><td>Description:</td><td><textarea className="form-control" rows={3}></textarea></td></tr>
          <tr><td colSpan={2}><button className="btn btn-primary w-100">Submit</button></td></tr>
        </tbody>
      </table>

      <h2>Backend Requirement</h2>
      <ul>
        <li>Create an API route to handle the event data</li>
        <li>Use a simple SQLite database with raw queries (no ORM required)</li>
        <li>Implement basic CRUD (Create, Read, Update, Delete) endpoints</li>
        <li>Use file-based storage in the repo (e.g., SQLite file fine)</li>
      </ul>

      <h2>API Endpoints</h2>
      <ul>
        <li><strong>GET /api/events</strong> - Get the list of events</li>
        <li><strong>POST /api/events</strong> - Create a new event</li>
        <li><strong>GET /api/events/[id]</strong> - Get event details by ID</li>
        <li><strong>PUT /api/events/[id]</strong> - Update an existing event by ID</li>
        <li><strong>DELETE /api/events/[id]</strong> - Delete an event by ID</li>
      </ul>

      <h2>Bonus (Optional)</h2>
      <ul>
        <li>Disable submit button while submitting</li>
        <li>Extract form as a reusable component</li>
      </ul>
    </div>
  );
}
