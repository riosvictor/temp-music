import { Module } from '@nestjs/common';
import { PlaylistModule } from './playlist/playlist.module';

@Module({
  imports: [PlaylistModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
