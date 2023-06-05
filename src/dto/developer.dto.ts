import { AppDto } from './app.dto';

export interface DeveloperDto {
  username: string;
  email: string;
  password: string;

  apps?: AppDto[];
}
