import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, hashPassword, verifyToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {currentPassword, newPassword } = body;
    const token = request.cookies.get("auth_token")?.value;
      const payload = token ? verifyToken(token) : null;
      if (!payload) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }

    // Validate input
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current password and new password are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: payload?.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 401 },
      );
    }
    
    const isValidPassword = await verifyPassword(currentPassword, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 },
      );
    }

    // Hash new password and update user
    const hashedPassword = await hashPassword(newPassword);
    await prisma.user.update({
      where: { email: user?.email },
      data: { password: hashedPassword },
    });

    return NextResponse.json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}   