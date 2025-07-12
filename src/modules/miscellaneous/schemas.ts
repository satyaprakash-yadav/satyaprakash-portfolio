import * as z from "zod";

export const MiscellaneousFormSchema = z.object({
    email: z.string().email({ message: "Please enter valid email address." }),
    messengerName: z.string().min(1, { message: "Please enter Messenger name." }),
    messengerUrl: z.string().url({ message: "Please enter valid Messenger URL." }),
    discordUsername: z.string().min(1, { message: "Please enter Discord username." }),
    discordUrl: z.string().url({ message: "Please enter valid Discord URL." }),
    facebookUrl: z.string().url({ message: "Please enter valid Facebook URL." }),
    instagramUrl: z.string().url({ message: "Please enter valid Instagram URL." }),
    twitterUrl: z.string().url({ message: "Please enter valid Twitter URL." }),
    linkedinUrl: z.string().url({ message: "Please enter valid LinkedIn URL." }),
    githubUrl: z.string().url({ message: "Please enter valid GitHub URL." }),
    titles: z
        .array(
            z.object({
                name: z.string().min(1, { message: "Please enter title." })
            })
        )
        .optional()
});
