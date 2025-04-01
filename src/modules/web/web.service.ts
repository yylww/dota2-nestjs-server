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

  findMatchById(id: number) {
    return this.prisma.match.findUnique({
      where: { id },
      include: {
        games: {
          include: {
            records: {
              include: {
                player: true,
                hero: true,
              },
            },
            bans: {
              include: {
                hero: true,
              },
            },
            picks: {
              include: {
                hero: true,
              },
            },
            radiant: true,
            dire: true,
          },
        },
        homeTeam: true,
        awayTeam: true,
        tournament: {
          select: {
            id: true,
            title: true,
            title_en: true,
          },
        },
        stage: {
          select: {
            id: true,
            title: true,
            title_en: true,
          },
        },
      },
    });
  }
}
