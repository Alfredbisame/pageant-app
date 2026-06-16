import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { VotePackagesService } from './vote-packages.service';
import { Public } from '@/common/decorators';

@ApiTags('Vote Packages')
@Controller('vote-packages')
export class VotePackagesController {
  constructor(private readonly votePackagesService: VotePackagesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List active vote packages' })
  findActive() {
    return this.votePackagesService.findActive();
  }
}
