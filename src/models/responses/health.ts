interface Package {
  name: string;
  version: string;
}

export default interface HealthInfo {
  nodeVersion: string;
  service: string;
  memory: NodeJS.MemoryUsage;
  pid: number;
  uptime: number;
  environment: string;
  package: Package;
}
