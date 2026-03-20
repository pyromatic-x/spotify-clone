"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "@/hooks/mutations/use-login-mutation";
import { useUser } from "@/hooks/query/use-user";
import { Button } from "@/ui/buttons/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/ui/form/form";
import { Input } from "@/ui/form/input";
import { Label } from "@/ui/form/label";
import { Switch } from "@/ui/form/switch";
import { loginFormSchema, type TLoginFormFields } from "./schema";

export const LoginForm = () => {
	const navigate = useNavigate({ from: "/login" });

	const form = useForm<TLoginFormFields>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			name: "pyromatic",
			password: "rGkA$$dm#wMl5QD#RrMv",
		},
	});

	const { data: user, isFetching: isPendingUser, refetch } = useUser(false);

	const { mutate, isPending: isPendingMutation } = useLoginMutation({
		onMutate: () => form.clearErrors(),
		onSuccess: () => {
			refetch();
		},
		onError: () => {
			form.setError("root", {
				message: "Something went wrong. Please, try again later.",
			});
		},
	});

	useEffect(() => {
		if (user) navigate({ to: "/", replace: true });
	}, [user, navigate]);

	const onSubmit: SubmitHandler<TLoginFormFields> = async (data) =>
		mutate(data);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4 w-full"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									placeholder="Email or username"
									type="name"
									autoComplete="name"
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									placeholder="Password"
									type="password"
									autoComplete="current-password"
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="remember"
					render={({ field }) => (
						<FormItem className="flex items-center justify-between">
							<Label>Remember me</Label>
							<FormControl>
								<Switch {...field} value="" onCheckedChange={field.onChange} />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormMessage className="text-red-500">
					{form.formState.errors.root?.message}
				</FormMessage>

				<Button
					type="submit"
					aria-label="login"
					variant="white"
					disabled={
						!form.formState.isValid || isPendingUser || isPendingMutation
					}
					loading={isPendingUser || isPendingMutation}
				>
					Log in
				</Button>
			</form>
		</Form>
	);
};
