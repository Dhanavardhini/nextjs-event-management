import { ClientOnly } from "../components/EventForm/Client";
import CreateEvent from "../components/EventForm/EventForm";

export default function Page() {
  return (
    <ClientOnly>
      <CreateEvent />
    </ClientOnly>
  );
}
