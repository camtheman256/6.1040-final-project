import type { HydratedDocument } from "mongoose";
import moment from "moment";
import type { Space } from "./model";

export type SpaceResponse = {
  _id: string;
  place_id: string,
  formatted_address: string,
  formatted_phone_number: string,
  name: string,

  /** see https://developers.google.com/maps/documentation/places/web-service/details#PlacePhoto */
  photos?: Array<string>

  /** ref to google's official place embed */
  url: string,

  /** place's external website */
  website: string

  /** {'lat': 123, 'lng': 123} */
  latlng?: Map<string, number | undefined>;
};

/**
 * @param {HydratedDocument<Space>} 
 * @returns {SpaceResponse} 
 */
const constructSpaceResponse = (space: HydratedDocument<Space>): SpaceResponse => {
  const spaceCopy: Space = {
    ...space.toObject({
      versionKey: false, // Cosmetics; prevents returning of __v property
    }),
  };
  /** This map call is premium API call, will keep on for now but photos field is optional*/
  const photoObj = spaceCopy.photos?.map(i => i.getUrl()); 

  delete spaceCopy.photos;

  //const latlngObj = spaceCopy.latlng;
  const latlngObj: Map<string, number | undefined>= new Map([
                                                ['lat', spaceCopy.latlng?.lat()],
                                                ['lng', spaceCopy.latlng?.lng()]
                                                ]);


  delete spaceCopy.latlng;

  return {
    ...spaceCopy,
    photos: photoObj,
    latlng: latlngObj,
    _id: spaceCopy._id.toString()
  };
};

export { constructSpaceResponse };
