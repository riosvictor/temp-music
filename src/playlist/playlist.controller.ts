import { Controller, Get, Query } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistParams } from './schemas/playlist-params.schema';
import { TransformPlainToClass } from '@nestjs/class-transformer';
import { SpotifyPlaylistResponse } from './schemas/spotify-playlist-response.schema';

@Controller()
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get('playlist')
  @TransformPlainToClass(SpotifyPlaylistResponse)
  async getPlayList(@Query() playlistParams: PlaylistParams) {
    return this.playlistService.getPlaylist(playlistParams);
  }
}
