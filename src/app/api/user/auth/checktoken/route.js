import dbconnect from "@/lib/dbconnect";
import { generateToken } from "@/lib/generateauthtoken";
import userModel from "@/model/user.model";
import { cookies } from "next/headers";

export async function POST(request) {
  await dbconnect();
  const cookiestore = cookies();

  const { cfhandle } = await request.json();

  if (!cfhandle) {
    return Response.json(
      {
        success: false,
        message: "Codeforce handle not provided",
      },
      { status: 400 },
    );
  }

  try {
    const userhandle = cfhandle.trim();
    const user = await userModel.findOne({ handle: userhandle });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    const token = (await cookiestore).get("authtoken");
    if (!token || !user.authtoken) {
      return Response.json(
        {
          success: false,
          message: "auth token not found",
        },
        { status: 404 },
      );
    }

    if (token.value != user.authtoken) {
      return Response.json(
        {
          success: false,
          message: "token donot match",
        },
        { status: 401 },
      );
    }

    // Refresh the token
    const newtoken = generateToken();
    (await cookiestore).set("authtoken", newtoken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
    });

    user.authtoken = newtoken;
    await user.save();
    // end

    return Response.json(
      {
        success: true,
        message: "user token verified successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "error verifying the user via token",
      },
      { status: 500 },
    );
  }
}
