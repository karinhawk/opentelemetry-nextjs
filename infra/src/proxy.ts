import * as k8s from "@pulumi/kubernetes";
import * as pulumi from "@pulumi/pulumi";
import * as docker from "@pulumi/docker";

type ProxyArgs = {
  localRegistry: string;
};

export class Proxy extends pulumi.ComponentResource {
  constructor(
    name: string,
    args: ProxyArgs,
    opts?: pulumi.ComponentResourceOptions
  ) {
    super("proxy", name, opts);

    const { localRegistry } = args;

    const image = new docker.Image("proxy-image", {
      build: {
        context: "../proxy",
        dockerfile: "../proxy/Dockerfile",
        platform: "linux/arm64",
      },
      imageName: `${localRegistry}/web-app/proxy`,
      skipPush: false,
    });

    new k8s.apps.v1.Deployment("proxy-deployment", {
      metadata: {
        labels: {
          app: "proxy",
        },
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: {
            app: "proxy",
          },
        },
        template: {
          metadata: {
            labels: {
              app: "proxy",
            },
          },
          spec: {
            containers: [
              {
                name: "proxy",
                image: image.repoDigest,
                imagePullPolicy: "Always",
                ports: [
                  {
                    containerPort: 3001,
                  },
                ],
              },
            ],
          },
        },
      },
    });

    new k8s.core.v1.Service("proxy-service", {
      metadata: {
        name: "proxy",
      },
      spec: {
        selector: {
          app: "proxy",
        },
        type: "NodePort",
        ports: [
          {
            port: 3001,
            targetPort: 3001,
            nodePort: 31000,
          },
        ],
      },
    });
  }
}
