<script lang="ts">
    import { Mail, KeySquare, KeyRound, CircleUser } from "lucide-svelte";
</script>

<div class="flex flex-col text-center gap-2">
    <div class="flex flex-col text-center gap-1">
        <h1 class="text-2xl">Register a New Account</h1>
        <p class="text-sm">Or <a href="/auth/login" class="text-primary">Log in</a> to an Existing Account</p>
    </div>

    <form action="?/register" method="POST" class="flex flex-col items-center space-y-2 mt-5">
        <div class="form-control w-full max-w-md">
            <label class="input input-bordered flex items-center gap-2">
                <Mail class="w-4 h-4"/>
                <input type="email" name="email" class="grow" placeholder="Email" />
            </label>
        </div>
        <div class="form-control w-full max-w-md">
            <label class="input input-bordered flex items-center gap-2">
                <CircleUser class="w-4 h-4"/>
                <input type="text" name="name" class="grow" placeholder="Name" />
            </label>
        </div>
        <div class="form-control w-full max-w-md">
            <label class="input input-bordered flex items-center gap-2">
                <KeySquare class="w-4 h-4"/>
                <input type="password" name="password" class="grow" placeholder="Password" />
            </label>
        </div>
        <div class="form-control w-full max-w-md">
            <label class="input input-bordered flex items-center gap-2">
                <KeyRound class="w-4 h-4"/>
                <input type="password" name="passwordConfirm" class="grow" placeholder="Confirm Password" />
            </label>
        </div>
        <button class="btn btn-secondary btn-md w-full" type="submit">Register</button>
    </form>
</div>