import type { Departure, DepartureStatus } from "@/domain";

function toUtcDay(isoDate: string): number {
  return Date.parse(`${isoDate}T00:00:00.000Z`);
}

/**
 * Derive departure status at read time — Document 08 §2.12 / 09 §8 rule 17.
 * Preserves explicit `closed` from admin; otherwise upcoming vs completed by end date.
 */
export function deriveDepartureStatus(
  departure: Pick<Departure, "startDate" | "endDate" | "status">,
  now: Date = new Date(),
): DepartureStatus {
  if (departure.status === "closed") {
    return "closed";
  }

  const today = Date.parse(`${now.toISOString().slice(0, 10)}T00:00:00.000Z`);
  const end = toUtcDay(departure.endDate);

  if (Number.isNaN(end) || Number.isNaN(today)) {
    return departure.status;
  }

  if (end < today) {
    return "completed";
  }

  return "upcoming";
}

export function withDerivedDepartureStatus(departure: Departure, now?: Date): Departure {
  return {
    ...departure,
    status: deriveDepartureStatus(departure, now),
  };
}

/** Next upcoming departure start date, if any. */
export function getNextDepartureDate(
  departures: Departure[],
  now: Date = new Date(),
): string | undefined {
  const upcoming = departures
    .map((d) => withDerivedDepartureStatus(d, now))
    .filter((d) => d.status === "upcoming")
    .sort((a, b) => toUtcDay(a.startDate) - toUtcDay(b.startDate));

  return upcoming[0]?.startDate;
}

/** True when the package has at least one upcoming departure. */
export function packageHasUpcomingDeparture(departures: Departure[], now?: Date): boolean {
  return getNextDepartureDate(departures, now) !== undefined;
}
