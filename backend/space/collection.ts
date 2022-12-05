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
        });
        await space.save();
        return space;
    }

    static async findOne(place_id: string): Promise<HydratedDocument<Space> | null>{
        return SpaceModel.findOne({
            place_id: place_id as string
        });
    }

    static async findAll(): Promise<Array<HydratedDocument<Space>>>{
        return SpaceModel.find({});
    }

    static async deleteOne(place_id: string): Promise<void>{
        SpaceModel.deleteOne({place_id: place_id});
    }
}

export default SpaceCollection;
