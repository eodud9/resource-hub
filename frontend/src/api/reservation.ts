import type { ReservationRequest, ReservationResponse } from "../types/reservation";
import { api } from "./axios";

export async function createReservation(request: ReservationRequest) {
  const response = await api.post<ReservationResponse>("/api/reservations", request);

  return response.data;
}

export async function getReservations() {
  const response = await api.get<ReservationResponse[]>("/api/reservations");

  return response.data;
}

export async function cancelReservation(id: number) {
  await api.patch(`/api/reservations/${id}/cancel`);
}
