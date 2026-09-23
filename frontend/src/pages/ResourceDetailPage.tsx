import { useNavigate, useParams } from "react-router-dom";
import { getResource } from "../api/resource";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { createReservation } from "../api/reservation";
import axios from "axios";
import type { ErrorResponse } from "../types/reservation";

const ResourceDetailPage = () => {
  const { id } = useParams();

  const resourceId = Number(id);

  const navigate = useNavigate();

  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["resource", resourceId],
    queryFn: () => getResource(resourceId),
  });

  const createMutation = useMutation({
    mutationFn: createReservation,

    onSuccess: () => {
      navigate("/reservations");
    },

    onError: (e) => {
      return <div>Error! {e.message}</div>;
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    createMutation.mutate({ resourceId, startAt, endAt });
  }

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  if (!data) return <div>No Resource!</div>;

  return (
    <div>
      <h3>
        {data.name} ({data.status})
      </h3>
      <p>{data.description}</p>
      <h1>Create Reservation</h1>
      <form action="" onSubmit={handleSubmit}>
        <input type="datetime-local" value={startAt} onChange={(e) => setStartAt(e.target.value)} />
        <input type="datetime-local" value={endAt} onChange={(e) => setEndAt(e.target.value)} />
        <button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? "Creating..." : "Create Reservation"}
        </button>
      </form>

      {createMutation.isError && (
        <p>
          {axios.isAxiosError<ErrorResponse>(createMutation.error)
            ? createMutation.error.response?.data.message
            : "예약 중 오류가 발생했습니다."}
        </p>
      )}
    </div>
  );
};

export default ResourceDetailPage;
