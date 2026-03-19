import dbconnect from "@/lib/dbconnect";
import historyModel from "@/model/history.model";
import userModel from "@/model/user.model";

export async function POST(request) {
  await dbconnect();
  const body = await request.json();
  const { cfhandle } = body;

  if (!cfhandle) {
    return Response.json(
      {
        success: false,
        message: "CF HANDLE NOT PROVIDED",
      },
      { status: 400 },
    );
  }

  const userhandle = cfhandle.trim();

  const user = await userModel.findOne({ handle: userhandle });

  if (user) {
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
        message: "USER ALREADY VERIFIED",
      },
      { status: 200 },
    );
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

    const userrating = data.result[0].maxRating;
    const avatarurl = data.result[0].titlePhoto;

    const newuser = {
      handle: userhandle,
      rating: userrating,
      wins: 0,
      losses: 0,
      avatar: avatarurl,
    };

    // new history model created
    const newhistory = {
      handle: userhandle,
    };
    const createdhistory = await historyModel.create(newhistory);
    // history model creation ended

    const createduser = await userModel.create(newuser);
    return Response.json(
      {
        success: true,
        message: "User verification success",
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
