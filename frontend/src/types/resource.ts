export type ResourceType = "EQUIPMENT" | "ROOM" | "SERVER" | "VEHICLE";
export type ResourceStatus = "AVAILABLE" | "INACTIVE";

export interface ResourceResponse {
  id: number;
  name: string;
  description: string;
  quantity: number;
  type: ResourceType;
  status: ResourceStatus;
}

export interface ResourceRequest {
  name: string;
  description: string;
  quantity: number;
  type: ResourceType;
}
