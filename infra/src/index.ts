import { WebApp } from './web_app'

import * as k8s from '@pulumi/kubernetes'
import * as pulumi from '@pulumi/pulumi'
import { Database } from './database'

const values = new pulumi.asset.FileAsset('./src/values/collector.values.yaml')
const jValues = new pulumi.asset.FileAsset('./src/values/jaeger.values.yaml')

new k8s.helm.v4.Chart('collector', {
  repositoryOpts: {
    repo: 'https://open-telemetry.github.io/opentelemetry-helm-charts',
  },
  chart: 'opentelemetry-collector',
  name: 'collector',
  valueYamlFiles: [values],
})

new k8s.helm.v4.Chart('jaeger', {
  repositoryOpts: {
    repo: 'https://jaegertracing.github.io/helm-charts',
  },
  chart: 'jaeger',
  name: 'jaeger',
  valueYamlFiles: [jValues],
})

new Database('mongodb')
new WebApp('web-app')
