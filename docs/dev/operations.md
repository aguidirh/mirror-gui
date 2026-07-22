# Operation Lifecycle

Mirror operations go through this lifecycle:

1. **Start**: The server validates the config file exists, creates/validates the mirror destination directory (checking write permissions), saves an `OperationRecord` JSON file, and spawns `oc-mirror --v2` as a child process.

2. **Running**: stdout and stderr are piped to a log file. The server tracks the child process by operation ID. The frontend can connect to an SSE endpoint to stream logs in real time.

3. **Completion**: On process exit, the server determines the final status by checking the exit code and scanning logs for error markers (`[ERROR]`, `error:`). It extracts the first error line as the error message for failed operations.

4. **Stop**: A stop request sends SIGTERM to the child process, with a 5-second fallback to SIGKILL. The operation is marked as "stopped" rather than "failed".

Operations persist as individual JSON files. On container restart, if no mirror files exist in the default destination, stale operation history and logs are automatically cleaned up.
