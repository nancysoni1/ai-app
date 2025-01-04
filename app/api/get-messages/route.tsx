
   //after all of it is done we will send message so api->send message -> route .tsximport { getServerSession } from "next-auth";
   //session nhi h ya session me user nhi h 
   //jab agregation pipeline lgate h tb kai baar ye issue aa jata string wala issue aa jaat h therefor ewe defined userId
       // now we want all the messages through agrgation pipeline therefore we will make lot of users
    //abhi we ahve a array of messaegs therefore we haev a pipeline unwind specially fo rthis in which it will give multiple object ... so to do this we have multiple stages...a and then we last we do the grouping
import mongoose from "mongoose";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  await dbConnect(); // Ensure database is connected

  // Fetch the session
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  // Check if the user is authenticated
  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  // Prepare userId for aggregation
  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    // Perform the aggregation pipeline to fetch messages
    const userMessages = await UserModel.aggregate([
      { $match: { _id: userId } }, // Match by userId (use _id instead of id)
      { $unwind: "$messages" }, // Unwind the messages array
      { $sort: { "messages.createdAt": -1 } }, // Sort messages by createdAt (descending)
      { $group: { _id: "$_id", messages: { $push: "$messages" } } }, // Group messages back together
    ]);

    if (!userMessages || userMessages.length === 0) {
      return Response.json(
        {
          success: false,
          message: "User not found or no messages",
        },
        { status: 404 }
      );
    }

    // Return the messages if found
    return Response.json(
      {
        success: true,
        messages: userMessages[0].messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("An unexpected error occurred:", error);
    return Response.json(
      {
        success: false,
        message: "Error fetching user messages",
      },
      { status: 500 }
    );
  }
}
