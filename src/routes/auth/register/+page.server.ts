import { redirect } from '@sveltejs/kit';

export const actions = {
    register: async ({ locals, request }: {locals: any, request: any}) => {
        const body = Object.fromEntries(await request.formData());

        console.log(body);
        try{
            await locals.pb.collection("users").create({...body});
        } catch(err){
            console.error("Error: ", err);
            throw Error("Could not Register the New ID");
        }

        throw redirect(303, "/auth/login");
    }
};