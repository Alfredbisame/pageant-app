import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';

export const winstonConfig = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike('ELL-Pageant', {
          prettyPrint: process.env.NODE_ENV !== 'production',
        }),
      ),
    }),
  ],
};

export const WinstonLoggerModule = WinstonModule.forRoot(winstonConfig);
