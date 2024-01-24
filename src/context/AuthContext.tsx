// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { UserCredential, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";

type AuthContextType = {
	user: User | null;
	loading: boolean;
	error: string | null;
	createUser: (email: string, password: string) => Promise<UserCredential>;
	signIn: (email: string, password: string) => Promise<UserCredential>;
	logout: () => Promise<void>;
	clearError: () => void;
	setError: React.Dispatch<React.SetStateAction<string | null>>;
	updateUser: (userUpdates: { displayName?: string; photoURL?: string }) => Promise<void>;
};

// Provide a default value for the context
const defaultAuthContext: AuthContextType = {
	user: null,
	loading: true,
	error: null,
	createUser: async () => {
		throw new Error("Error occured while creating user");
	},
	signIn: async () => {
		throw new Error("Error occured while signing in");
	},
	logout: async () => {
		throw new Error("Error occured while logging out");
	},
	setError: () => {},
	clearError: () => {},
	updateUser: async () => {
		throw new Error("updateUser function not implemented");
	},
};

const UserContext = createContext<AuthContextType>(defaultAuthContext);

type AuthContextProviderProps = {
	children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const createUser = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const signIn = async (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logout = () => {
		return signOut(auth);
	};

	const clearError = () => {
		setError(null);
	};

	const updateUser = async (userUpdates: { displayName?: string; photoURL?: string }) => {
		if (user) {
			await updateProfile(user, userUpdates);
			setUser(await auth.currentUser); // Refresh user data
		}
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<UserContext.Provider
			value={{
				createUser,
				user,
				logout,
				signIn,
				loading,
				error,
				clearError,
				setError,
				updateUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(UserContext);
};
