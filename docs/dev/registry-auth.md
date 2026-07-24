# Registry Authentication Verification

The registry verification flow handles the OAuth2 token exchange that most container registries use:

1. Attempt a direct `GET /v2/` request with Basic auth
2. If the registry returns 401 with a `WWW-Authenticate: Bearer realm=...` header, extract the realm URL and service parameter
3. Request a token from the realm with the same Basic auth credentials
4. Report success if the token request succeeds

This two-step flow is necessary because registries like `registry.redhat.io` and `quay.io` use token-based auth rather than accepting Basic auth directly on the `/v2/` endpoint.
