import { redirect } from "@sveltejs/kit";
import { serializeNonPOJOs } from "$lib/utils";

export const load = async ({ locals }: {locals: any}): Promise<any> => {
    if(!locals.pb.authStore.isValid){
        throw redirect(307, "/auth/login");
    }

    try{
        const trendingPosts = serializeNonPOJOs(await locals.pb.collection("posts").getList(1, 10));
        console.log(trendingPosts);
        const userPosts = await locals.pb.collection("posts").getList(1, 10);
        console.log(userPosts);

        return {
            appData: {
                user: locals.user
            },
            trendingPosts,
            userPosts
        };
    }
    catch(err){
        console.error(err);
    }
}