import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OpenWeatherMapIntegration } from './integrations/open-weather-map.integration';
import { SpotifyIntegration } from './integrations/spotify.integration';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';

@Module({
  imports: [HttpModule],
  controllers: [PlaylistController],
  providers: [PlaylistService, OpenWeatherMapIntegration, SpotifyIntegration],
})
export class PlaylistModule {}
