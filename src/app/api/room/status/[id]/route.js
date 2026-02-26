import dbconnect from "@/lib/dbconnect";
import roomModel from "@/model/room.model";

export async function GET(request, { params }) {
  await dbconnect();
  const { id } = await params;
  
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

  return Response.json(
    {
      success: true,
      message: "Room found successfully",
      roomstatus: room,
    },
    { status: 200 },
  );
}
