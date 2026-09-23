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
    <div>
      <h1>Reservations</h1>
      <ul>
        {data.map((d) => (
          <li key={d.reservationId}>
            <h2>{d.resourceName}</h2>
            <p>
              {d.startAt} ~ {d.endAt}
            </p>
            <span>{d.reservationStatus}</span>
            <button onClick={() => cancelMutation.mutate(d.reservationId)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
