import * as k8s from '@pulumi/kubernetes'
import * as pulumi from '@pulumi/pulumi'


export class Database extends pulumi.ComponentResource {
    constructor(name: string, opts?: pulumi.ComponentResourceOptions) {
      super('database', name, opts)


      new k8s.core.v1.PersistentVolume('mongodb-volume', {
        metadata: {
            name: 'mongodb-volume'
        },
        spec: {
            accessModes: ['ReadWriteOnce'],
            capacity: {
                storage: '1000Mi'
            },
            hostPath: {
                path: '/data/db',
                type: ''
            },
            persistentVolumeReclaimPolicy: 'Retain',
            storageClassName: 'standard',
            volumeMode: 'Filesystem'
        }
      })
      new k8s.core.v1.PersistentVolumeClaim('mongodb-pvc', {
        metadata: {
            name: 'mongodb-volume-claim'
        },
        spec: {
            resources: {
                requests: {
                    storage: '1000Mi'
                }
            },
            accessModes: ['ReadWriteOnce']
        }
    })

        new k8s.apps.v1.Deployment('mongodb-deployment', {
            metadata: {
              labels: {
                app: 'mongodb',
              },
            },
            spec: {
              replicas: 1,
              selector: {
                matchLabels: {
                  app: 'mongodb',
                },
              },
              template: {
                metadata: {
                  labels: {
                    app: 'mongodb',
                  },
                },
                spec: {
                  containers: [
                    {
                      name: 'mongodb',
                      image: 'docker.io/mongo:4.2',
                      ports: [
                        {
                          containerPort: 27107,
                        },
                      ],
                      env: [{
                        name: 'MONGO_DATA_DIR',
                        value: '/data/db'
                      }, {
                        name: 'MONGO_LOG_DIR',
                        value: '/dev/null'
                      }],
                      volumeMounts: [{name: 'mongodb-volume', mountPath: '/data/db'}]
                    },
                  ],
                  volumes: [{
                    name: 'mongodb-volume',
                    persistentVolumeClaim: {
                        claimName: 'mongodb-volume-claim'
                    }
                  }],
                  restartPolicy: 'Always'
                },
              },
            },
          })

        new k8s.core.v1.Service("mongodb-service", {
            metadata: {
                name: 'mongodb',
                labels: {
                    name: 'mongodb'
                }
            },
            spec: {
                ports: [{
                    port: 27017,
                    targetPort: 27017,
                }],
                selector: {
                    app: "mongodb",
                },
        }}

    )
}}