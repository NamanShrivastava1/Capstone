import { k8sCoreV1Api } from "./config.js";

export const cerateService = async (sandboxId) => {
  const serviceManifest = {
    metadata: {
      name: `sandbox-service-${sandboxId}`,
      labels: {
        app: `sandbox`,
        sandboxId: sandboxId,
      },
    },
    spec: {
      selector: {
        app: `sandbox`,
        sandboxId: sandboxId,
      },
      ports: [
        {
          name: "http",
          port: 80,
          targetPort: 5173,
          protocol: "TCP",
        },
      ],
    },
  };
  const resposne = await k8sCoreV1Api.createNamespacedService({
    namespace: "default",
    body: serviceManifest,
  });
  return resposne;
};
