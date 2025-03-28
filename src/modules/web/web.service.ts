import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WebService {
  constructor(private readonly prisma: PrismaService) {}

  findTournaments() {
    return this.prisma.tournament.findMany({
      select: {
        id: true,
        title: true,
        title_en: true,
        logo: true,
        bonus: true,
        startDate: true,
        endDate: true,
        status: true,
      },
      orderBy: [{ startDate: 'desc' }],
    });
  }

  findMatchesByTournamentId(tournamentId: number) {
    return this.prisma.match.findMany({
      where: {
        tournamentId,
      },
      include: {
        homeTeam: true,
        awayTeam: true,
        tournament: true,
        stage: true,
      },
      orderBy: [{ startTime: 'desc' }],
    });
  }
}
