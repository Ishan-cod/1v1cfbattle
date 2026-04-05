import dbconnect from "@/lib/dbconnect";
import { generateToken } from "@/lib/generateauthtoken";
import historyModel from "@/model/history.model";
import userModel from "@/model/user.model";
import { cookies } from "next/headers";

export async function POST(request) {
  await dbconnect();
  const cookiestore = cookies();

  const { cfhandle } = await request.json();

  const userhandle = cfhandle.trim();
  const user = await userModel.findOne({ handle: userhandle });
  const newtoken = generateToken();

  if (user) {
    try {
      user.authtoken = newtoken;
      (await cookiestore).set("authtoken", newtoken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
        sameSite: "lax",
      });
      await user.save();

      // UPDATING USER CURRENT RATING
      try {
        const url = `https://codeforces.com/api/user.info?handles=${userhandle}&checkHistoricHandles=false`;

        const response = await fetch(url);
        const data = await response.json();

        const userrating = data.result[0].maxRating;
        const avatarurl = data.result[0].titlePhoto;

        user.avatar = avatarurl;
        user.rating = userrating;
        await user.save();
      } catch (error) {
        console.error("Error updating user rating");
      }
      // END

      // Checking for already existing history roomModel
      const userhistory = await historyModel.findOne({ handle: userhandle });
      if (!userhistory) {
        // Create
        const newhistory = {
          handle: userhandle,
        };
        const createdhistory = await historyModel.create(newhistory);
        // END
      }
      // END

      return Response.json(
        {
          success: true,
          message: "auth token set successfully",
        },
        { status: 200 },
      );
    } catch (error) {
      return Response.json(
        {
          success: false,
          message: "error verifying user",
        },
        { status: 500 },
      );
    }
  }

  try {
    const url = `https://codeforces.com/api/user.info?handles=${userhandle}&checkHistoricHandles=false`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK" || !data) {
      return Response.json(
        {
          success: false,
          message: "UNABLE TO VERIFY THE USERS ID",
        },
        { status: 400 },
      );
    }

    const userrating = data.result[0].maxRating || 0;
    const avatarurl = data.result[0].titlePhoto;

    const newuser = {
      handle: userhandle,
      rating: userrating,
      authtoken: newtoken,
      wins: 0,
      losses: 0,
      avatar: avatarurl,
    };

    (await cookiestore).set("authtoken", newtoken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
    });

    // new history model created
    const newhistory = {
      handle: userhandle,
    };
    const createduser = await userModel.create(newuser);

    const existinghistory = await historyModel.findOne({ handle: userhandle });

    if (!existinghistory) {
      const createdhistory = await historyModel.create(newhistory);
    }

    // history model creation ended

    return Response.json(
      {
        success: true,
        message: "User verification success & token set",
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "ERROR VERIFING USER FROM CODEFORCE",
      },
      { status: 500 },
    );
  }
}
