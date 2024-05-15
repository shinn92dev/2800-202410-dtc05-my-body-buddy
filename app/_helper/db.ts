import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const db = {
    listingAndReviews: testModel(),
};

function testModel() {
    mongoose.connect(
        `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mybodybuddydb.3gwp6yi.mongodb.net/sample_airbnb`
    );
    mongoose.Promise = global.Promise;
    console.log("Database connected");
    const schema = new Schema(
        {
            listing_url: { type: String, required: true },
            summary: { type: String, required: true },
            space: { type: String, required: true },
        },
        {
            timestamps: true,
        }
    );

    schema.set("toJSON", {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret.hash;
        },
    });

    return (
        mongoose.models.listingAndReviews ||
        mongoose.model("listingAndReviews", schema)
    );
}
