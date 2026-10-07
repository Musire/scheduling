import { InvitationStatus, UserRole, UserStatus } from "@/generated/prisma/enums";


export interface ExpectedUser {
  id: string;
  authUserId: string | null;
  email: string;
  name: string;
  avatarUrl: string | null;
  role: UserRole;
  status: UserStatus;
  payRate: number | null; 
  maxHours: number;
  createdAt: Date;
  updatedAt: Date;
  invitation: {
    id: string;
    status: InvitationStatus;
  } | null;
}
