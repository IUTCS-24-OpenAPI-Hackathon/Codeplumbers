import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }: {locals: any}): Promise<any> => {
    if(!locals.pb.authStore.isValid){
        throw redirect(307, "/auth/login");
    }
    return {
        appData: {
            user: locals.user
        }
    };
}