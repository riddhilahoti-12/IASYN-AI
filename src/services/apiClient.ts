/**
 * IASYN AI Typed API Client
 * Configured for secure cookie/bearer token transmission with session expiration interception.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

let authToken: string | null = null;
let onUnauthorizedCallback: (() => void) | null = null;

export const setApiAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    sessionStorage.setItem('iasyn_session_token', token);
  } else {
    sessionStorage.removeItem('iasyn_session_token');
  }
};

export const getApiAuthToken = (): string | null => {
  if (!authToken) {
    authToken = sessionStorage.getItem('iasyn_session_token');
  }
  return authToken;
};

export const setUnauthorizedHandler = (cb: () => void) => {
  onUnauthorizedCallback = cb;
};

export interface ApiError {
  message: string;
  status: number;
  details?: unknown;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getApiAuthToken();
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  headers.set('Accept', 'application/json');

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // Transmit secure HttpOnly cookies
  });

  if (response.status === 401) {
    if (onUnauthorizedCallback) {
      onUnauthorizedCallback();
    }
    const errData = await response.json().catch(() => ({}));
    const error: ApiError = {
      status: 401,
      message: errData.detail || 'Session expired or invalid credentials.',
      details: errData,
    };
    throw error;
  }

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const error: ApiError = {
      status: response.status,
      message: errData.detail || `Request failed with status ${response.status}`,
      details: errData,
    };
    throw error;
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};
