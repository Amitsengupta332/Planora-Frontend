/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useEffect, useState } from "react";
// import { getCurrentUserClient } from "@/services/auth";
// import { getEventById, TEvent } from "@/services/events";
// import EventParticipantsManager from "@/components/dashboard/EventParticipantsManager";

// type Props = {
//   id: string;
// };

// export default function EventParticipantsClient({ id }: Props) {
//   const [event, setEvent] = useState<TEvent | null>(null);
//   const [currentUser, setCurrentUser] = useState<any | undefined>(undefined);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const user = getCurrentUserClient();
//     setCurrentUser(user);
//   }, []);

//   useEffect(() => {
//     if (currentUser === undefined) return;
//     if (!currentUser) return;

//     const fetchEvent = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const res = await getEventById(id);

//         if (!res?.success) {
//           throw new Error(res?.message || "Failed to load event");
//         }

//         setEvent(res.data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to load event");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvent();
//   }, [id, currentUser]);

//   if (currentUser === undefined) {
//     return <p className="text-sm text-muted-foreground">Loading event...</p>;
//   }

//   if (!currentUser) {
//     return <p className="text-sm text-red-500">You must be logged in.</p>;
//   }

//   if (loading) {
//     return <p className="text-sm text-muted-foreground">Loading event...</p>;
//   }

//   if (error || !event) {
//     return <p className="text-sm text-red-500">{error || "Event not found"}</p>;
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold">Manage Participants</h1>
//         <p className="text-sm text-muted-foreground">
//           Only the event owner or admin can approve, reject, or ban participants.
//         </p>
//       </div>

//       <EventParticipantsManager
//         id={id}
//         creatorId={event.creatorId}
//         currentUser={currentUser}
//       />
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { getCurrentUserClient } from "@/services/auth";
import { getEventById, TEvent } from "@/services/events";
import EventParticipantsManager from "@/components/dashboard/EventParticipantsManager";
import { toast } from "sonner";

type Props = {
  id: string;
};

export default function EventParticipantsClient({ id }: Props) {
  const [event, setEvent] = useState<TEvent | null>(null);
  const [currentUser, setCurrentUser] = useState<any | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Get user
  useEffect(() => {
    const user = getCurrentUserClient();
    setCurrentUser(user);

    if (!user) {
      toast.error("You must be logged in to view this page.");
    }
  }, []);

  // ✅ Fetch event
  useEffect(() => {
    if (currentUser === undefined) return;
    if (!currentUser) return;

    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getEventById(id);

        if (!res?.success) {
          throw new Error(res?.message || "Failed to load event");
        }

        setEvent(res.data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load event";

        setError(message);

        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, currentUser]);

  // ✅ Hydration-safe UI
  if (currentUser === undefined) {
    return <p className="text-sm text-muted-foreground">Loading event...</p>;
  }

  if (!currentUser) {
    return <p className="text-sm text-red-500">You must be logged in.</p>;
  }

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading event...</p>;
  }

  if (error || !event) {
    return <p className="text-sm text-red-500">{error || "Event not found"}</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Manage Participants</h1>
        <p className="text-sm text-muted-foreground">
          Only the event owner or admin can approve, reject, or ban participants.
        </p>
      </div>

      <EventParticipantsManager
        id={id}
        creatorId={event.creatorId}
        currentUser={currentUser}
      />
    </div>
  );
}