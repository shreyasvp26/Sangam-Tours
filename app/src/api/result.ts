/**
 * API error categories — Document 09 §6.
 * Same shape for every resource.
 */

export type ApiErrorCategory =
  "validation" | "business_rule" | "missing_data" | "authorization" | "unexpected_failure";

export type ApiError = {
  category: ApiErrorCategory;
  message: string;
  /** Field-level messages for validation failures. */
  fields?: Record<string, string>;
  /** Named blocking relationship for business-rule failures. */
  blockingRelationship?: string;
};

export type ApiSuccess<T> = {
  ok: true;
  data: T;
};

export type ApiFailure = {
  ok: false;
  error: ApiError;
};

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

export function apiOk<T>(data: T): ApiSuccess<T> {
  return { ok: true, data };
}

export function apiFail(
  category: ApiErrorCategory,
  message: string,
  extras?: Pick<ApiError, "fields" | "blockingRelationship">,
): ApiFailure {
  return {
    ok: false,
    error: {
      category,
      message,
      ...extras,
    },
  };
}
