import { api } from "./axios";
import type { ResourceRequest, ResourceResponse } from "../types/resource";

export async function getResources() {
  const response = await api.get<ResourceResponse[]>("/api/resources");

  return response.data;
}

export async function getResource(id: number) {
  const response = await api.get<ResourceResponse>(`/api/resources/${id}`);
  return response.data;
}

export async function createResource(resource: ResourceRequest) {
  await api.post("/api/resources", resource);
}

export async function updateResource(id: number, resource: ResourceRequest) {
  const response = await api.put<ResourceResponse>(`/api/resources/${id}`, resource);
  return response.data;
}

export async function deleteResource(id: number) {
  await api.delete(`/api/resources/${id}`);
}
