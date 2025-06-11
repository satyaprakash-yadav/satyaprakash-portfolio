"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const DashboardPage = () => {
    return ( 
        <div>
            <Button onClick={() => signOut()}>Sign out</Button>
        </div>
    );
}
 
export default DashboardPage;