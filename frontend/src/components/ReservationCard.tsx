import type { ReservationResponse } from "../types/reservation";

interface ReservationCardProps {
  reservation: ReservationResponse;
  onCancel: (reservationId: number) => void;
  isCanceling: boolean;
}

const ReservationCard = ({ reservation, onCancel, isCanceling }: ReservationCardProps) => {
  return (
    <li key={reservation.reservationId} className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold text-gray-900">{reservation.resourceName}</h2>
          <p className="mt-2 text-sm text-gray-500">
            {reservation.startAt} ~ {reservation.endAt}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${reservation.reservationStatus === "RESERVED" ? "bg-green-50 text-green-700" : reservation.reservationStatus === "COMPLETED" ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-600"}`}
        >
          {reservation.reservationStatus}
        </span>
      </div>

      {reservation.reservationStatus === "RESERVED" && (
        <button
          onClick={() => onCancel(reservation.reservationId)}
          className="mt-5 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors duration-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          disabled={isCanceling}
        >
          Cancel
        </button>
      )}
    </li>
  );
};

export default ReservationCard;
