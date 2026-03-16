import dbconnect from "@/lib/dbconnect";
import roomModel from "@/model/room.model";

export async function GET(request, { params }) {
  await dbconnect();
  const { id } = await params;

  try {
    const room = await roomModel.findOne({ roomcode: id });

    if (!room) {
      return Response.json(
        {
          success: false,
          message: "room not found",
        },
        { status: 404 },
      );
    }

    room.status = "CANCELLED";
    await room.save();

    return Response.json({
      success: true,
      message: "MATCH CANCELLED",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "CANCELLING MATCH FAILED",
        error : error.message
      },
      { status: 500 },
    );
  }
}
