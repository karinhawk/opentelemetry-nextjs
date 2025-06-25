import { WebApp } from "./web_app";

import * as k8s from "@pulumi/kubernetes";
import * as pulumi from "@pulumi/pulumi";
import { Database } from "./database";
import { Proxy } from "./proxy";

const values = new pulumi.asset.FileAsset("./src/values/collector.values.yaml");
const jValues = new pulumi.asset.FileAsset("./src/values/jaeger.values.yaml");

new k8s.helm.v4.Chart("collector", {
  repositoryOpts: {
    repo: "https://open-telemetry.github.io/opentelemetry-helm-charts",
  },
  chart: "opentelemetry-collector",
  name: "collector",
  valueYamlFiles: [values],
});

new k8s.helm.v4.Chart("jaeger", {
  repositoryOpts: {
    repo: "https://jaegertracing.github.io/helm-charts",
  },
  chart: "jaeger",
  name: "jaeger",
  valueYamlFiles: [jValues],
});

new k8s.apps.v1.Deployment("local-registry", {
  metadata: {
    labels: {
      app: "registry",
    },
  },
  spec: {
    selector: {
      matchLabels: {
        app: "registry",
      },
    },
    replicas: 1,
    template: {
      metadata: {
        labels: {
          app: "registry",
        },
      },
      spec: {
        containers: [
          {
            name: "registry",
            image: "registry:2",
            ports: [{ containerPort: 5000 }],
          },
        ],
      },
    },
  },
});

new k8s.core.v1.Service("local-registry-service", {
  metadata: {
    labels: {
      app: "registry",
    },
  },
  spec: {
    type: "NodePort",
    selector: { app: "registry" },
    ports: [
      {
        protocol: "TCP",
        port: 5000,
        targetPort: 5000,
        nodePort: 30001,
      },
    ],
  },
});

const localRegistry = "localhost:30001";

new Database("mongodb");
new WebApp("web-app", { localRegistry });
new Proxy("proxy", { localRegistry });
