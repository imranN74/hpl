import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";

export type CurrentAccount =
  | {
      isLoggedIn: true;
      accountType: "USER";
      user: {
        id: string;
        role: string;
        email: string;
      };
    }
  | {
      isLoggedIn: true;
      accountType: "OWNER";
      owner: {
        ownerName?: string;
        id: string;
        email: string;
        teamId: string;
      };
    }
  | {
      isLoggedIn: false;
    };

export async function getCurrentAccount(): Promise<CurrentAccount> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return { isLoggedIn: false };

  try {
    const payload = verifyJwt(token);

    if (payload.accountType === "USER") {
      return {
        isLoggedIn: true,
        accountType: "USER",
        user: {
          id: payload.id,
          role: payload.role!,
          email: payload.email,
        },
      };
    }

    return {
      isLoggedIn: true,
      accountType: "OWNER",
      owner: {
        ownerName: payload.ownerName,
        id: payload.id,
        email: payload.email,
        teamId: payload.teamId!,
      },
    };
  } catch {
    return { isLoggedIn: false };
  }
}
