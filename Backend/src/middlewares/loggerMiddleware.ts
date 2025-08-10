import { NextFunction, Request, Response } from "express";

type JsonLike = Record<string, unknown> | unknown[] | string | number | boolean | null | undefined;

const SENSITIVE_KEYS = new Set([
  "password",
  "token",
  "authorization",
  "auth",
  "access_token",
  "refresh_token",
]);

function redactObject(input: any): any {
  if (!input || typeof input !== "object") return input;
  if (Array.isArray(input)) return input.map(redactObject);

  const redacted: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (SENSITIVE_KEYS.has(key.toLowerCase())) {
      redacted[key] = "[REDACTED]";
    } else if (value && typeof value === "object") {
      redacted[key] = redactObject(value);
    } else {
      redacted[key] = value as unknown;
    }
  }
  return redacted;
}

function safeStringify(data: JsonLike, limit = 1000): string {
  try {
    const str = typeof data === "string" ? data : JSON.stringify(data);
    return str.length > limit ? str.slice(0, limit) + "…[truncated]" : str;
  } catch {
    return "[unserializable]";
  }
}

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = process.hrtime.bigint();
  const requestId = Math.random().toString(36).slice(2, 10);

  // Capture original methods to hook response body
  const originalJson = res.json.bind(res);
  const originalSend = res.send.bind(res);

  // Stash response preview in locals
  (res.locals as any).responseBody = undefined;

  res.json = ((body?: any) => {
    (res.locals as any).responseBody = body;
    return originalJson(body);
  }) as any;

  res.send = ((body?: any) => {
    (res.locals as any).responseBody = body;
    return originalSend(body);
  }) as any;

  const redactedHeaders = redactObject({
    ...req.headers,
    authorization: req.headers.authorization ? "[REDACTED]" : undefined,
  });
  const redactedBody = redactObject(req.body);
  const redactedQuery = redactObject(req.query);

  console.log(
    `[${requestId}] → ${req.method} ${req.originalUrl} | headers=${safeStringify(redactedHeaders)} | query=${safeStringify(
      redactedQuery
    )} | body=${safeStringify(redactedBody)}`
  );

  res.on("finish", () => {
    const endTime = process.hrtime.bigint();
    const durationMs = Number(endTime - startTime) / 1_000_000;
    const responsePreview = (res.locals as any).responseBody;
    const redactedResponse = redactObject(responsePreview);

    console.log(
      `[${requestId}] ← ${req.method} ${req.originalUrl} | status=${res.statusCode} | durationMs=${durationMs.toFixed(
        1
      )} | response=${safeStringify(redactedResponse)}`
    );
  });

  next();
};

export default loggerMiddleware;


