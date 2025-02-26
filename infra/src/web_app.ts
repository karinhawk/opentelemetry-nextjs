import * as k8s from '@pulumi/kubernetes'
import * as pulumi from '@pulumi/pulumi'

export class WebApp extends pulumi.ComponentResource {
  constructor(name: string, opts?: pulumi.ComponentResourceOptions) {
    super('web-app', name, opts)

    new k8s.apps.v1.Deployment('deployment', {
      metadata: {
        labels: {
          app: 'web-app'
        }
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: {
            app: 'web-app',
          }
        },
        template: {
          metadata: {
            labels: {
              app: 'web-app',
            }
          },
          spec: {
            containers: [
              {
                name: 'web-app',
                image: 'docker.io/web-app/app',
                imagePullPolicy: 'IfNotPresent',
                ports: [
                  {
                    containerPort: 3000
                  }
                ]
              }
            ]
          }
        }
      }
    })

    new k8s.core.v1.Service('service', {
      metadata: {
        name: 'web-app'
      },
      spec: {
        selector: {
          app: 'web-app'
        },
        type: 'NodePort',
        ports: [
          {
            port: 3000,
            targetPort: 3000,
            nodePort: 30000,
          }
        ]
      }
    })

  }
}
