import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContestantsService } from './contestants.service';
import { ContestantQueryDto } from './dto/contestants.dto';
import { Public } from '../../common/decorators';
import { ParseObjectIdPipe } from '../../common/pipes/parse-object-id.pipe';

@ApiTags('Contestants')
@Controller('contestants')
export class ContestantsController {
  constructor(private readonly contestantsService: ContestantsService) {}

  @Public()
  @Get()
  @ApiOperation({
    summary: 'List contestants with search, filter, sort, pagination',
  })
  findAll(@Query() query: ContestantQueryDto) {
    return this.contestantsService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get contestant by ID' })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.contestantsService.findOne(id);
  }
}
