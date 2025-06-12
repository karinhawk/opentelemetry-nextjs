import * as docker from '@pulumi/docker'
import * as k8s from '@pulumi/kubernetes'
import * as pulumi from '@pulumi/pulumi'

export class WebApp extends pulumi.ComponentResource {
  constructor(name: string, opts?: pulumi.ComponentResourceOptions) {
    super('web-app', name, opts)

    const localRegistry = 'localhost:30001'

    new k8s.apps.v1.Deployment('local-registry', {
      metadata: {
        labels: {
          app: 'registry',
        },
      },
      spec: {
        selector: {
          matchLabels: {
            app: 'registry',
          },
        },
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: 'registry',
            },
          },
          spec: {
            containers: [
              {
                name: 'registry',
                image: 'registry:2',
                ports: [{ containerPort: 5000 }],
              },
            ],
          },
        },
      },
    })

    new k8s.core.v1.Service('local-registry-service', {
      metadata: {
        labels: {
          app: 'registry',
        },
      },
      spec: {
        type: 'NodePort',
        selector: { app: 'registry' },
        ports: [
          {
            protocol: 'TCP',
            port: 5000,
            targetPort: 5000,
            nodePort: 30001,
          },
        ],
      },
    })

    const image = new docker.Image('web-app-image', {
      build: {
        context: '../app',
        dockerfile: '../app/Dockerfile',
        platform: 'linux/arm64',
      },
      imageName: `${localRegistry}/web-app/app`,
      skipPush: false,
    })

    new k8s.apps.v1.Deployment('deployment', {
      metadata: {
        labels: {
          app: 'web-app',
        },
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: {
            app: 'web-app',
          },
        },
        template: {
          metadata: {
            labels: {
              app: 'web-app',
            },
          },
          spec: {
            containers: [
              {
                name: 'web-app',
                image: image.repoDigest,
                imagePullPolicy: 'Always',
                ports: [
                  {
                    containerPort: 3000,
                  },
                ],
              },
            ],
          },
        },
      },
    })

    new k8s.core.v1.Service('service', {
      metadata: {
        name: 'web-app',
      },
      spec: {
        selector: {
          app: 'web-app',
        },
        type: 'NodePort',
        ports: [
          {
            port: 3000,
            targetPort: 3000,
            nodePort: 30000,
          },
        ],
      },
    })
  }
}
