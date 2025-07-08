"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LayoutGrid, LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

export const UserNav = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="relative size-8 rounded-full">
                <Avatar className="size-8">
                  <AvatarImage
                    src={user?.image as string}
                    alt={user?.name as string}
                  />
                  <AvatarFallback className="bg-transparent">
                    <User className="size-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/admin" className="flex items-center">
              <LayoutGrid className="size-4 mr-3 text-muted-foreground" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/admin/account" className="flex items-center">
              <User className="size-4 mr-3 text-muted-foreground" />
              Account
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={() => signOut()}
        >
          <LogOut className="size-4 mr-3 text-muted-foreground" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
