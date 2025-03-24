## Karin's Demo App

This repository aims to compile some cool things together into a project. The app directory contains the app code, which is built into a docker image and deployed in the infra directory.

## Local Development

To begin, ensure you have the following installed:

- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
- [Pulumi](https://www.pulumi.com/docs/iac/download-install/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/)

Run `yarn` to install all dependencies. Ensure docker desktop is running and has Kubernetes enabled.

Navigate to the app directory and run `dockerfy` which will build the image of the app and store it on your local docker registry.

Then, navigate to the infra directory and ensure a directory called "state" is located in the root. Then run the following:

`pulumi:local` - This will log you into a local pulumi state .

`pulumi:deploy` - This will deploy the app. Follow the prompts and name the app "app".

Three containers should deploy. One for the app, one for an OpenTelemetry collector, and one for the jaeger stack which will visualise traces. The app is instrumented with OpenTelemetry so any events in the app should appear in jaeger.

Next, you need to port-forward the jaeger collector so it can be sent traces by our collector.

Run `kubectl get services` to see the services available in our Kubernetes cluster (shown in Docker Desktop). `jaeger-collector` should be listed. If you have deployed the app into a namespace you will need to run all kubectl commands with the namespace you have deployed the app into. To port-forward the jaeger-collector simply run: `kubectl port-forward svc/jaeger-collector 4317:4317`. 

To view telemetry we need to now port forward jaeger-query. Run `kubectl port-forward svc/jaeger-query 16686:16686`.

Finally, to access the app and get telemetry into our backend, we need to port-forward the app. Run `kubectl port-forward svc/web-app 3000:3000` to access the app.

Our handy command `yarn forward` will execute all of these commands in parallel so you don't need to open a terminal for each.