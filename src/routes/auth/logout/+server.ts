import { redirect } from "@sveltejs/kit";

export const POST = async ({ locals }: {locals: any}) => {
    await locals.pb.authStore.clear();
    locals.user = undefined;
    
    throw redirect(303, "/auth/login");
}