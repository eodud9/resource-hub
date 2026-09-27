import { useNavigate, useParams } from "react-router-dom";
import { getResource } from "../api/resource";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { createReservation } from "../api/reservation";
import axios from "axios";
import type { ErrorResponse } from "../types/api";

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
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    createMutation.mutate({ resourceId, startAt, endAt });
  }

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error</div>;

  if (!data) return <div>No Resource!</div>;

  return (
    <div className="py-10">
      <button
        onClick={() => navigate("/resources")}
        className="text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-gray-900 cursor-pointer"
      >
        ← Back to Resource
      </button>
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">{data.name}</h1>
            <p className="mt-1 text-sm font-medium text-gray-500">{data.type}</p>
          </div>
          <span
            className={
              data.status === "AVAILABLE"
                ? "rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700"
                : "rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700"
            }
          >
            {data.status}
          </span>
        </div>

        <p className="mt-6 text-sm leading-6 text-gray-600">{data.description}</p>
      </div>
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Create Reservation</h1>
          <p className="mt-1 text-sm text-gray-500">Select the start and end time for your reservation.</p>
        </div>
        <form action="" onSubmit={handleSubmit} className="mt-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="startAt" className="mb-2 block text-sm font-medium text-gray-700">
                Start Time
              </label>
              <input
                id="startAt"
                type="datetime-local"
                value={startAt}
                required
                onChange={(e) => setStartAt(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition-colors duration-200 focus:border-gray-900"
              />
            </div>
            <div>
              <label htmlFor="endAt" className="mb-2 block text-sm font-medium text-gray-700">
                End Time
              </label>
              <input
                id="endAt"
                type="datetime-local"
                value={endAt}
                required
                onChange={(e) => setEndAt(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition-colors duration-200 focus:border-gray-900"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 "
            >
              {createMutation.isPending ? "Creating..." : "Create Reservation"}
            </button>
          </div>
          {createMutation.isError && (
            <p className="mt-4 text-sm font-medium text-red-600">
              {axios.isAxiosError<ErrorResponse>(createMutation.error)
                ? createMutation.error.response?.data.message
                : "예약 중 오류가 발생했습니다."}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResourceDetailPage;
