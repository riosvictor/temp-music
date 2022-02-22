import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class PlaylistParams {
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsNumberString()
  longitude?: number;

  @IsOptional()
  @IsNumberString()
  latitude?: number;
}
