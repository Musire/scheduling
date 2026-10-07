'use client';

import { useToast } from "@/context";
import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { ActionResponse } from "@/domains/identity/types";
import { InvitationStatus } from "@/generated/prisma/enums";
import { useTransition } from "react";
import { inviteStaff, reinviteStaff, revokeInvite } from "../invite.actions";

interface UserAction {
  invitation: {
    id: string | undefined;
    status: InvitationStatus | undefined
  },
  target: {
    email: string | undefined;
    id: string | undefined;
  } 
}

export function InviteActionButton({ 
  invitation,
  target
}: UserAction) {
  const [isPendingAction, startTransition] = useTransition();
  const { createError, createSuccess } =  useToast()
  const { clearModal: clearBottomdrawer } = useBottomDrawer()

  if (invitation.status === 'ACCEPTED') return null; // Added null return for valid JSX components

  // 1. Explicitly map each distinct status to its exact unique backend action
  const stateConfigs: Record<
    "PENDING" | "EXPIRED" | "REVOKED", 
    { text: string; className: string; successMsg: string; action: () => Promise<ActionResponse<any>> }
  > = {
    PENDING: {
      text: "Revoke",
      action: () => revokeInvite({id: invitation.id ?? ''}),
      className: "bg-error text-deep hover:bg-darken-2/error",
      successMsg: "Invitation revoked successfully"
    },
    EXPIRED: {
      text: "Reinvite",
      action: () => reinviteStaff({id: invitation.id ?? ''}), 
      className: "bg-main text-deep hover:bg-darken-2/main",
      successMsg: "Invitation resubmitted successfully"
    },
    REVOKED: {
      text: "Reinvite",
      action: () => reinviteStaff({id: invitation.id ?? ''}), 
      className: "bg-main text-deep hover:bg-darken-2/main",
      successMsg: "Invitation resubmitted successfully"
    },
  };

  // 2. Removed the redundant !== "ACCEPTED" check since line 31 already filters it out
  const baseConfig = invitation.status
    ? stateConfigs[invitation.status] 
    : {
        text: "Invite",
        action: () => inviteStaff({ 
          id: target.id ?? '', 
          email: target.email ?? '' 
        }),
        className: "bg-main text-deep hover:bg-darken-2/main",
        successMsg: "Invitation created successfully"
      };

  // 3. Execution wrapper handles useTransition dynamically
  const buttonConfig = {
    text: isPendingAction ? "...submitting" : baseConfig.text,
    className: baseConfig.className,
    action: () => startTransition(
      async () => {
        const res = await baseConfig.action()
        if (!res.success && res.error) {
          createError(res.error)
          return; // Stop execution if server action fails
        }
        createSuccess(baseConfig.successMsg)
        clearBottomdrawer()
      } 
    ),
  };

  return (
    <button
      type="button"
      onClick={buttonConfig.action}
      disabled={isPendingAction}
      className={`disabled:cursor-not-allowed pr-6 normal-space rounded-lg text-centered cursor-pointer transition-colors ${buttonConfig.className}`}
    >
      {buttonConfig.text}
    </button>
  );
}
