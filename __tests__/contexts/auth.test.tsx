import { renderHook, act, waitFor } from "@testing-library/react";
import { ReactNode } from "react";
import { HttpResponse, http } from "msw";
import { server } from "../../jest/node";
import { AuthProvider, useAuth, User } from "../../components/Contexts/auth";

const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe("contexts/auth", () => {
  describe("useAuth", () => {
    it("returns default values initially", () => {
      server.use(
        http.get("/api/auth/me", () => {
          return new HttpResponse(null, { status: 401 });
        })
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.user).toBeNull();
      expect(result.current.isAdmin).toBe(false);
      expect(typeof result.current.logout).toBe("function");
      expect(typeof result.current.refresh).toBe("function");
    });

    it("starts with isLoading true", () => {
      server.use(
        http.get("/api/auth/me", () => {
          return new HttpResponse(null, { status: 401 });
        })
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.isLoading).toBe(true);
    });
  });

  describe("fetch user on mount", () => {
    it("fetches user from /api/auth/me on mount", async () => {
      const mockUser: User = { email: "admin@example.com", role: "admin" };
      server.use(
        http.get("/api/auth/me", () => {
          return HttpResponse.json(mockUser);
        })
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.user).toEqual(mockUser);
    });

    it("sets user to null when fetch returns 401", async () => {
      server.use(
        http.get("/api/auth/me", () => {
          return new HttpResponse(null, { status: 401 });
        })
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.user).toBeNull();
    });

    it("sets user to null on network error", async () => {
      server.use(
        http.get("/api/auth/me", () => {
          return HttpResponse.error();
        })
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.user).toBeNull();
    });
  });

  describe("isAdmin", () => {
    it("returns true when user role is admin", async () => {
      const mockUser: User = { email: "admin@example.com", role: "admin" };
      server.use(
        http.get("/api/auth/me", () => {
          return HttpResponse.json(mockUser);
        })
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isAdmin).toBe(true);
    });

    it("returns false when user role is editor", async () => {
      const mockUser: User = { email: "editor@example.com", role: "editor" };
      server.use(
        http.get("/api/auth/me", () => {
          return HttpResponse.json(mockUser);
        })
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isAdmin).toBe(false);
    });

    it("returns false when user is null", async () => {
      server.use(
        http.get("/api/auth/me", () => {
          return new HttpResponse(null, { status: 401 });
        })
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.isAdmin).toBe(false);
    });
  });

  describe("logout", () => {
    it("calls /api/auth/logout and clears user", async () => {
      const mockUser: User = { email: "admin@example.com", role: "admin" };
      let logoutCalled = false;

      server.use(
        http.get("/api/auth/me", () => {
          return HttpResponse.json(mockUser);
        }),
        http.post("/api/auth/logout", () => {
          logoutCalled = true;
          return new HttpResponse(null, { status: 200 });
        })
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.user).toEqual(mockUser);
      });

      await act(async () => {
        await result.current.logout();
      });

      expect(logoutCalled).toBe(true);
      expect(result.current.user).toBeNull();
    });

    it("clears user even when logout API fails", async () => {
      const mockUser: User = { email: "admin@example.com", role: "admin" };

      server.use(
        http.get("/api/auth/me", () => {
          return HttpResponse.json(mockUser);
        }),
        http.post("/api/auth/logout", () => {
          return HttpResponse.error();
        })
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.user).toEqual(mockUser);
      });

      await act(async () => {
        await result.current.logout();
      });

      expect(result.current.user).toBeNull();
    });
  });

  describe("refresh", () => {
    it("refetches user data", async () => {
      const mockUser: User = { email: "admin@example.com", role: "admin" };
      const updatedUser: User = { email: "new@example.com", role: "editor" };

      let callCount = 0;
      server.use(
        http.get("/api/auth/me", () => {
          callCount++;
          if (callCount === 1) {
            return HttpResponse.json(mockUser);
          }
          return HttpResponse.json(updatedUser);
        })
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.user).toEqual(mockUser);
      });

      await act(async () => {
        await result.current.refresh();
      });

      expect(result.current.user).toEqual(updatedUser);
      expect(callCount).toBe(2);
    });

    it("sets isLoading during refresh", async () => {
      server.use(
        http.get("/api/auth/me", async () => {
          await new Promise((resolve) => setTimeout(resolve, 50));
          return new HttpResponse(null, { status: 401 });
        })
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.refresh();
      });

      expect(result.current.isLoading).toBe(true);
    });
  });
});
