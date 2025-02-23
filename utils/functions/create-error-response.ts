/**
 * Creates a standardized error response.
 *
 * @param {string} message - The error message.
 * @param {number} status - The HTTP status code.
 * @param {string} [stack] - An optional error stack.
 * @returns {Response} The formatted error response.
 */
export function createErrorResponse(message: string, status: number, stack?: string): Response {
    return new Response(
      JSON.stringify({
        error: {
          message: message,
          stack: stack ? stack : null
        }
      }),
      {
        status: status,
        headers: { "Content-Type": "application/json" }
      }
    );
  }