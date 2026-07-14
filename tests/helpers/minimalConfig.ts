// Minimal ImageSetConfiguration YAML fixture shared across E2E and integration tests.
export const MINIMAL_ISC_YAML = `kind: ImageSetConfiguration
apiVersion: mirror.openshift.io/v2alpha1
mirror:
  platform:
    channels:
      - name: stable-4.21
    graph: true
  operators: []
  additionalImages: []
  helm:
    repositories: []
`;
