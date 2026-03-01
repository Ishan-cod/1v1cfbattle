import dbconnect from "@/lib/dbconnect";
import userModel from "@/model/user.model";

export async function GET(request) {
  try {
    await dbconnect();
    const users = await userModel.find();

    if (!users) {
      return Response.json(
        {
          success: false,
          message: "Unable to fetch user data",
        },
        { status: 500 },
      );
    }

    return Response.json({
      success: true,
      message: "users fetched successfully",
      data: users,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
