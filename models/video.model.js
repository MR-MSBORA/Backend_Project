/**
 * This code defines a Video model using Mongoose for MongoDB.
 *
 * What it does:
 * 1. Defines a videoschema with fields like thumbnail, videofile, owner, title, description, duration, view, isPublished, etc.
 *    - Sets validation rules (required, default values)
 *    - Stores references to other collections (owner → User)
 *    - Uses timestamps to automatically track creation and update times
 *
 * 2. Each field meaning:
 *    - id: optional custom ID
 *    - thumbnail: URL of video thumbnail (required)
 *    - videofile: URL of video file (required)
 *    - owner: ObjectId referencing the User who uploaded the video
 *    - title & description: basic info about the video
 *    - duration: video length in seconds
 *    - view: number of times video has been viewed, default 0
 *    - isPublished: whether video is visible publicly, default true
 *
 * 3. timestamps: true
 *    - Automatically adds createdAt and updatedAt fields
 *
 * 4. Exports the Video model to interact with the 'videos' collection in MongoDB
 *    - Allows creating, reading, updating, deleting videos
 *    - Owner reference can be populated to fetch user details
 *
 * Overall Flow:
 *  - When a video is uploaded, required fields are validated automatically
 *  - Timestamps track creation and updates
 *  - The model can be used to fetch videos, count views, and manage publication status
 */

import mongoose, { Schema } from "mongoose"

const videoschema = new Schema(
    {
        id: {

        },
        thumbnail: {
            type: String,
            required: true
        },
        videofile: {
            type: String,
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"

        },
        title: {
            type: String,
            required: true,

        },
        description: {
            type: String,
            required: true,

        },
        duration: {
            type: Number, // cloudinary url
            required: true,

        },
        view: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        createdAt: {

        },
        updatedAt: {

        }
    },
    {
        timestamps: true
    }
)

// Add pagination support for aggregate queries
// Allows fetching videos in pages (e.g., 10 per page) and getting total pages
videoschema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoschema)