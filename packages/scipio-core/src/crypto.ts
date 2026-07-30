import { createHmac } from "crypto";

/**
 * Generates a LyokoToken based on the current time epoch and a secret key.
 * @param secretKey The server-side cryptographic secret key.
 * @param timeStepSec The phase-shifting threshold in seconds. Defaults to 30.
 * @returns A hex-encoded HMAC-SHA256 token.
 */
export function generateLyokoToken(
  secretKey: string,
  timeStepSec: number = 30,
): string {
  const timeStep = Math.floor(Date.now() / 1000 / timeStepSec);
  return createHmac("sha256", secretKey)
    .update(timeStep.toString())
    .digest("hex");
}
