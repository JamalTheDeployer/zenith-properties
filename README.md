# ZenithStay Properties Limited website

The Angular application is located in [`zenith-properties/`](./zenith-properties/).

## Deployment

Merges to `main` trigger `.github/workflows/publish-hostinger.yml`. The workflow builds the Angular application and force-publishes only the compiled production files to the `hostinger` branch. Hostinger should be connected to that generated branch with auto-deployment enabled.
