import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { PermissionGuard } from './common/guards/permission.guard';
import { PrismaModule } from './modules/prisma/prisma.module';
import { HeroesModule } from './modules/heroes/heroes.module';
import { UploadModule } from './modules/upload/upload.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { RegionsModule } from './modules/regions/regions.module';
import { TeamsModule } from './modules/teams/teams.module';
import { PlayersModule } from './modules/players/players.module';
import { AchievementsModule } from './modules/achievements/achievements.module';
import { TournamentsModule } from './modules/tournaments/tournaments.module';
import { StagesModule } from './modules/stages/stages.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    HeroesModule,
    UploadModule,
    RegionsModule,
    TeamsModule,
    PlayersModule,
    AchievementsModule,
    TournamentsModule,
    StagesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TransformInterceptor,
    // },
  ],
})
export class AppModule {}
