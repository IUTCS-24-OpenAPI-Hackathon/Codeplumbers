import { serializeNonPOJOs } from "$lib/utils";
import PocketBase from "pocketbase";

export const handle = async ({ event, resolve }: {event: any, resolve: any}): Promise<any> => {
    let { latitude, longitude }: {
        latitude: number | null,
        longitude: number | null,
    } = {
        latitude: null,
        longitude: null
    }

    event.locals.title = "Hackathon";
    event.locals.pb = new PocketBase("https://hackathonbas.pockethost.io/");
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get("cookie") || "");

    if(event.locals.pb.authStore.isValid){
        event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
        event.locals.location = {latitude, longitude};
    }
    else{
        event.locals.user = undefined;
    }

    const response = await resolve(event);

    response.headers.set("set-cookie", event.locals.pb.authStore.exportToCookie({ secure: false }));

    return response;
}