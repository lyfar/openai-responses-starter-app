// This file is for testing the KMB bus data function
// It can be run using ts-node or similar tool

async function testKmbBusData() {
  const apiUrl = "http://localhost:3000/api/functions/get_kmb_bus_data";

  // Test 1: Get all routes
  console.log("Test 1: Getting all routes");
  const routesResponse = await fetch(`${apiUrl}?dataType=routes`);
  const routesData = await routesResponse.json();
  console.log(`Routes count: ${routesData.data.length}`);
  console.log("Sample routes:", routesData.data.slice(0, 3));
  console.log("------------------------------");

  // Test 2: Get route info
  console.log("Test 2: Getting info for route 1");
  const routeInfoResponse = await fetch(`${apiUrl}?dataType=routes&route=1`);
  const routeInfoData = await routeInfoResponse.json();
  console.log("Route 1 info:", routeInfoData.data);
  console.log("------------------------------");

  // Test 3: Get all stops
  console.log("Test 3: Getting all stops");
  const stopsResponse = await fetch(`${apiUrl}?dataType=stops`);
  const stopsData = await stopsResponse.json();
  console.log(`Stops count: ${stopsData.data.length}`);
  console.log("Sample stops:", stopsData.data.slice(0, 3));
  console.log("------------------------------");

  // Test 4: Get route-stops for route 1
  console.log("Test 4: Getting route-stops for route 1 outbound");
  const routeStopsResponse = await fetch(`${apiUrl}?dataType=route-stops&route=1&bound=O`);
  const routeStopsData = await routeStopsResponse.json();
  console.log(`Route 1 stops count: ${routeStopsData.data.length}`);
  console.log("Sample route-stops:", routeStopsData.data.slice(0, 3));
  console.log("------------------------------");

  // Test 5: Get ETA data
  // Using stop ID from test 4 for a valid stop
  const stopId = routeStopsData.data[0]?.stop || "HVH1K77A1FD11B9F";
  console.log(`Test 5: Getting ETA for stop ${stopId} and route 1`);
  const etaResponse = await fetch(`${apiUrl}?dataType=eta&stopId=${stopId}&route=1&enhanced=true`);
  const etaData = await etaResponse.json();
  console.log(`ETA count: ${etaData.data.length}`);
  console.log("Sample ETAs:", etaData.data.slice(0, 3));
  console.log("------------------------------");

  // Test 6: Get combined route-with-stops
  console.log("Test 6: Getting combined route-with-stops for route 1 outbound");
  const combinedResponse = await fetch(`${apiUrl}?dataType=route-with-stops&route=1&bound=O`);
  const combinedData = await combinedResponse.json();
  console.log("Route info:", combinedData.data.route);
  console.log(`Stops count: ${combinedData.data.stops.length}`);
  console.log("Sample stops:", combinedData.data.stops.slice(0, 3));
  console.log("------------------------------");
}

// Uncomment to run the test
// testKmbBusData().catch(console.error);

/*
 * Example usage:
 * 
 * // Get all routes
 * fetch("/api/functions/get_kmb_bus_data?dataType=routes")
 * 
 * // Get specific route
 * fetch("/api/functions/get_kmb_bus_data?dataType=routes&route=1")
 * 
 * // Get all stops
 * fetch("/api/functions/get_kmb_bus_data?dataType=stops")
 * 
 * // Get specific stop
 * fetch("/api/functions/get_kmb_bus_data?dataType=stops&stopId=HVH1K77A1FD11B9F")
 * 
 * // Get route-stops mapping
 * fetch("/api/functions/get_kmb_bus_data?dataType=route-stops&route=1&bound=O")
 * 
 * // Get ETA for a stop and route
 * fetch("/api/functions/get_kmb_bus_data?dataType=eta&stopId=HVH1K77A1FD11B9F&route=1&enhanced=true")
 * 
 * // Get ETA for all routes at a stop
 * fetch("/api/functions/get_kmb_bus_data?dataType=eta&stopId=HVH1K77A1FD11B9F&enhanced=true")
 * 
 * // Get combined route with stops
 * fetch("/api/functions/get_kmb_bus_data?dataType=route-with-stops&route=1&bound=O")
 */ 