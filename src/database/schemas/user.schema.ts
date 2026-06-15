import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserRole, UserStatus } from '../../common/constants';

export type UserDocument = HydratedDocument<User>;

@Schema({ _id: false })
export class RefreshTokenEntry {
  @Prop({ required: true })
  tokenHash!: string;

  @Prop({ required: true })
  expiresAt!: Date;

  @Prop()
  revokedAt?: Date;
}

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ required: true, trim: true })
  fullName!: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ required: true })
  passwordHash!: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.VOTER })
  role!: UserRole;

  @Prop({ type: String, enum: UserStatus, default: UserStatus.ACTIVE })
  status!: UserStatus;

  @Prop()
  emailVerifiedAt?: Date;

  @Prop({ type: [RefreshTokenEntry], default: [] })
  refreshTokens!: RefreshTokenEntry[];

  @Prop()
  passwordResetTokenHash?: string;

  @Prop()
  passwordResetExpiresAt?: Date;

  createdAt!: Date;
  updatedAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1 }, { unique: true });

export type UserModel = User & { _id: Types.ObjectId };
