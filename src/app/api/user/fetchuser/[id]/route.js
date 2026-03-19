import dbconnect from "@/lib/dbconnect";
import historyModel from "@/model/history.model";
import userModel from "@/model/user.model";

export async function GET(request, { params }) {
  await dbconnect();
  const { id } = await params;
  if (!id) {
    return Response.json(
      {
        success: false,
        message: "CF ID NOT FOUND",
      },
      { status: 400 },
    );
  }

  try {
    const cfhandle = id.trim().toLowerCase();
    const user = await userModel.findOne({ handle: cfhandle });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "The user donot exist in database",
        },
        { status: 404 },
      );
    }

    const history = await historyModel.findOne({ handle: cfhandle });
    if (!history) {
      return Response.json(
        {
          success: false,
          message: "Cannot find user in history model",
        },
        { status: 404 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "User data fetched successfully",
        userdata: user,
        historydata: history,
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "SERVER ERROR WHILE GETTING USER DATA",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
