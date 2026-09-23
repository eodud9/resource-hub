export type ReservationStatus = "RESERVED" | "CANCELED" | "COMPLETED";

export interface ReservationRequest {
  resourceId: number;
  startAt: string;
  endAt: string;
}

export interface ReservationResponse {
  reservationId: number;
  resourceId: number;
  resourceName: string;
  startAt: string;
  endAt: string;
  reservationStatus: ReservationStatus;
}

export interface ErrorResponse {
  message: string;
}
