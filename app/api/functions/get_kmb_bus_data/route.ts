import {
  KmbRoutesResponse,
  KmbStopsResponse,
  KmbRouteStopsResponse,
  KmbEtaResponse,
} from './types';

import { enhanceEtaData, combineRouteWithStops } from './utils';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dataType = searchParams.get("dataType") || "routes"; // Default to routes
    
    // Extract other query parameters
    const route = searchParams.get("route");
    const stopId = searchParams.get("stopId");
    const serviceType = searchParams.get("serviceType") || "1";
    const bound = searchParams.get("bound"); // O for outbound, I for inbound
    const enhanced = searchParams.get("enhanced") === "true"; // Whether to return enhanced data

    // Endpoints
    const kmbApi = "https://data.etabus.gov.hk/v1/transport/kmb";
    
    let response;
    
    // Special case: combined route with stops
    if (dataType === "route-with-stops" && route && bound) {
      try {
        // Convert bound to outbound/inbound format
        const boundParam = bound === "O" ? "outbound" : "inbound";
        
        console.log(`Fetching combined data for route ${route}, bound ${boundParam}, serviceType ${serviceType}`);
        
        // Make multiple API calls in parallel
        const [routeResponse, routeStopsResponse, stopsResponse] = await Promise.all([
          fetch(`${kmbApi}/route/${route}/${boundParam}/${serviceType}`),
          fetch(`${kmbApi}/route-stop/${route}/${boundParam}/${serviceType}`),
          fetch(`${kmbApi}/stop`)
        ]);
        
        if (!routeResponse.ok) {
          console.error(`Route response error: ${routeResponse.status} ${routeResponse.statusText}`);
          return new Response(
            JSON.stringify({ error: `Error fetching route data: ${routeResponse.statusText}` }),
            { status: routeResponse.status }
          );
        }
        
        if (!routeStopsResponse.ok) {
          console.error(`Route stops response error: ${routeStopsResponse.status} ${routeStopsResponse.statusText}`);
          return new Response(
            JSON.stringify({ error: `Error fetching route stops data: ${routeStopsResponse.statusText}` }),
            { status: routeStopsResponse.status }
          );
        }
        
        if (!stopsResponse.ok) {
          console.error(`Stops response error: ${stopsResponse.status} ${stopsResponse.statusText}`);
          return new Response(
            JSON.stringify({ error: `Error fetching stops data: ${stopsResponse.statusText}` }),
            { status: stopsResponse.status }
          );
        }
        
        const routeData = await routeResponse.json();
        console.log('Route data:', JSON.stringify(routeData));
        
        const routeStopsData = await routeStopsResponse.json() as KmbRouteStopsResponse;
        console.log('Route stops data:', JSON.stringify(routeStopsData));
        
        const stopsData = await stopsResponse.json() as KmbStopsResponse;
        console.log('Stops data length:', stopsData.data.length);
        
        // The route data structure might be different than expected
        if (!routeData.data) {
          return new Response(
            JSON.stringify({ error: "Route not found" }),
            { status: 404 }
          );
        }
        
        // Combine the data
        const routeInfo = routeData.data;
        const stops = combineRouteWithStops(routeInfo, routeStopsData.data, stopsData.data);
        
        return new Response(
          JSON.stringify({
            type: "RouteWithStops",
            version: "1.0",
            generated_timestamp: new Date().toISOString(),
            data: {
              route: routeInfo,
              stops: stops
            }
          }),
          { 
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'public, max-age=600' // Cache for 10 minutes
            }
          }
        );
      } catch (error) {
        console.error("Error getting combined route with stops:", error);
        return new Response(
          JSON.stringify({ error: "Error getting combined route with stops" }),
          { status: 500 }
        );
      }
    }
    
    switch (dataType) {
      case "routes":
        // Get all routes or a specific route
        if (route) {
          if (bound) {
            // If bound is provided, use it in the URL (outbound/inbound format)
            const boundParam = bound === "O" ? "outbound" : "inbound";
            response = await fetch(`${kmbApi}/route/${route}/${boundParam}/${serviceType}`);
          } else {
            // If no bound is provided, try to get the route with just the service type
            response = await fetch(`${kmbApi}/route/${route}/${serviceType}`);
          }
        } else {
          response = await fetch(`${kmbApi}/route/`);
        }
        break;
        
      case "stops":
        // Get all stops or a specific stop
        if (stopId) {
          response = await fetch(`${kmbApi}/stop/${stopId}`);
        } else {
          response = await fetch(`${kmbApi}/stop`);
        }
        break;
        
      case "route-stops":
        // Get stops for a specific route
        if (route && bound) {
          // Convert bound to outbound/inbound format
          const boundParam = bound === "O" ? "outbound" : "inbound";
          response = await fetch(`${kmbApi}/route-stop/${route}/${boundParam}/${serviceType}`);
        } else {
          // Return all route-stops mappings
          response = await fetch(`${kmbApi}/route-stop`);
        }
        break;
        
      case "eta":
        // Get ETA for a specific stop and route
        if (stopId && route) {
          response = await fetch(`${kmbApi}/eta/${stopId}/${route}/${serviceType}`);
        } else if (stopId) {
          // Get ETA for all routes at a stop
          response = await fetch(`${kmbApi}/eta/${stopId}/all/${serviceType}`);
        } else if (route) {
          // Get ETA for all stops on a route
          response = await fetch(`${kmbApi}/route-eta/${route}/${serviceType}`);
        } else {
          return new Response(
            JSON.stringify({ error: "Either stopId or route must be provided for ETA data" }),
            { status: 400 }
          );
        }
        break;
        
      default:
        return new Response(
          JSON.stringify({ error: "Invalid dataType parameter" }),
          { status: 400 }
        );
    }
    
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `Error fetching KMB data: ${response.statusText}` }),
        { status: response.status }
      );
    }
    
    let data;
    
    // Parse and type response based on data type
    switch (dataType) {
      case "routes":
        data = await response.json() as KmbRoutesResponse;
        break;
      case "stops":
        data = await response.json() as KmbStopsResponse;
        break;
      case "route-stops":
        data = await response.json() as KmbRouteStopsResponse;
        break;
      case "eta":
        const etaData = await response.json() as KmbEtaResponse;
        
        // Apply enhanced processing for ETA data if requested
        if (enhanced && etaData && etaData.data) {
          etaData.data = enhanceEtaData(etaData.data);
        }
        
        data = etaData;
        break;
      default:
        data = await response.json();
    }
    
    return new Response(
      JSON.stringify(data),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': dataType === 'eta' 
            ? 'no-cache, no-store, must-revalidate' // No caching for real-time data
            : 'public, max-age=600' // Cache other data for 10 minutes
        }
      }
    );
    
  } catch (error) {
    console.error("Error getting KMB bus data:", error);
    return new Response(
      JSON.stringify({ error: "Error getting KMB bus data" }),
      { status: 500 }
    );
  }
} 