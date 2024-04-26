import { redirect } from "@sveltejs/kit";

export const load = ({ locals }: {locals: any}) => {
    if(locals.pb.authStore.isValid){
        throw redirect(307, "/app/");
    }
    return {};
}