import api from './client'

export interface Node {
  id: string
  name: string
  type: string
  server: string
  serverPort: number
  subscriptionId?: string
  isManual: boolean
  enabled: boolean
  delay: number      // Latency in ms, 0=timeout, -1=not tested
  lastTest: number   // Last test timestamp
  config: string
  shareUrl?: string
}

export const nodeApi = {
  // Get all nodes
  list: () => api.get<Node[]>('/nodes'),

  // Import node from URL
  importUrl: (url: string) => 
    api.post<Node>('/nodes/import', { url }),

  // Add manual node
  addManual: (data: { name: string; type: string; server: string; port: number; config?: string }) =>
    api.post<Node>('/nodes/manual', data),

  // Delete manual node
  delete: (id: string) => 
    api.delete(`/nodes/${id}`),

  // Test single node delay
  testDelay: (nodeId: string, server: string, port: number, timeout?: number) =>
    api.post<{ delay: number }>('/nodes/test', { nodeId, server, port, timeout }),

  // Batch test delays
  testDelayBatch: (nodeIds: string[], timeout?: number) =>
    api.post<Record<string, number>>('/nodes/test-batch', { nodeIds, timeout }),

  // Get share URL
  getShareUrl: (id: string) =>
    api.get<{ url: string }>(`/nodes/${id}/share`),
}
