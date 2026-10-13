import { InvitationStatus, UserRole, UserStatus } from "@/generated/prisma/enums";


export interface ExpectedUser {
  id: string;
  authUserId: string | null;
  email: string;
  name: string;
  avatarUrl: string | null;
  role: UserRole;
  status: UserStatus;
  payRate: number ; 
  maxHours: number;
  createdAt: Date;
  updatedAt: Date;
  scheduledHours: number;
  invitation: {
    id: string;
    status: InvitationStatus;
  } | null;
}
