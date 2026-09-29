import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { cancelReservation, getReservations } from "../api/reservation";
import ReservationCard from "../components/ReservationCard";

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
  if (!data) return <div>No reservation available.</div>;

  return (
    <div className="py-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Reservations</h1>
        <p className="mt-2 text-sm text-gray-500">View and manage your reservations</p>
      </div>

      {data.length === 0 ? (
        <p>No reservation found.</p>
      ) : (
        <ul className="my-8 space-y-4">
          {data.map((reservation) => (
            <ReservationCard
              key={reservation.reservationId}
              reservation={reservation}
              onCancel={(id) => cancelMutation.mutate(id)}
              isCanceling={cancelMutation.isPending}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
