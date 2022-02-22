import { plainToClass } from 'class-transformer';
import { PlaylistParams } from '../../schemas/playlist-params.schema';

export class PlaylistParamsHelper {
  private static plain = {
    city: 'test city',
    longitude: 12,
    latitude: 12,
  };

  static createClass() {
    return plainToClass(PlaylistParams, PlaylistParamsHelper.plain);
  }
}
