// KMB Bus Route Type
export interface KmbRoute {
  route: string;
  bound: string;
  service_type: string;
  orig_en: string;
  orig_tc: string;
  orig_sc: string;
  dest_en: string;
  dest_tc: string;
  dest_sc: string;
}

// KMB Bus Stop Type
export interface KmbStop {
  stop: string; // Stop ID
  name_en: string;
  name_tc: string;
  name_sc: string;
  lat: number;
  long: number;
}

// KMB Route-Stop Mapping Type
export interface KmbRouteStop {
  route: string;
  bound: string; // O for outbound, I for inbound
  service_type: string;
  seq: string; // Sequence number
  stop: string; // Stop ID
}

// KMB ETA Type
export interface KmbEta {
  co: string; // Company
  route: string;
  dir: string; // Direction
  service_type: string;
  seq: string; // Stop sequence
  dest_tc: string;
  dest_sc: string;
  dest_en: string;
  eta_seq: number; // ETA sequence
  eta: string; // Estimated time of arrival
  rmk_tc: string; // Remarks
  rmk_sc: string;
  rmk_en: string;
  data_timestamp: string;
}

// API Response Types
export interface KmbRoutesResponse {
  type: string;
  version: string;
  generated_timestamp: string;
  data: KmbRoute[];
}

export interface KmbStopsResponse {
  type: string;
  version: string;
  generated_timestamp: string;
  data: KmbStop[];
}

export interface KmbRouteStopsResponse {
  type: string;
  version: string;
  generated_timestamp: string;
  data: KmbRouteStop[];
}

export interface KmbEtaResponse {
  type: string;
  version: string;
  generated_timestamp: string;
  data: KmbEta[];
} 