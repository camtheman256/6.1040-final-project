import UserCollection from "../user/collection";
import type { HydratedDocument, Types } from "mongoose";
import type { Space } from "./model";
import SpaceModel from "./model";

class SpaceCollection {
    static async addOne(gmaps_place_payload: google.maps.places.PlaceResult): Promise<HydratedDocument<Space>> {
        const place_id = gmaps_place_payload.place_id;
        const formatted_address = gmaps_place_payload.formatted_address;
        const formatted_phone_number = gmaps_place_payload.formatted_phone_number;
        const name = gmaps_place_payload.name;
        const photos = gmaps_place_payload.photos;
        const url = gmaps_place_payload.url;
        const website = gmaps_place_payload.website;
        const latlng = gmaps_place_payload.geometry?.location;
        const space = new SpaceModel({
            place_id,
            formatted_address,
            formatted_phone_number,
            name,
            photos,
            url,
            website,
            latlng,
            localLegend: undefined,
            localLegendCount: undefined,
            totalCheckInCount: 0
        });
        await space.save();
        return space.populate("localLegend");
    }

    static async findOne(place_id: string): Promise<HydratedDocument<Space> | null>{
        return SpaceModel.findOne({
            place_id: place_id as string
        }).populate("localLegend");
    }

    static async findAll(): Promise<Array<HydratedDocument<Space>>>{
        return SpaceModel.find({}).populate("localLegend");
    }

    static async deleteOne(place_id: string): Promise<void>{
        SpaceModel.deleteOne({place_id: place_id});
    }

    static async updateOne(place_id: string, totalCheckInCount: number, newLegend: string, newLegendCount: number): Promise<HydratedDocument<Space> | null>{
        const space = await SpaceModel.findOne({place_id: place_id});
        const legend = await UserCollection.findOneFrom_id(newLegend);
        if (space && legend){
            space.localLegend = legend._id;
            space.totalCheckInCount = totalCheckInCount;
            space.localLegendCount = newLegendCount;
            await space.save();
            return space.populate("localLegend");
        }
        return null; //I know im sorry pls forgive me
    }
}

export default SpaceCollection;
