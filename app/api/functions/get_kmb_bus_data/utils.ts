import { KmbEta, KmbRoute, KmbRouteStop, KmbStop } from './types';

/**
 * Formats a date string from the KMB API (ISO format) to a more user-friendly format
 */
export function formatDateTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleString();
  } catch (error) {
    return isoString;
  }
}

/**
 * Calculates time until arrival in minutes
 */
export function calculateMinutesToArrival(etaTime: string): number | null {
  try {
    const now = new Date();
    const eta = new Date(etaTime);
    
    const diffMs = eta.getTime() - now.getTime();
    const diffMinutes = Math.round(diffMs / 60000);
    
    return diffMinutes < 0 ? 0 : diffMinutes;
  } catch (error) {
    return null;
  }
}

/**
 * Enhances ETA data with additional information
 */
export function enhanceEtaData(etaData: KmbEta[]): (KmbEta & { minutesToArrival: number | null, formattedTime: string })[] {
  return etaData.map(eta => ({
    ...eta,
    minutesToArrival: calculateMinutesToArrival(eta.eta),
    formattedTime: formatDateTime(eta.eta)
  }));
}

/**
 * Finds stops for a specific route and combines with stop information
 */
export function combineRouteWithStops(
  route: KmbRoute | any,
  routeStops: KmbRouteStop[],
  stops: KmbStop[]
) {
  // Ensure route is properly formatted
  const routeObj = route as KmbRoute;
  
  // Filter route stops for this specific route
  const filteredRouteStops = routeStops.filter(
    rs => rs.route === routeObj.route && rs.bound === routeObj.bound && rs.service_type === routeObj.service_type
  );
  
  // Sort by sequence
  const sortedRouteStops = filteredRouteStops.sort(
    (a, b) => parseInt(a.seq) - parseInt(b.seq)
  );
  
  // Map to full stop information
  return sortedRouteStops.map(rs => {
    const stopInfo = stops.find(s => s.stop === rs.stop);
    return {
      sequence: rs.seq,
      stop: stopInfo || { stop: rs.stop, name_en: 'Unknown', name_tc: 'Unknown', name_sc: 'Unknown', lat: 0, long: 0 },
    };
  });
}

/**
 * Finds routes for a specific stop
 */
export function findRoutesForStop(
  stopId: string,
  routeStops: KmbRouteStop[],
  routes: KmbRoute[]
): KmbRoute[] {
  // Find all route-stop entries for this stop
  const stopRoutes = routeStops.filter(rs => rs.stop === stopId);
  
  // Map to full route information
  return stopRoutes.map(sr => {
    return routes.find(
      r => r.route === sr.route && r.bound === sr.bound && r.service_type === sr.service_type
    );
  }).filter(Boolean) as KmbRoute[];
} 