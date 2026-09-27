import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { cancelReservation, getReservations } from "../api/reservation";

export const ReservationPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["reservations"],
    queryFn: getReservations,
  });

  const queryClient = useQueryClient();

  const cancelMutation = useMutation({
    mutationFn: cancelReservation,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["reservations"],
      }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!data || data.length == 0) return <div>No reservations!</div>;

  return (
    <div className="py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Reservations</h1>
        <p className="mt-2 text-sm text-gray-500">View and manage your reservations</p>
      </div>

      <ul className="my-8 space-y-4">
        {data.map((d) => (
          <li key={d.reservationId} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold text-gray-900">{d.resourceName}</h2>
                <p className="mt-2 text-sm text-gray-500">
                  {d.startAt} ~ {d.endAt}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${d.reservationStatus === "RESERVED" ? "bg-green-50 text-green-700" : d.reservationStatus === "COMPLETED" ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-600"}`}
              >
                {d.reservationStatus}
              </span>
            </div>

            {d.reservationStatus === "RESERVED" && (
              <button
                onClick={() => cancelMutation.mutate(d.reservationId)}
                className="mt-5 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors duration-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                disabled={cancelMutation.isPending}
              >
                Cancel
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
