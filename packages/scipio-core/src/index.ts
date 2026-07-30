import "server-only";
import { ScipioText, ScipioTextProps } from "./react";

export interface ScipioConfig {
  secretKey: string | undefined;
}

export class Scipio {
  private secretKey: string;

  constructor(config: ScipioConfig) {
    if (typeof window !== "undefined") {
      throw new Error(
        "[Scipio] SECURITY BREACH: SDK initialized on the client side. SCIPIO must only run in Server Components or Node.js backend.",
      );
    }
    if (!config.secretKey) {
      throw new Error(
        "[Scipio] FATAL: secretKey is missing from configuration.",
      );
    }
    this.secretKey = config.secretKey;
  }

  /**
   * Return the React Server Component bound with the secret key.
   */
  public get Text() {
    return (props: Omit<ScipioTextProps, "secretKey">) => {
      return ScipioText({ ...props, secretKey: this.secretKey });
    };
  }
}
