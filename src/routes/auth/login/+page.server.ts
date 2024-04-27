import { redirect } from '@sveltejs/kit';

export const actions = {
    login: async ({ locals, request }: {locals: any, request: any}) => {
        const body = Object.fromEntries(await request.formData());

        try{
            await locals.pb.collection("users").authWithPassword(body.email, body.password);
        } catch(err){
            console.error("Error: ", err);
            return {
                notVerified: true
            };
        }
        
        throw redirect(303, "/app");
    }
}