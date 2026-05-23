import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await connectDB();

    const existing = await User.findOne({
      email: "admin@trustivasetu.com",
    });

    if (existing) {
      return Response.json({
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      "Admin@123",
      10
    );

    await User.create({
      fullName: "Super Admin",
      email: "admin@trustivasetu.com",
      password: hashedPassword,
      role: "SUPER_ADMIN",
      region: "ALL",
    });

    return Response.json({
      message: "Super admin created",
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}