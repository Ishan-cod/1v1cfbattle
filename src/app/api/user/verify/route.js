import dbconnect from "@/lib/dbconnect";
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
      user.rating = userrating;
      await user.save();

      
    } catch (error) {
      console.error("Error updating user rating");
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
    const newuser = {
      handle: userhandle,
      rating: userrating,
      wins: 0,
      losses: 0,
    };

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
