import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { WebService } from './web.service';
import { Public } from 'src/common/decorators/public.decorator';

@Public()
@Controller('web')
export class WebController {
  constructor(private readonly webService: WebService) {}

  @Get('tournaments')
  getTournaments() {
    return this.webService.findTournaments();
  }

  @Get('matches')
  getMatches(@Query('tournamentId') tournamentId: string) {
    return this.webService.findMatchesByTournamentId(+tournamentId);
  }

  @Get('matches/:id')
  async getMatch(@Param('id') id: string) {
    return this.webService.findMatchById(+id);
  }
}
